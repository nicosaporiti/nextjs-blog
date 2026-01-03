---
title: "Widget YTD: Indicadores financieros en tu iPhone"
date: "2026-01-03"
author: "Nicolás Saporiti"
image: "https://i.imgur.com/qXHuxAX.png"
resume: "Un widget para iOS que muestra UF, dólar, Bitcoin, Nasdaq y más con su rendimiento Year-to-Date en tiempo real."
---

# Widget YTD: Indicadores financieros en tu iPhone

Si te gusta seguir el rendimiento de los principales indicadores financieros, este widget te permite ver de un vistazo cómo van en lo que va del año (YTD - Year to Date).

## Indicadores incluidos

| Indicador | Fuente | Descripción |
|-----------|--------|-------------|
| UF | mindicador.cl | Unidad de Fomento |
| USD | mindicador.cl | Dólar observado |
| Cobre | mindicador.cl | Libra de cobre |
| BTC | CoinGecko | Bitcoin en USD |
| Nasdaq | Yahoo Finance | Nasdaq Composite |
| S&P 500 | Yahoo Finance | S&P 500 Index |
| IPC | mindicador.cl | Índice de Precios al Consumidor |
| TPM | mindicador.cl | Tasa de Política Monetaria |

## Instalación en un click

Requisitos:
- iPhone con iOS 14 o superior
- App [Scriptable](https://apps.apple.com/app/scriptable/id1405459188) instalada

Una vez tengas Scriptable instalado, toca el siguiente enlace desde tu iPhone:

[Instalar Widget YTD](scriptable:///add?scriptName=YTD%20Indicadores&script=%2F%2F%20Widget%20YTD%20-%20Indicadores%20Financieros%0A%0Aconst%20MINDICADOR_URL%20%3D%20'https%3A%2F%2Fmindicador.cl%2Fapi'%3B%0Aconst%20COINGECKO_PRICE_URL%20%3D%20'https%3A%2F%2Fapi.coingecko.com%2Fapi%2Fv3%2Fsimple%2Fprice%3Fids%3Dbitcoin%26vs_currencies%3Dusd'%3B%0Aconst%20COINGECKO_HISTORY_URL%20%3D%20'https%3A%2F%2Fapi.coingecko.com%2Fapi%2Fv3%2Fcoins%2Fbitcoin%2Fhistory'%3B%0A%0A%2F%2F%20Yahoo%3A%20%C3%BAltimo%20d%C3%ADa%20de%20trading%20del%20a%C3%B1o%20anterior%0Afunction%20getYahooYearEndTimestamps()%20%7B%0A%20%20const%20year%20%3D%20new%20Date().getFullYear()%20-%201%3B%0A%20%20const%20dec30%20%3D%20new%20Date(year%2C%2011%2C%2030)%3B%0A%20%20const%20jan2%20%3D%20new%20Date(year%20%2B%201%2C%200%2C%202)%3B%0A%20%20return%20%7B%0A%20%20%20%20period1%3A%20Math.floor(dec30.getTime()%20%2F%201000)%2C%0A%20%20%20%20period2%3A%20Math.floor(jan2.getTime()%20%2F%201000)%0A%20%20%7D%3B%0A%7D%0A%0A%2F%2F%20Calcular%20YTD%20con%20formato%20y%20color%0Aconst%20calculateYTD%20%3D%20(initial%2C%20current)%20%3D%3E%20%7B%0A%20%20if%20(!initial%20%7C%7C%20!current)%20return%20%7B%20value%3A%20'N%2FA'%2C%20positive%3A%20null%20%7D%3B%0A%20%20const%20ytd%20%3D%20((current%20%2F%20initial)%20-%201)%20*%20100%3B%0A%20%20return%20%7B%0A%20%20%20%20value%3A%20ytd.toFixed(2)%2C%0A%20%20%20%20positive%3A%20ytd%20%3E%3D%200%0A%20%20%7D%3B%0A%7D%3B%0A%0A%2F%2F%20Formatear%20n%C3%BAmero%20con%20separador%20de%20miles%0Aconst%20formatNumber%20%3D%20(num%2C%20decimals%20%3D%202)%20%3D%3E%20%7B%0A%20%20if%20(!num)%20return%20'N%2FA'%3B%0A%20%20return%20num.toLocaleString('es-CL'%2C%20%7B%0A%20%20%20%20minimumFractionDigits%3A%20decimals%2C%0A%20%20%20%20maximumFractionDigits%3A%20decimals%0A%20%20%7D)%3B%0A%7D%3B%0A%0A%2F%2F%20Obtener%20%C3%BAltimo%20valor%20de%20diciembre%20(la%20API%20ya%20viene%20ordenada%20desc)%0Afunction%20getLastDecemberValue(serie%2C%20year)%20%7B%0A%20%20return%20serie.find(item%20%3D%3E%20%7B%0A%20%20%20%20const%20d%20%3D%20new%20Date(item.fecha)%3B%0A%20%20%20%20return%20d.getFullYear()%20%3D%3D%3D%20year%20%26%26%20d.getMonth()%20%3D%3D%3D%2011%3B%0A%20%20%7D)%3F.valor%3B%0A%7D%0A%0Aasync%20function%20fetchInitialValues()%20%7B%0A%20%20const%20prevYear%20%3D%20new%20Date().getFullYear()%20-%201%3B%0A%20%20const%20yahoo%20%3D%20getYahooYearEndTimestamps()%3B%0A%20%20const%20btcDate%20%3D%20%6031-12-%24%7BprevYear%7D%60%3B%0A%0A%20%20try%20%7B%0A%20%20%20%20const%20%5BufData%2C%20dolarData%2C%20cobreData%2C%20nasdaqData%2C%20sp500Data%2C%20btcData%5D%20%3D%20await%20Promise.all(%5B%0A%20%20%20%20%20%20new%20Request(%60https%3A%2F%2Fmindicador.cl%2Fapi%2Fuf%2F%24%7BprevYear%7D%60).loadJSON()%2C%0A%20%20%20%20%20%20new%20Request(%60https%3A%2F%2Fmindicador.cl%2Fapi%2Fdolar%2F%24%7BprevYear%7D%60).loadJSON()%2C%0A%20%20%20%20%20%20new%20Request(%60https%3A%2F%2Fmindicador.cl%2Fapi%2Flibra_cobre%2F%24%7BprevYear%7D%60).loadJSON()%2C%0A%20%20%20%20%20%20new%20Request(%60https%3A%2F%2Fquery1.finance.yahoo.com%2Fv8%2Ffinance%2Fchart%2F%255EIXIC%3Fperiod1%3D%24%7Byahoo.period1%7D%26period2%3D%24%7Byahoo.period2%7D%26interval%3D1d%60).loadJSON()%2C%0A%20%20%20%20%20%20new%20Request(%60https%3A%2F%2Fquery1.finance.yahoo.com%2Fv8%2Ffinance%2Fchart%2F%255EGSPC%3Fperiod1%3D%24%7Byahoo.period1%7D%26period2%3D%24%7Byahoo.period2%7D%26interval%3D1d%60).loadJSON()%2C%0A%20%20%20%20%20%20new%20Request(%60%24%7BCOINGECKO_HISTORY_URL%7D%3Fdate%3D%24%7BbtcDate%7D%60).loadJSON()%0A%20%20%20%20%5D)%3B%0A%0A%20%20%20%20const%20nasdaqCloses%20%3D%20nasdaqData.chart%3F.result%3F.%5B0%5D%3F.indicators%3F.quote%3F.%5B0%5D%3F.close%20%7C%7C%20%5B%5D%3B%0A%20%20%20%20const%20sp500Closes%20%3D%20sp500Data.chart%3F.result%3F.%5B0%5D%3F.indicators%3F.quote%3F.%5B0%5D%3F.close%20%7C%7C%20%5B%5D%3B%0A%0A%20%20%20%20return%20%7B%0A%20%20%20%20%20%20uf%3A%20getLastDecemberValue(ufData.serie%20%7C%7C%20%5B%5D%2C%20prevYear)%2C%0A%20%20%20%20%20%20dolar%3A%20getLastDecemberValue(dolarData.serie%20%7C%7C%20%5B%5D%2C%20prevYear)%2C%0A%20%20%20%20%20%20cobre%3A%20getLastDecemberValue(cobreData.serie%20%7C%7C%20%5B%5D%2C%20prevYear)%2C%0A%20%20%20%20%20%20nasdaq%3A%20nasdaqCloses%5BnasdaqCloses.length%20-%201%5D%2C%0A%20%20%20%20%20%20sp500%3A%20sp500Closes%5Bsp500Closes.length%20-%201%5D%2C%0A%20%20%20%20%20%20btc%3A%20btcData.market_data%3F.current_price%3F.usd%0A%20%20%20%20%7D%3B%0A%20%20%7D%20catch%20(e)%20%7B%0A%20%20%20%20console.log('Error%3A%20'%20%2B%20e)%3B%0A%20%20%20%20return%20null%3B%0A%20%20%7D%0A%7D%0A%0Aasync%20function%20fetchCurrentValues()%20%7B%0A%20%20const%20%5BdataBtc%2C%20dataIndicador%2C%20dataNasdaq%2C%20dataSp500%5D%20%3D%20await%20Promise.all(%5B%0A%20%20%20%20new%20Request(COINGECKO_PRICE_URL).loadJSON()%2C%0A%20%20%20%20new%20Request(MINDICADOR_URL).loadJSON()%2C%0A%20%20%20%20new%20Request('https%3A%2F%2Fquery1.finance.yahoo.com%2Fv8%2Ffinance%2Fchart%2F%255EIXIC%3Finterval%3D1d%26range%3D1d').loadJSON()%2C%0A%20%20%20%20new%20Request('https%3A%2F%2Fquery1.finance.yahoo.com%2Fv8%2Ffinance%2Fchart%2F%255EGSPC%3Finterval%3D1d%26range%3D1d').loadJSON()%0A%20%20%5D)%3B%0A%0A%20%20return%20%7B%0A%20%20%20%20uf%3A%20dataIndicador.uf%3F.valor%2C%0A%20%20%20%20dolar%3A%20dataIndicador.dolar%3F.valor%2C%0A%20%20%20%20cobre%3A%20dataIndicador.libra_cobre%3F.valor%2C%0A%20%20%20%20btc%3A%20dataBtc.bitcoin%3F.usd%2C%0A%20%20%20%20ipc%3A%20dataIndicador.ipc%3F.valor%2C%0A%20%20%20%20tpm%3A%20dataIndicador.tpm%3F.valor%2C%0A%20%20%20%20nasdaq%3A%20dataNasdaq.chart%3F.result%3F.%5B0%5D%3F.meta%3F.regularMarketPrice%2C%0A%20%20%20%20sp500%3A%20dataSp500.chart%3F.result%3F.%5B0%5D%3F.meta%3F.regularMarketPrice%0A%20%20%7D%3B%0A%7D%0A%0Aasync%20function%20createWidget()%20%7B%0A%20%20const%20%5BinitValues%2C%20currentValues%5D%20%3D%20await%20Promise.all(%5B%0A%20%20%20%20fetchInitialValues()%2C%0A%20%20%20%20fetchCurrentValues()%0A%20%20%5D)%3B%0A%0A%20%20let%20widget%20%3D%20new%20ListWidget()%3B%0A%0A%20%20if%20(!initValues%20%7C%7C%20!currentValues)%20%7B%0A%20%20%20%20widget.addText(%22Error%20al%20cargar%20datos%22)%3B%0A%20%20%20%20return%20widget%3B%0A%20%20%7D%0A%20%20widget.backgroundColor%20%3D%20new%20Color(%22%23FFFFFF%22)%3B%0A%20%20widget.setPadding(12%2C%2014%2C%2012%2C%2014)%3B%0A%0A%20%20%2F%2F%20Header%20compacto%0A%20%20let%20headerStack%20%3D%20widget.addStack()%3B%0A%20%20headerStack.layoutHorizontally()%3B%0A%0A%20%20let%20title%20%3D%20headerStack.addText(%22YTD%20%22%20%2B%20new%20Date().getFullYear())%3B%0A%20%20title.font%20%3D%20Font.boldSystemFont(11)%3B%0A%20%20title.textColor%20%3D%20new%20Color(%22%23666666%22)%3B%0A%0A%20%20headerStack.addSpacer()%3B%0A%0A%20%20let%20ipcTpm%20%3D%20headerStack.addText(%60IPC%20%24%7BcurrentValues.ipc%20%7C%7C%20'-'%7D%25%20%20TPM%20%24%7BcurrentValues.tpm%20%7C%7C%20'-'%7D%25%60)%3B%0A%20%20ipcTpm.font%20%3D%20Font.systemFont(9)%3B%0A%20%20ipcTpm.textColor%20%3D%20new%20Color(%22%23999999%22)%3B%0A%0A%20%20widget.addSpacer(6)%3B%0A%0A%20%20%2F%2F%20Indicadores%0A%20%20const%20indicators%20%3D%20%5B%0A%20%20%20%20%7B%20name%3A%20%22UF%22%2C%20current%3A%20currentValues.uf%2C%20initial%3A%20initValues.uf%2C%20prefix%3A%20%22%24%22%2C%20decimals%3A%200%20%7D%2C%0A%20%20%20%20%7B%20name%3A%20%22USD%22%2C%20current%3A%20currentValues.dolar%2C%20initial%3A%20initValues.dolar%2C%20prefix%3A%20%22%24%22%2C%20decimals%3A%200%20%7D%2C%0A%20%20%20%20%7B%20name%3A%20%22Cobre%22%2C%20current%3A%20currentValues.cobre%2C%20initial%3A%20initValues.cobre%2C%20prefix%3A%20%22%24%22%2C%20decimals%3A%202%20%7D%2C%0A%20%20%20%20%7B%20name%3A%20%22BTC%22%2C%20current%3A%20currentValues.btc%2C%20initial%3A%20initValues.btc%2C%20prefix%3A%20%22%22%2C%20decimals%3A%200%20%7D%2C%0A%20%20%20%20%7B%20name%3A%20%22Nasdaq%22%2C%20current%3A%20currentValues.nasdaq%2C%20initial%3A%20initValues.nasdaq%2C%20prefix%3A%20%22%22%2C%20decimals%3A%200%20%7D%2C%0A%20%20%20%20%7B%20name%3A%20%22S%26P500%22%2C%20current%3A%20currentValues.sp500%2C%20initial%3A%20initValues.sp500%2C%20prefix%3A%20%22%22%2C%20decimals%3A%200%20%7D%0A%20%20%5D%3B%0A%0A%20%20for%20(const%20ind%20of%20indicators)%20%7B%0A%20%20%20%20let%20row%20%3D%20widget.addStack()%3B%0A%20%20%20%20row.layoutHorizontally()%3B%0A%20%20%20%20row.centerAlignContent()%3B%0A%0A%20%20%20%20let%20nameText%20%3D%20row.addText(ind.name)%3B%0A%20%20%20%20nameText.font%20%3D%20Font.mediumSystemFont(12)%3B%0A%20%20%20%20nameText.textColor%20%3D%20new%20Color(%22%23333333%22)%3B%0A%20%20%20%20nameText.lineLimit%20%3D%201%3B%0A%0A%20%20%20%20row.addSpacer()%3B%0A%0A%20%20%20%20let%20valueText%20%3D%20row.addText(ind.prefix%20%2B%20formatNumber(ind.current%2C%20ind.decimals))%3B%0A%20%20%20%20valueText.font%20%3D%20Font.systemFont(11)%3B%0A%20%20%20%20valueText.textColor%20%3D%20new%20Color(%22%23666666%22)%3B%0A%0A%20%20%20%20row.addSpacer(6)%3B%0A%0A%20%20%20%20const%20ytd%20%3D%20calculateYTD(ind.initial%2C%20ind.current)%3B%0A%20%20%20%20const%20sign%20%3D%20ytd.positive%20%3F%20%22%2B%22%20%3A%20%22%22%3B%0A%20%20%20%20let%20ytdText%20%3D%20row.addText(%60%24%7Bsign%7D%24%7Bytd.value%7D%25%60)%3B%0A%20%20%20%20ytdText.font%20%3D%20Font.boldSystemFont(11)%3B%0A%20%20%20%20ytdText.textColor%20%3D%20ytd.positive%20%3D%3D%3D%20null%0A%20%20%20%20%20%20%3F%20new%20Color(%22%23999999%22)%0A%20%20%20%20%20%20%3A%20ytd.positive%0A%20%20%20%20%20%20%20%20%3F%20new%20Color(%22%2322c55e%22)%0A%20%20%20%20%20%20%20%20%3A%20new%20Color(%22%23ef4444%22)%3B%0A%0A%20%20%20%20widget.addSpacer(2)%3B%0A%20%20%7D%0A%0A%20%20return%20widget%3B%0A%7D%0A%0A%2F%2F%20Ejecutar%0Alet%20widget%20%3D%20await%20createWidget()%3B%0Aif%20(config.runsInWidget)%20%7B%0A%20%20Script.setWidget(widget)%3B%0A%20%20Script.complete()%3B%0A%7D%20else%20%7B%0A%20%20widget.presentMedium()%3B%0A%7D%0A)

> El enlace abrirá Scriptable y creará automáticamente el script "YTD Indicadores".

## Cómo agregar el widget al Home Screen

1. Mantén presionado en el home screen hasta que las apps tiemblen
2. Toca el botón **+** en la esquina superior izquierda
3. Busca **Scriptable** en la lista de widgets
4. Selecciona el tamaño **Medium**
5. Toca **Agregar Widget**
6. Mantén presionado el widget recién agregado
7. Selecciona **Editar Widget**
8. En **Script** selecciona **YTD Indicadores**
9. Listo

## Cómo funciona

El widget calcula el rendimiento YTD usando la fórmula:

```
YTD% = ((valor_actual / valor_cierre_año_anterior) - 1) * 100
```

Los valores de cierre del año anterior se obtienen automáticamente:
- **Indicadores chilenos**: Último valor disponible de diciembre vía [mindicador.cl](https://mindicador.cl)
- **Bitcoin**: Precio al 31 de diciembre vía [CoinGecko](https://coingecko.com)
- **Índices USA**: Último cierre de diciembre vía Yahoo Finance

## Código fuente

El código completo está disponible en [GitHub](https://github.com/nsaporiti/script_iphone) si quieres revisarlo o modificarlo.

## Notas

- El widget se actualiza según la frecuencia configurada en iOS (generalmente cada 15-30 minutos)
- Los colores indican rendimiento: verde = positivo, rojo = negativo
- IPC y TPM se muestran como referencia (son tasas, no tienen cálculo YTD)
