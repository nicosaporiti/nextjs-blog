---
title: "¿Qué construir con Inteligencia (AI)?"
date: "2026-03-17"
author: "Nicolás Saporiti"
image: "https://images.unsplash.com/photo-1533537841959-705741f3d3a5?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
resume: "Guía simple para desarrollar valor y no caer en una fatiga mental utilizando herramientas de AI."
---
# **¿Qué construir con Inteligencia? (AI)**

### Guía simple para desarrollar valor y no caer en una fatiga mental.

Estas semanas han sido brutales las peleas en X (Twitter). Personas que desarrollan aplicaciones (que poco interesan) asistidas por Codex o Claude Code, afirman que será el fin de los desarrolladores. Los "devs" con trayectoria se defienden con sólidos fundamentos. Argumentan que los "AI Bros" son un meteorito de destrucción masiva y que, en el próximo armagedón, clamarán por su ayuda en un mundo que no podrá dar ni un like.

De lo anterior tengo una reflexión final, pero entre insultos de ida y vuelta, encontré un tuit fantástico de Naval que resume todo el conflicto:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Coding an app is the new starting a podcast.</p>&mdash; Naval (@naval) <a href="https://twitter.com/naval/status/2033416520613732595?ref_src=twsrc%5Etfw">March 16, 2026</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Tiene mucho sentido. Hoy crear una app es sumamente sencillo; el muro de conocimiento técnico ha caído, en la práctica, a cero. Cualquier persona con una idea clara puede generar un producto mínimo viable (MVP) bastante "potable" en una tarde.

Naval lo compara con los pódcast: cualquiera los puede hacer, muchos lo hacen, pero lo difícil es que te escuchen y lograr distribuirlos.

***¿Entonces, qué podemos construir atravesando este vertiginoso y violento cambalache de innovación explosiva sin contribuir al "AI Slop"?***


## Definir el dolor personal, tu cash engine y el laboratorio de ideas

En mi caso, he pasado por varios estados utilizando agentes para resolver problemas. Desde cómo organizar una agenda con mis hijos hasta juegos para que aprendan números. Logré divertirme y crear productos que, a los dos días, no usa nadie. Pero ese loop creativo, si eres tan de "maquinar" como yo, te lleva a un estado de euforia-depresión por el millón de posibilidades que te patean la frente. Por suerte, creo que ese estado de "no sé lo que quiero, pero lo quiero ya" me llevó a concluir hacia dónde tendría que apuntar.

### **Potenciar tu cash engine**

El concepto de cash engine es, básicamente, la máquina que te hace ganar plata o de lo que vives. En la edad madura, el cash engine termina siendo lo que te da libertad para hacer lo que quieres; en mi caso, pensar muchas tonteras.

Entonces me dije: vamos a tratar de aplicarlo al corazón de mi trabajo (mi cash engine), porque si sigo perdiendo tiempo en tonteras, voy a perder plata. Es ahí cuando automatizar con AI cobra mucho sentido.

Utilicé como método de diagnóstico algo bien sencillo: generé una lista de todas las tareas diarias, semanales y mensuales que hago en mi trabajo junto a las herramientas que utilizaba (Excel, ERP, etc.). Le pedí a ChatGPT que me diera propuestas para ser más eficiente y ahí aparecieron los primeros grandes temas a resolver que impactarían en que tenga más tiempo para hacer lo que me gusta.

Por ejemplo, manejo la tesorería de seis empresas con tres bancos distintos, pero todo bajo un mismo ERP. Era un "embole" de aquellos tener que sacar la información y preparar las planillas de transferencias (TEF), considerando que cada banco en Chile tiene su formato. La solución fue una aplicación que parsea los datos del ERP, me permite confirmar lo que pago por cada empresa y prepara los TEF por banco. Eso me ahorró, mínimo, dos horas de trabajo semanal. Si lo llevo a un año, son 104 horas o casi cuatro días y medio para hacer lo que se me ocurra; es decir, nada.  *Ahora con menos tiempo, genero más ingresos*

### **El laboratorio de tus ideas**

Esto surgió al decir: bueno, si me gusta encontrar problemas para solucionar con agentes, debo hacerlo en actividades fuera de mi trabajo pero que me traigan satisfacción sin depender de terceros. Quizás mi problema sea el de muchos, o al menos, seguro será el mío.

Así nace mi laboratorio de ideas. Está aplicado a lo que hago fuera de mi trabajo, pero que es parte de mis rutinas. Por ejemplo, voy al gimnasio, me gusta leer para mantenerme informado y también soy muy "nerdo" para manejar mis inversiones.

