---
name: learnings
description: Registra al cerrar un Issue lo que se aprendió (decisiones, errores, convenciones nuevas) para mejorar el CLAUDE.md y las plantillas. Usar cuando el dueño hace el merge.
---

# learnings

Adaptada de `learnings-collector` del proyecto de Bancor.

## Cuándo
Después del merge de un PR.

## Pasos
1. Releer el Issue, el PR y la conversación de decisiones.
2. Anotar en `docs/pruebas.md` del repo `software-factory`, una entrada por Issue: consumo, hilos usados, tiempo hasta el PR, rondas con el revisor, decisiones que pidió y resultado.
3. Separar lo aprendido en tres grupos:
   - **Para el CLAUDE.md del proyecto:** convenciones o zonas que faltaba declarar.
   - **Para las plantillas de factory:** reglas que sirven a todos los proyectos.
   - **Para las instrucciones del proyecto:** cuándo preguntar, cuándo no.
4. Proponer los cambios como una lista corta al dueño. No editar `CLAUDE.md` ni plantillas sin su OK.

## Reglas
- Solo aprendizajes que se repetirían; ignorar lo puntual de un Issue.
- Máximo cinco propuestas por Issue.
