---
name: code-review
description: Revisión profesional de los cambios de una rama contra su rama base. Devuelve puntaje de 0 a 100, hallazgos por severidad y riesgo de regresión. Usar antes de dar un PR por listo.
---

# code-review

Adaptada de la skill del mismo nombre del proyecto de Bancor. Respondé en español.

## Entrada
- El diff de la rama contra su base: `git diff <base>...HEAD`.
- Opcional: el Issue y los archivos relacionados.
- El `CLAUDE.md` del repo, que manda sobre cualquier criterio genérico.

## Proceso
1. **Resumen del cambio:** 3 a 6 viñetas. Qué cambió, qué componentes toca y si el riesgo es chico, medio o grande.
2. **Puntaje:** de 0 a 100.
   - 90 a 100: listo para producción.
   - 75 a 89: bueno, con mejoras menores.
   - 60 a 74: aceptable, con mejoras importantes.
   - 40 a 59: riesgoso, necesita revisión profunda.
   - 0 a 39: problemas críticos, no se puede mergear.
   Explicá por qué no es más alto.
3. **Hallazgos:** cada uno con severidad (crítica, alta, media, baja), explicación y arreglo sugerido. Revisá todas las categorías; si no hay nada, escribí "Sin hallazgos".

## Categorías
1. Bugs y errores de lógica.
2. Casos borde: nulos, vacíos, entradas inválidas, límites.
3. Seguridad: datos sensibles, validación de entradas, secretos en el código.
4. Rendimiento.
5. Arquitectura y consistencia con las convenciones del repo.
6. Mantenibilidad: nombres, duplicación, tamaño de funciones.
7. Tests: cobertura de lo nuevo y de las regresiones probables.
8. Dependencias nuevas: si eran necesarias y si fueron autorizadas.

## Salida
Un comentario para el PR con: resumen, puntaje, hallazgos, riesgo de regresión y veredicto (aprobar o volver a corrección). Puntaje menor a 75 o un hallazgo crítico significa volver a corrección.

## Reglas
- No elogiar sin motivo; enfocarse en riesgos.
- No tocar el código: solo reportar.
- Distinguir lo que verificaste (corriste lint, tests o build) de lo que inferiste leyendo.
