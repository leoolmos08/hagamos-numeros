---
name: item-conversion
description: Convierte un Issue de GitHub (bug o user story) en un brief estructurado y un plan de tareas, antes de que nadie escriba código. Usar al empezar un Issue nuevo.
---

# item-conversion

Adaptada de la skill del mismo nombre del proyecto de Bancor, sin Azure DevOps.

## Cuándo usarla
- Hay un Issue con la etiqueta `estado:nuevo`.
- El dueño pide planificar un bug o una US.

## Pasos
1. **Leer el Issue** completo: título, cuerpo, comentarios, imágenes. Si usás `gh`: `gh issue view <n> --comments`.
2. **Detectar el tipo** por la etiqueta `tipo:bug` o `tipo:us`. Sin etiqueta, inferirlo: "no funciona, falla, error" es bug; "quiero, nueva funcionalidad" es US. Si no queda claro, preguntar.
3. **Completar el brief** (abajo). Lo que no esté en el Issue se deja como pregunta; no se inventa.
4. **Descomponer en tareas** que describan qué se logra y dónde ocurre, no qué archivos tocar. Una tarea por área (`area:web`, `area:mobile`, `area:backend`) y sin que dos tareas toquen los mismos archivos.
5. **Publicar el plan** como comentario en el Issue, cambiar la etiqueta a `estado:planificado` y esperar el OK del dueño.

## Brief
- **Resumen:** una línea.
- **Contexto:** por qué importa y qué se sabe.
- **Criterios de aceptación:** lista verificable.
- **Evidencia:** descripción en texto de capturas o logs.
- **Fuera de alcance:** qué no se toca.
- **Preguntas abiertas:** lo que falta decidir.
- **Tareas:** numeradas, con área y orden de dependencia.

## Bug: campos extra
Pasos para reproducir, resultado esperado y actual, y una hipótesis de causa marcada como hipótesis.

## Reglas
- No incluir decisiones técnicas finas: componentes, nombres de archivos, endpoints. Las resuelve quien implementa leyendo el `CLAUDE.md`.
- Si hay tres o más preguntas abiertas, parar y pedirle las decisiones al dueño antes de planificar.
