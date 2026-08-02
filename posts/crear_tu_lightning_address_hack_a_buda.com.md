---
title: "Crea tu propia lightning address (Hack a Buda.com)"
date: "2026-06-24"
author: "Nicolás Saporiti"
image: "https://images.unsplash.com/photo-1654638827522-c22e830b8a82?q=80&w=2016&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
resume: "Quería recibir pagos por Lightning sin tener que administrar un nodo propio, exponer credenciales en el frontend ni inventar un flujo raro para generar invoices. La idea era simple"
category: "Bitcoin"
tags: ["Lightning Network", "Seguridad"]
---
# Cómo armé una Lightning Address usando Node.js, Express y la API de Buda

Quería recibir pagos por Lightning sin tener que administrar un nodo propio, exponer credenciales en el frontend ni inventar un flujo raro para generar invoices. La idea era simple:

```text
alguien paga a usuario@mi-dominio.com
mi API recibe el pedido
Buda genera la invoice Lightning
la wallet del pagador paga esa invoice
```

**Pero antes de seguir te dejo el [repositorio](https://github.com/nicosaporiti/buda-lightning-invoice) y si quieres probar, envía unos sats a nicolas@saporiti.cl**

En la práctica, eso significa implementar Lightning Address, que por debajo usa LNURL-pay. Lo interesante es que no hace falta construir toda una infraestructura Lightning desde cero. Si ya tenés una cuenta en Buda con acceso a su API, podés usarla como proveedor de invoices y dejar tu backend como una capa segura y controlada.

Este post muestra el enfoque que usé para construir esa API.

## El problema

Una Lightning Address se ve como un email:

```text
nicolas@mi-dominio.com
```

Pero no funciona como email. Cuando una wallet quiere pagar a esa dirección, primero busca un endpoint público en tu dominio:

```text
GET https://mi-dominio.com/.well-known/lnurlp/nicolas
```

Ese endpoint devuelve información LNURL-pay: cuánto se puede pagar, cuál es el callback para pedir una invoice y qué metadata debe usar la wallet.

Después, cuando el usuario elige el monto, la wallet llama al callback:

```text
GET https://mi-dominio.com/callback?amount=5000000&comment=Gracias
```

Importante: en LNURL-pay el `amount` viene en millisatoshis. En este ejemplo, `5000000` millisatoshis son `5000` satoshis.

El callback tiene que responder con una invoice BOLT11:

```json
{
  "pr": "lnbc...",
  "successAction": {
    "tag": "message",
    "message": "Gracias por tu pago"
  },
  "routes": []
}
```

Ahí está la clave: la wallet no necesita saber nada de Buda. Solo necesita un endpoint compatible con LNURL-pay.

## La arquitectura

La API quedó como un backend Node.js/Express que cumple dos roles:

1. Exponer endpoints simples para crear invoices y consultar pagos.
2. Exponer endpoints compatibles con Lightning Address / LNURL-pay.

El flujo interno es este:

```text
HTTP Request
  -> Express route
  -> validación con express-validator
  -> controller
  -> helper
  -> wrapper de Buda
  -> API de Buda
  -> HTTP Response
```

La decisión más importante fue que las credenciales de Buda viven solamente en el backend:

```env
PORT=3001
BUDA_API_KEY=tu_buda_api_key
BUDA_API_SECRET=tu_buda_api_secret
DOMAIN=mi-dominio.com
```

El frontend, la wallet o cualquier consumidor externo nunca ven esas claves. Solo llaman a mi API.

## Crear una invoice Lightning

La primera pieza fue un endpoint común para crear invoices:

```http
POST /newinvoice
```

Con un body así:

```json
{
  "amount": 5000,
  "msg": "Cuota del asado"
}
```

`amount` está expresado en satoshis y `msg` se usa como memo de la invoice.

El helper que habla con Buda es chico a propósito:

```js
const getInvoice = (amount, msg) => {
  const apiKey = process.env.BUDA_API_KEY;
  const apiSecret = process.env.BUDA_API_SECRET;
  const Buda = require('../buda-promise/buda');
  const privateBuda = new Buda(apiKey, apiSecret);

  return privateBuda
    .lightning_network_invoices(amount, 'BTC', msg, false)
    .then((data) => data.invoice.encoded_payment_request);
};
```

Por dentro, el wrapper llama al endpoint privado de Buda:

```js
Buda.prototype.lightning_network_invoices = function(amount, currency, memo, expiry_seconds) {
  var payload = {
    amount_satoshis: amount,
    currency: currency,
    memo: memo,
    expiry_seconds: expiry_seconds || false
  };

  return this._request('POST', '/api/v2/lightning_network_invoices', null, payload, true);
};
```

La API responde algo así:

```json
{
  "invoice": "lnbc50...",
  "amount": 5000,
  "msg": "Cuota del asado"
}
```

Con eso ya tenía la parte básica: pedir una invoice Lightning desde mi backend.

## Verificar si una invoice fue pagada

Después agregué un endpoint para consultar estado:

```http
POST /status
```

Body:

```json
{
  "invoice": "lnbc50..."
}
```

La verificación busca la invoice entre los deposits BTC de Buda y solo devuelve `true` si el estado es `confirmed`:

```js
const getPaymentConfirmation = (invoice) => {
  const apiKey = process.env.BUDA_API_KEY;
  const apiSecret = process.env.BUDA_API_SECRET;
  const Buda = require('../buda-promise/buda');
  const privateBuda = new Buda(apiKey, apiSecret);

  return privateBuda.deposits('btc').then((data) => {
    const payments = data.deposits.find(
      (e) =>
        e.deposit_data.invoice.encoded_payment_request === invoice &&
        e.state === 'confirmed'
    );

    return !!payments;
  });
};
```

Respuesta:

```json
{
  "invoice": "lnbc50...",
  "status": true
}
```

Esto sirve para integraciones propias, dashboards o flujos donde quiero saber si una invoice específica ya fue pagada.

## Convertir la API en una Lightning Address

La parte más interesante fue agregar LNURL-pay.

Para que una wallet pueda resolver una Lightning Address como:

```text
nicolas@mi-dominio.com
```

el dominio tiene que responder en:

```http
GET /.well-known/lnurlp/nicolas
```

En mi caso, ese endpoint devuelve:

```js
const lnurlp = (req, res = response) => {
  const domain = process.env.DOMAIN || req.get('host');
  const protocol = req.protocol;
  const metadata = JSON.stringify([['text/plain', `Pago Lightning a ${req.params.username}`]]);

  res.send({
    callback: `${protocol}://${domain}/callback`,
    maxSendable: 100000000,
    minSendable: 1000,
    metadata,
    tag: 'payRequest',
    commentAllowed: 140,
  });
};
```

Algunos detalles importantes:

- `tag: 'payRequest'` le dice a la wallet que esto es LNURL-pay.
- `minSendable` y `maxSendable` están en millisatoshis.
- `callback` es el endpoint que la wallet va a llamar después para pedir una invoice.
- `metadata` describe el pago y tiene que viajar como string JSON.
- `commentAllowed` permite que la wallet mande un comentario de hasta 140 caracteres.

Una respuesta real se ve así:

```json
{
  "callback": "https://mi-dominio.com/callback",
  "maxSendable": 100000000,
  "minSendable": 1000,
  "metadata": "[[\"text/plain\",\"Pago Lightning a nicolas\"]]",
  "tag": "payRequest",
  "commentAllowed": 140
}
```

## El callback: de millisatoshis a invoice BOLT11

Cuando la wallet ya sabe cuánto quiere pagar, llama al callback:

```http
GET /callback?amount=5000000&comment=Gracias
```

El controller hace tres cosas:

1. Lee el monto en millisatoshis.
2. Lo convierte a satoshis dividiendo por `1000`.
3. Le pide a Buda una invoice Lightning por ese monto.

```js
const callback = async (req, res = response) => {
  const { amount, comment } = req.query;

  try {
    const memo = !comment ? 'Pago desde Lightning Address' : comment;
    const pr = await getInvoice(amount / 1000, memo);

    res.send({
      pr,
      successAction: {
        tag: 'message',
        message: 'Gracias por tu pago',
      },
      routes: [],
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      error: error.message,
    });
  }
};
```

La respuesta tiene el formato que espera la wallet:

```json
{
  "pr": "lnbc50...",
  "successAction": {
    "tag": "message",
    "message": "Gracias por tu pago"
  },
  "routes": []
}
```

En ese momento, para el usuario final, la experiencia es transparente: escribe una Lightning Address, elige el monto y paga. Todo el trabajo de generar la invoice ocurre en el backend.

## Validaciones

Usé `express-validator` para cortar requests inválidas antes de llegar a los controllers.

Para crear invoices normales:

```js
check('amount', 'Ingrese un número entero mayor a 1')
  .notEmpty()
  .isNumeric()
  .isInt({ min: 1 });