Para el gimnasio existen mil aplicaciones de tracking, pero ninguna me convencía. Quería tener los datos de mis ejercicios a mano, exportarlos y analizarlos con algún LLM. Por eso creé una app simple que al final terminó usando toda la familia y amigos, porque permite usar sus propios datos para preparar rutinas con algún agente de preferencia y luego hacer seguimiento. Además, sufro una lesión crónica de codo, lo que me permite planificar a conciencia las semanas de descarga de peso para no sufrir dolores. Acá la puedes ver: [Groso.app](https://groso.app/)

Dije antes que me gusta leer. Estoy cansado de los medios y sus eternas propagandas, pop-ups y miles de tonteras que se abren por todos lados. Solución: una vieja tecnología llamada RSS para obtener las últimas noticias y entradas de diarios, blogs, etc. De ahí nació Matcher News, que es un lector RSS como miles que existen, pero ajustado a lo que yo quería: datos soberanos y libre de publicidad. Lo uso todos los días junto a varias personas que se suman cada semana. La idea es simple: leer y seguir lo que te gusta sin interrupciones. [Matcher.news](https://matcher.news)

Luego me gusta invertir y, para eso, me mantengo informado. Hace años creé [Buscafondos.com](https://buscafondos.com/) mientras aprendía programación. Hoy eso se haría en una tarde con agentes. Para obtener los datos, utilizaba una API de Fintual a la que dejaron de dar mantenimiento (según el correo que me respondieron al consultarles). La solución: en una tarde con Claude le hicimos ingeniería inversa a la API existente y hoy la app maneja su propia base de datos obtenida de la CMF.

La idea de tener tu laboratorio es solucionar problemas que a ti te importan, que te mantienen motivado, pero que otros no pueden solucionarte o seguramente te cobrarían caro. En tu laboratorio vas a "perder" el tiempo que ahorraste en tu cash engine para hacer lo que más te gusta y lo que te da total libertad creativa.

En mi laboratorio tengo muchas ideas pero trato de limitarlas a que me ayuden con mis actividades extras para no perder foco en lo que importa o vaya cobrando importancia.

## Dolor fuera de foco: desarrolla lo que sabes hacer.

El mayor peligro de hoy al generar soluciones con agentes es resolver problemas que nadie tiene o que otros han resuelto mejor. Vi un tuit donde un personaje estaba orgulloso de haber creado una solución de Recursos Humanos en un fin de semana para su empresa.

¿Qué sentido tiene solucionar algo que otros resolvieron hace rato y no es parte de tu core? Vas a terminar desarrollando una solución que necesita constante actualización por cambios de legislación y perderás el foco de tu negocio, que quizás es fabricar muebles, pero ahora pretende ser "el nuevo Buk o Talana". No tiene sentido.

Generar software de nivel es caro, y más aún cuando tiene un alcance masivo, porque las responsabilidades en el manejo de datos son mayores. Volviendo al ejemplo anterior, crear una solución para liquidar sueldos, si está mal diseñada o tiene errores de lógica en ciertos escenarios, te puede traer problemas legales y un costo mayor que el beneficio esperado.

### **Vende lo que sabes**

Esto es difícil de aceptar: vivimos en un mundo en donde pisas minas de innovación a cada paso. Es como que todo lo que siempre hemos soñado ahora es posible de resolver, pero la verdad es que es tan difícil (o peor) que antes.

Es más probable que, si eres fabricante de sillas, vendas más y mejor por aplicar inteligencia artificial para mejorar tus procesos, que si te pones a crear el próximo Uber. Es 1000 veces más difícil que alguien pague con su tarjeta de crédito por la solución dudosa de una aplicación bonita "vibecodeada" un fin de semana, a que paguen por una buena silla. Te aseguro que si bajas el precio de la silla, la vendes antes de que su valor llegue a cero. Con las soluciones digitales no pasa: puedes tener un producto fantástico, pero incluso a costo cero no lo vendes si no resuelves nada.

## Mi receta final(?).

1. ***Construye para automatizar y mejorar tu cash engine***. Ahorra tiempo.

2. ***Cuando ahorres tiempo, construye para resolver lo que te gusta a ti, a tu familia y amigos.*** Puedes moldear y configurar tu mundo digital.

3. ***No pierdas el foco.*** Construye lo que entiendas y ames.

4. ***Sé responsable con el vibecoding.*** Es hoy tu mejor herramienta para mejorar lo que haces y desarrollar la creatividad, pero si se rompe, que no genere daño. Dato que se filtra, se pierde para siempre.

***Volviendo a los desarrolladores: no serán reemplazados.***










 




