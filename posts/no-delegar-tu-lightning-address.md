---
title: "No delegar tu lightning address"
date: "2022-11-29"
author: "Nicolás Saporiti"
image: "https://i.imgur.com/bTLvNjn.jpeg"
resume: "Todos reconocen la importancia de custodiar bitcoin, pero muchos delegan su lightning address (LA) en terceros."
---

# No delegar tu lightning address

Todos reconocen la importancia de custodiar bitcoin, pero muchos delegan su lightning address (LA) en terceros. Si operas tu propio nodo, disponer de una propia dirección bajo tu dominio es muy sencillo y **necesario**.

## ¿Qué es Lightning Address?

Según [https://lightningaddress.com/](https://lightningaddress.com/) es ¡Como una dirección de correo electrónico, pero para Bitcoin! Una forma enormemente más simple para que cualquiera pueda enviarle Bitcoin instantáneamente en Lightning Network.

Lo importante es analizar como funciona LA. Aquí hay un diagrama sencillo sobre cómo funciona Lightning Address y se basa en el protocolo [LNURL Pay](https://github.com/lnurl/luds/blob/legacy/lnurl-pay.md).

![](https://camo.githubusercontent.com/268abc621585b68fbf1229eab51c3c9344870ec3f227a1ff237c7423ba3ba28e/68747470733a2f2f692e696d6775722e636f6d2f444956357138712e706e67)

Básicamente un usuario al pagar con una billetera que soporta lightning address genera un GET request para recibir como respuesta un json con la siguiente estructura:

```
{
  "tag": "payRequest",
  "callback": "https://tudominio.com/lnurlp/api/v1/lnurl/cb/7",
  "minSendable": 1000,
  "maxSendable": 100000000,
  "metadata": "[[\"text/plain\", \"PayLink de Nicolas Saporiti\"]]",
  "commentAllowed": 140
}
```

Al recibir estos datos la billetera aplica flujo de pago indicado para protocolo LNurl.
Lo más importe en este punto es que identifiquemos cuál es nuestro callback, es decir la función que permite al generar un request obtener la factura para realizar un pago lightning network. En el json anterior podemos ver que se encuentra indicado en el campo callback.

## Haciendo decoder a lightning address
Hay varias formas de decodificar una LA. La primera puede ser utilizando un decodificador en línea como [Lightning Decoder](https://lightningdecoder.com/)

La segunda forma es hacerlo manualmente. Como vimos en el diagrama anterior una LA se compone de username@domain.com entonces por ejemplo para una dirección de GetAlby el json lo podemos obtener en el siguiente link

https://getalby.com/.well-known/lnurlp/username

Por ejemplo este sería el json para mi dirección de GetAlby [Mi Json](https://getalby.com/.well-known/lnurlp/saporiti)

Una vez decodificado el json podemos obtener nuestro callback que recibirá las peticiones para generar facturas lightning network. El endpoint que recibe los llamados toma dos parámetros query que son amount (obligatorio) y memo (opcional). Por ejemplo el siguiente link genera un invoice para mi address en Alby (lo configuré para 1 sats): [Invoice por 1 sat](https://getalby.com/lnurlp/saporiti/callback?amount=1000)

> Debes tener en cuenta que el parámetro amount se indica en mstas en donde 1 sat equivale a 1.000 msats.

> **Tip:** si copias el contenido de tu json, lo guardas en un archivo txt con el username que deseas  (recuerda eliminar la extensión txt) y lo subes a la carpeta https://tudomino/.well-known/lnurlp/ ya tendrás una lightning address operativa con tu propio dominio, por ejemplo carlos@midominio.com

## Custodiando tu lightning address
Hay varias maneras de custodiar LA, las más sencillas son:
#### Generando nuestro propio servidor
Si eres dev y corres tu propio full node, puedes tomar el siguiente repositorio y montarlo en un servidor con el dominio que desees para generar tus propias direcciones. Realmente es muy sencillo de configurar o puedes tenerlo de referencia para crear tu propio desarrollo.

[Servidor Satdress](https://github.com/nbd-wtf/satdress)

Aquí puedes ver un ejemplo ejecutando el repositorio anterior [PayAddress](https://payaddress.co/)

### Configuración manual con LNbits
Para el siguiente método requieres correr un full node y LNbits. Además necesitas que LNbits corra en un dominio https, es decir con protocolo seguro de transferencia de hipertexto. Si no sabes como hacerlo, te dejo la guía de instalación de [LNbits](https://github.com/lnbits/lnbits/blob/main/docs/guide/installation.md)

Si utilizas Umbrel puedes leer la siguiente [guía](https://community.getumbrel.com/t/how-to-configure-umbrel-lnbits-app-without-tor/604)

Una vez que tenemos corriendo nuestro nodo y configurado LNbits debemos crear una wallet. Una vez que la creamos, debemos agregar la extensión LNURLp tal como se muestra en las imágenes.

![LNbits](https://i.ibb.co/BLVLFXT/Screenshot-2022-11-29-at-14-46-36.png)

Luego seleccionas LNURLp y das click en NEW PAY LINK, carga los datos como muestra la imagen

![PayLink](https://i.ibb.co/Bn5hG7H/Screenshot-2022-11-29-at-14-57-17.png)

Cuando terminas de crear tu PayLink, prueba que funcione correctamente con cualquier wallet que de soporte a LNurl. Si todo funciona bien, debes decodificar el LNurl. Para ello copias su dirección (COPY LNURL) como muestra la imagen.

![Copy LNurl](https://i.ibb.co/CB3tSYc/Screenshot-2022-11-29-at-15-01-43.png)

Copiada tu LNurl debes decodificarla, para ello te diriges a esta página [lnurl decoder](https://lnurl.fiatjaf.com/codec/) y obtienes tu callback.

En el ejemplo sería el siguiente [callback](https://legend.lnbits.com/lnurlp/api/v1/lnurl/9392) y si le das click obtienes los datos para pegar en tu json.

Ya con los datos de tu json los guardas en un archivo txt con el nombre de usuario que deseas, recuerda eliminar la extensión txt y subirlo a la carpeta de tu dominio en https://dominio.com/.well-known/lnurlp/

Ahora queda solo probar tu lightning address con cualquier wallet que soporte el protocolo y si la decodificas con [Lightning Decoder](https://lightningdecoder.com/) podrás ver que se indica el callback al dominio de tu servicio LNbits.

Cada vez que recibas sats a tu lightning address se depositarán en tu billetera de LNbits. Recuerda no perder el acceso a tu dirección de lnbits.

Ejecutando cualquiera de los dos métodos tendrás custodia total de tus fondos y direcciones lightning address.

Otra ventaja es que puedes tener una dirección de correo que reciba sats y también correos electrónicos. Puedes escríbeme a nicolas@saporiti.cl o enviarme sats a [nicolas@saporiti.cl](lightning:nicolas@saporiti.cl) para probar.
