# hagamos-numeros

## Qué es
App web (PWA) para repartir gastos entre amigos: se cargan amigos y gastos, y la app calcula cuánto le toca a cada uno y quién le paga a quién. Los datos viven en el navegador (localStorage); no hay backend.

## Stack
- React 19 con Vite 6, en JavaScript (no TypeScript).
- PWA con `vite-plugin-pwa`.
- Estilos con CSS Modules (`*.module.css`) junto a cada componente.
- Exportar resultados como imagen con `html2canvas`; analítica con `react-ga4`.

## Comandos
- Instalar: `npm install`
- Desarrollo: `npm run dev`
- Lint: `npm run lint`
- Tests: todavía no hay (primer Issue de la fábrica: agregarlos a `src/utils/calculations.js`)
- Build: `npm run build`

## Arquitectura y convenciones
- Un componente por carpeta en `src/components/<Nombre>/<Nombre>.jsx`, con su CSS Module al lado cuando lo necesita.
- La lógica de cálculo vive en `src/utils/calculations.js` (`formatCurrency`, `parseCurrencyToNumber`, `calculateSplits`, `getSettlements`). Los componentes no calculan: llaman a estas funciones.
- El estado persistente pasa por `FriendsManager` y `ExpensesManager`, que leen y escriben localStorage con las claves `friends` y `expenses`.
- Idioma de la interfaz: español.

## Zonas que no se tocan
- `dist/` está commiteada; no se edita a mano. Solo cambia si se pide un build explícito.
- Las claves de localStorage `friends` y `expenses`: cambiarlas rompe los datos de quienes ya usan la app.

## Cómo trabaja la fábrica
- Un Issue es una rama `issue-<número>-<slug>` y un PR.
- Antes de abrir el PR deben pasar `npm run lint` y `npm run build`, y hay que correr el agente `revisor`.
- Preguntar antes de agregar dependencias, cambiar la estructura de carpetas, borrar archivos o cambiar las claves de localStorage.
- Si falta información, comentar en el Issue y poner la etiqueta `necesita-decision`; no adivinar.
- Nunca hacer merge ni push a `main`, ni cerrar Issues a mano: el merge lo hace el dueño del proyecto, aunque tu sesión tenga permiso técnico para hacerlo.
- Cada cambio de estado se refleja en las etiquetas `estado:*` del Issue, con un comentario breve. Al cambiar de estado se quita la etiqueta anterior: queda una sola.
- Al abrir el PR, la descripción lleva `Closes #<número>`; así el Issue se cierra solo cuando el dueño mergea.