```

Para el callback LNURL-pay:

```js
check('amount', 'Ingrese un número entero mayor a 1000 msats')
  .notEmpty()
  .isNumeric()
  .isInt({ min: 1000 });
```

Esto último es importante porque LNURL-pay trabaja en millisatoshis. `1000` msats equivale a `1` satoshi, que es el mínimo que la API acepta para generar una invoice.

## Deploy

Lo desplegué en Fly.io. La app escucha en el puerto `8080` por defecto, que coincide con la configuración de `fly.toml`:

```toml
[http_service]
  internal_port = 8080
  force_https = true
```

Las credenciales se configuran como secrets:

```bash
fly secrets set BUDA_API_KEY=tu_buda_api_key
fly secrets set BUDA_API_SECRET=tu_buda_api_secret
fly secrets set DOMAIN=mi-dominio.com
```

Y una vez desplegado, la prueba clave es abrir:

```text
https://mi-dominio.com/.well-known/lnurlp/nicolas
```

Si eso devuelve el JSON de LNURL-pay, la Lightning Address ya tiene la primera mitad resuelta.

Después probé el callback:

```text
https://mi-dominio.com/callback?amount=5000000&comment=Test
```

Si responde con un `pr` que empieza con `lnbc`, ya está generando invoices Lightning reales.

## Lo que aprendí

La parte difícil no fue crear una API enorme. Fue respetar bien los contratos:

- Lightning Address necesita el endpoint `/.well-known/lnurlp/:username`.
- LNURL-pay usa millisatoshis, no satoshis.
- El callback tiene que devolver `pr`, no `invoice`.
- Las credenciales de Buda nunca deben salir del backend.
- La metadata debe enviarse como string JSON.
- El dominio público importa: las wallets tienen que poder llamar esos endpoints por HTTPS.

También me gustó que la solución queda bastante modular. Si mañana cambio el proveedor que genera invoices, la superficie pública podría seguir siendo la misma: `/newinvoice`, `/status`, `/.well-known/lnurlp/:username` y `/callback`.

## Cierre

Con pocas piezas se puede tener una Lightning Address funcionando:

```text
Express para exponer HTTP
Buda para generar invoices Lightning
LNURL-pay para hablar con wallets
Fly.io para tener HTTPS publico
```

El resultado es una dirección simple para recibir pagos, pero con un backend propio que mantiene control sobre credenciales, validaciones y lógica de negocio.

No tuve que correr un nodo Lightning ni meter claves privadas en el frontend. Solo tuve que entender el contrato LNURL-pay y conectar bien el callback con la API de Buda.

Para mí, esa fue la parte más linda del proyecto: convertir una API chica en una experiencia que del lado del usuario se siente tan simple como pagar a un email.
