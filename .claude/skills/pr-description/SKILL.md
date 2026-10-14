---
name: pr-description
description: Redacta la descripción de un PR a partir del diff, el Issue y el resultado de la revisión. Usar al abrir un PR.
---

# pr-description

Adaptada de la skill del mismo nombre del proyecto de Bancor.

## Entrada
Diff de la rama, Issue de origen y resultado del `revisor`.

## Formato
```
## Qué cambia
<2 a 4 viñetas, en lenguaje de producto>

## Por qué
Cierra #<número del Issue>. <una línea de contexto>

## Cómo probarlo
1. <paso>
2. <paso>

## Verificación
- Lint: <pasó / falló / no corrido>
- Tests: <pasó / falló / no corrido>
- Build: <pasó / falló / no corrido>
- Revisión: <puntaje> / 100

## Decisiones y pendientes
<decisiones tomadas con el dueño y lo que quedó abierto>
```

## Reglas
- Los pasos de prueba son para una persona con un teléfono o un navegador, no para un desarrollador.
- Informar el resultado real de lint, tests y build; "no corrido" es una respuesta válida.
- No listar archivos uno por uno: el diff ya lo hace.
