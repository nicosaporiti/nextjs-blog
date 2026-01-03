---
title: "Widget YTD - Indicadores Financieros"
date: "2026-01-03"
author: "Nicolás Saporiti"
image: "https://i.imgur.com/qXHuxAX.png"
resume: "Widget para Scriptable (iOS) que muestra indicadores financieros con su rendimiento Year-to-Date (YTD).
"
---
# Widget YTD - Indicadores Financieros

Widget para Scriptable (iOS) que muestra indicadores financieros con su rendimiento Year-to-Date (YTD).
![](https://i.imgur.com/qXHuxAX.png)

## Indicadores

| Indicador | Fuente | Endpoint |
|-----------|--------|----------|
| UF | mindicador.cl | `/api/uf/{año}` |
| Dólar | mindicador.cl | `/api/dolar/{año}` |
| Cobre | mindicador.cl | `/api/libra_cobre/{año}` |
| Bitcoin | CoinGecko | `/simple/price` y `/coins/bitcoin/history` |
| Nasdaq | Yahoo Finance | `/v8/finance/chart/%5EIXIC` |
| S&P 500 | Yahoo Finance | `/v8/finance/chart/%5EGSPC` |
| IPC | mindicador.cl | `/api` |
| TPM | mindicador.cl | `/api` |

## Cálculo YTD

```
YTD% = ((valor_actual / valor_inicial) - 1) * 100
```

- **Valor inicial**: Último valor disponible de diciembre del año anterior
- **Valor actual**: Precio en tiempo real

## Flujo de datos

```
┌─────────────────────────────────────────────────────────┐
│                    createWidget()                       │
├─────────────────────────────────────────────────────────┤
│                          │                              │
│    fetchInitialValues()  │  fetchCurrentValues()        │
│           │              │           │                  │
│           ▼              │           ▼                  │
│   ┌───────────────┐      │   ┌───────────────┐          │
│   │ mindicador.cl │      │   │ mindicador.cl │          │
│   │ (año completo)│      │   │ (valores hoy) │          │
│   └───────────────┘      │   └───────────────┘          │
│           │              │           │                  │
│           ▼              │           ▼                  │
│   getLastDecemberValue() │   Extrae .valor              │
│           │              │           │                  │
│           ▼              │           ▼                  │
│   ┌───────────────┐      │   ┌───────────────┐          │
│   │   CoinGecko   │      │   │   CoinGecko   │          │
│   │  /history     │      │   │ /simple/price │          │
│   └───────────────┘      │   └───────────────┘          │
│           │              │           │                  │
│           ▼              │           ▼                  │
│   ┌───────────────┐      │   ┌───────────────┐          │
│   │ Yahoo Finance │      │   │ Yahoo Finance │          │
│   │ (últimos días │      │   │ (precio actual)│         │
│   │  de diciembre)│      │   └───────────────┘          │
│   └───────────────┘      │                              │
│                          │                              │
└─────────────────────────────────────────────────────────┘
```

## Funciones principales

### `getYahooYearEndTimestamps()`
Genera timestamps Unix para consultar Yahoo Finance (30 dic - 2 ene).

### `getLastDecemberValue(serie, year)`
Filtra el array de datos de mindicador y retorna el último valor de diciembre. La API retorna datos ordenados de forma descendente, por lo que `find()` obtiene el más reciente.

### `fetchInitialValues()`
Obtiene valores de cierre del año anterior:
- mindicador: `/api/{indicador}/{año}` → filtra diciembre
- CoinGecko: `/history?date=31-12-{año}`
- Yahoo: rango de fechas fin de año → último cierre

### `fetchCurrentValues()`
Obtiene valores actuales en tiempo real de todas las fuentes.

### `createWidget()`
Construye el widget con:
- Header: "YTD {año}" + IPC/TPM
- Lista de indicadores con valor actual y % YTD
- Colores: verde (+) / rojo (-)

## APIs utilizadas

### mindicador.cl
```
GET https://mindicador.cl/api                    # Valores actuales
GET https://mindicador.cl/api/{indicador}/{año}  # Histórico anual
```

### CoinGecko
```
GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
GET https://api.coingecko.com/api/v3/coins/bitcoin/history?date=DD-MM-YYYY
```

### Yahoo Finance
```
GET https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1d&range=1d
GET https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?period1={unix}&period2={unix}&interval=1d
```

Símbolos: `%5EIXIC` (Nasdaq), `%5EGSPC` (S&P 500)

## Instalación

1. Instalar [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) en iOS
2. Copiar contenido de `Código` en un nuevo script
3. Agregar widget de Scriptable al home screen
4. Seleccionar el script creado

## Código

```// Widget YTD - Indicadores Financieros

const MINDICADOR_URL = 'https://mindicador.cl/api';
const COINGECKO_PRICE_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
const COINGECKO_HISTORY_URL = 'https://api.coingecko.com/api/v3/coins/bitcoin/history';

// Yahoo: último día de trading del año anterior
function getYahooYearEndTimestamps() {
  const year = new Date().getFullYear() - 1;
  const dec30 = new Date(year, 11, 30);
  const jan2 = new Date(year + 1, 0, 2);
  return {
    period1: Math.floor(dec30.getTime() / 1000),
    period2: Math.floor(jan2.getTime() / 1000)
  };
}

// Calcular YTD con formato y color
const calculateYTD = (initial, current) => {
  if (!initial || !current) return { value: 'N/A', positive: null };
  const ytd = ((current / initial) - 1) * 100;
  return {
    value: ytd.toFixed(2),
    positive: ytd >= 0
  };
};

// Formatear número con separador de miles
const formatNumber = (num, decimals = 2) => {
  if (!num) return 'N/A';
  return num.toLocaleString('es-CL', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

// Obtener último valor de diciembre (la API ya viene ordenada desc)
function getLastDecemberValue(serie, year) {
  return serie.find(item => {
    const d = new Date(item.fecha);
    return d.getFullYear() === year && d.getMonth() === 11;
  })?.valor;
}

async function fetchInitialValues() {
  const prevYear = new Date().getFullYear() - 1;
  const yahoo = getYahooYearEndTimestamps();
  const btcDate = `31-12-${prevYear}`;

  try {
    const [ufData, dolarData, cobreData, nasdaqData, sp500Data, btcData] = await Promise.all([
      new Request(`https://mindicador.cl/api/uf/${prevYear}`).loadJSON(),
      new Request(`https://mindicador.cl/api/dolar/${prevYear}`).loadJSON(),
      new Request(`https://mindicador.cl/api/libra_cobre/${prevYear}`).loadJSON(),
      new Request(`https://query1.finance.yahoo.com/v8/finance/chart/%5EIXIC?period1=${yahoo.period1}&period2=${yahoo.period2}&interval=1d`).loadJSON(),
      new Request(`https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC?period1=${yahoo.period1}&period2=${yahoo.period2}&interval=1d`).loadJSON(),
      new Request(`${COINGECKO_HISTORY_URL}?date=${btcDate}`).loadJSON()
    ]);

    const nasdaqCloses = nasdaqData.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];
    const sp500Closes = sp500Data.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];

    return {
      uf: getLastDecemberValue(ufData.serie || [], prevYear),
      dolar: getLastDecemberValue(dolarData.serie || [], prevYear),
      cobre: getLastDecemberValue(cobreData.serie || [], prevYear),
      nasdaq: nasdaqCloses[nasdaqCloses.length - 1],
      sp500: sp500Closes[sp500Closes.length - 1],
      btc: btcData.market_data?.current_price?.usd
    };
  } catch (e) {
    console.log('Error: ' + e);
    return null;
  }
}

async function fetchCurrentValues() {
  const [dataBtc, dataIndicador, dataNasdaq, dataSp500] = await Promise.all([
    new Request(COINGECKO_PRICE_URL).loadJSON(),
    new Request(MINDICADOR_URL).loadJSON(),
    new Request('https://query1.finance.yahoo.com/v8/finance/chart/%5EIXIC?interval=1d&range=1d').loadJSON(),
    new Request('https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC?interval=1d&range=1d').loadJSON()
  ]);

  return {
    uf: dataIndicador.uf?.valor,
    dolar: dataIndicador.dolar?.valor,
    cobre: dataIndicador.libra_cobre?.valor,
    btc: dataBtc.bitcoin?.usd,
    ipc: dataIndicador.ipc?.valor,
    tpm: dataIndicador.tpm?.valor,
    nasdaq: dataNasdaq.chart?.result?.[0]?.meta?.regularMarketPrice,
    sp500: dataSp500.chart?.result?.[0]?.meta?.regularMarketPrice
  };
}

async function createWidget() {
  const [initValues, currentValues] = await Promise.all([
    fetchInitialValues(),
    fetchCurrentValues()
  ]);

  let widget = new ListWidget();

  if (!initValues || !currentValues) {
    widget.addText("Error al cargar datos");
    return widget;
  }
  widget.backgroundColor = new Color("#FFFFFF");
  widget.setPadding(12, 14, 12, 14);

  // Header compacto
  let headerStack = widget.addStack();
  headerStack.layoutHorizontally();

  let title = headerStack.addText("YTD " + new Date().getFullYear());
  title.font = Font.boldSystemFont(11);
  title.textColor = new Color("#666666");

  headerStack.addSpacer();

  let ipcTpm = headerStack.addText(`IPC ${currentValues.ipc || '-'}%  TPM ${currentValues.tpm || '-'}%`);
  ipcTpm.font = Font.systemFont(9);
  ipcTpm.textColor = new Color("#999999");

  widget.addSpacer(6);

  // Indicadores
  const indicators = [
    { name: "UF", current: currentValues.uf, initial: initValues.uf, prefix: "$", decimals: 0 },
    { name: "USD", current: currentValues.dolar, initial: initValues.dolar, prefix: "$", decimals: 0 },
    { name: "Cobre", current: currentValues.cobre, initial: initValues.cobre, prefix: "$", decimals: 2 },
    { name: "BTC", current: currentValues.btc, initial: initValues.btc, prefix: "", decimals: 0 },
    { name: "Nasdaq", current: currentValues.nasdaq, initial: initValues.nasdaq, prefix: "", decimals: 0 },
    { name: "S&P500", current: currentValues.sp500, initial: initValues.sp500, prefix: "", decimals: 0 }
  ];

  for (const ind of indicators) {
    let row = widget.addStack();
    row.layoutHorizontally();
    row.centerAlignContent();

    let nameText = row.addText(ind.name);
    nameText.font = Font.mediumSystemFont(12);
    nameText.textColor = new Color("#333333");
    nameText.lineLimit = 1;

    row.addSpacer();

    let valueText = row.addText(ind.prefix + formatNumber(ind.current, ind.decimals));
    valueText.font = Font.systemFont(11);
    valueText.textColor = new Color("#666666");

    row.addSpacer(6);

    const ytd = calculateYTD(ind.initial, ind.current);
    const sign = ytd.positive ? "+" : "";
    let ytdText = row.addText(`${sign}${ytd.value}%`);
    ytdText.font = Font.boldSystemFont(11);
    ytdText.textColor = ytd.positive === null
      ? new Color("#999999")
      : ytd.positive
        ? new Color("#22c55e")
        : new Color("#ef4444");

    widget.addSpacer(2);
  }

  return widget;
}

// Ejecutar
let widget = await createWidget();
if (config.runsInWidget) {
  Script.setWidget(widget);
  Script.complete();
} else {
  widget.presentMedium();
}
```



## Notas

- El widget se actualiza según la frecuencia configurada en iOS
- Si falla alguna API, muestra "Error al cargar datos"
- IPC y TPM se muestran sin cálculo YTD (son tasas, no precios)
