# Testing Checklist — Modo Sin Autenticación

> **Alcance:** Flujo completo del juego en modo local (sin login).
> Cubre rutas `/play`, `/play/control`, `/play/board` y `/history-local`.
> La sincronización two-screen usa `BroadcastChannel` (`lrmp-game-state`).
> La persistencia usa `localStorage` con keys `lrmp_*`.
>
> **Cómo usar:** Ejecuta cada escenario en orden. Marca ✅ si pasa, ❌ si falla.
> Documenta bugs en la sección **Bugs Encontrados** al final.

---

## Entorno de Prueba

| Campo             | Valor                        |
|-------------------|------------------------------|
| Navegador         |                              |
| Versión           |                              |
| SO                |                              |
| Fecha             |                              |
| Tester            |                              |
| Branch/Commit     |                              |

---

## Escenario 1 — Primera vez (localStorage vacío)

**Prerrequisito:** Abrir DevTools → Application → Storage → Clear site data.

| # | Acción | Resultado esperado | ✅/❌ | Notas |
|---|--------|--------------------|-------|-------|
| 1.1 | Navegar a `/play` | Se muestra la página de configuración | | |
| 1.2 | Verificar sets disponibles | Solo aparece el set "Demo" | | |
| 1.3 | Cambiar nombre Equipo 1 a "Los Águilas" | El nombre se actualiza en el campo y en el preview | | |
| 1.4 | Cambiar nombre Equipo 2 a "Los Tigres" | El nombre se actualiza en el campo y en el preview | | |
| 1.5 | Seleccionar 3 rondas | Botón "3" queda activo/marcado | | |
| 1.6 | Clic en "Lanzar Juego" | Se abre una nueva pestaña con `/play/board` y la página actual navega a `/play/control` | | |
| 1.7 | Verificar `/play/control` — header | Muestra "Ronda 1 de 3" y nombre de equipos | | |
| 1.8 | Verificar `/play/control` — fase | Footer muestra `FASE: PLAYING` | | |
| 1.9 | Verificar `/play/board` — estado inicial | Muestra tablero con pregunta de ronda 1, respuestas ocultas, marcadores en 0 | | |
| 1.10 | Verificar `/play/board` — equipo activo | "Los Águilas" aparece activo (TURNO ACTUAL) | | |

---

## Escenario 2 — Juego completo inicio a fin (dos tabs simultáneas)

**Prerrequisito:** Escenario 1 completado. `/play/control` y `/play/board` abiertos.

### 2A — Fase de juego normal (playing)

| # | Acción | Resultado esperado | ✅/❌ | Notas |
|---|--------|--------------------|-------|-------|
| 2.1 | En control: clic en respuesta 1 (REVEAL) | La respuesta se revela en control; tablero sincroniza inmediatamente | | |
| 2.2 | Verificar board tras revelar | Respuesta 1 aparece revelada con texto y puntos en el tablero público | | |
| 2.3 | En control: clic en respuesta 2 (REVEAL) | Puntos acumulados aumentan en control y board | | |
| 2.4 | En control: clic en STRIKE | Marcador de strikes muestra 1 X roja; sin cambio de equipo | | |
| 2.5 | En control: clic en STRIKE dos veces más | Al llegar a 3 strikes: aparece overlay "¡3 Strikes!" | | |
| 2.6 | En control: clic en "Continuar al Robo" (overlay) | Overlay desaparece; fase cambia a `STEALING` | | |
| 2.7 | Verificar board — fase stealing | Banner rojo "Fase de Robo · Los Tigres" visible en la parte inferior | | |
| 2.8 | Verificar control — equipo robando | Badge "ROBANDO" aparece sobre el panel de "Los Tigres" | | |

### 2B — Fase de robo (stealing)

| # | Acción | Resultado esperado | ✅/❌ | Notas |
|---|--------|--------------------|-------|-------|
| 2.9 | En control: clic en una respuesta no revelada (REVEAL) | Se procesa como intento de robo; respuesta se revela si era correcta | | |
| 2.10 | Si acierta: verificar board | Los puntos se suman a "Los Tigres"; fase pasa a `SCORED` | | |
| 2.11 | En control: revelar respuestas restantes (scored) | Se revelan sin sumar puntos al acumulado | | |
| 2.12 | En control: clic en SIGUIENTE PREGUNTA | Avanza a ronda 2; equipos alternan posesión | | |
| 2.13 | Verificar board — ronda 2 | Nueva pregunta visible; indicador de ronda actualizado | | |

### 2C — Robo fallido

| # | Acción | Resultado esperado | ✅/❌ | Notas |
|---|--------|--------------------|-------|-------|
| 2.14 | En control: forzar 3 strikes en ronda 2 | Overlay strikes aparece | | |
| 2.15 | En control: clic en "ROBO FALLIDO" | Puntos van al equipo con posesión original; fase a SCORED | | |
| 2.16 | Verificar puntuación en board | Puntos sumados al equipo correcto | | |

### 2D — Finalización

| # | Acción | Resultado esperado | ✅/❌ | Notas |
|---|--------|--------------------|-------|-------|
| 2.17 | Completar todas las rondas | Al acabar la última ronda, fase cambia a `FINISHED` | | |
| 2.18 | Verificar board — pantalla final | Muestra pantalla de fin de juego con puntuaciones finales | | |
| 2.19 | Verificar historial | En `/history-local` aparece la partida recién jugada | | |

---

## Escenario 3 — Pausar y continuar partida

**Prerrequisito:** Partida en curso (mitad del juego).

| # | Acción | Resultado esperado | ✅/❌ | Notas |
|---|--------|--------------------|-------|-------|
| 3.1 | Con partida activa: recargar `/play/control` (F5) | Aparece modal "CONTINUAR PARTIDA" con opción Sí/No | | |
| 3.2 | Clic en "SÍ, CONTINUAR" | El estado del juego se restaura exactamente donde estaba | | |
| 3.3 | Verificar board — resincronización | Board recibe el estado restaurado vía BC y muestra el juego correctamente | | |
| 3.4 | Recargar `/play/control` nuevamente; clic en "NUEVO JUEGO" | Se limpia el estado; vuelve a setup | | |
| 3.5 | Verificar localStorage tras "NUEVO JUEGO" | `lrmp_current_game` eliminado (verificar en DevTools) | | |

---

## Escenario 4 — Board sin control abierto

| # | Acción | Resultado esperado | ✅/❌ | Notas |
|---|--------|--------------------|-------|-------|
| 4.1 | Abrir `/play/board` sin `/play/control` abierto | Muestra "Esperando inicio del juego..." | | |
| 4.2 | Abrir `/play/control` en otra pestaña | Board recibe broadcast y muestra el estado actual del juego | | |
| 4.3 | Cerrar la pestaña de `/play/control` | Board sigue mostrando el último estado recibido (no hay reconnect automático) | | |
| 4.4 | Reabrir `/play/control` | Board sincroniza con el estado actual en cuanto control envía el próximo broadcast | | |

---

## Escenario 5 — Múltiples partidas seguidas

| # | Acción | Resultado esperado | ✅/❌ | Notas |
|---|--------|--------------------|-------|-------|
| 5.1 | Completar una partida completa | Historial tiene 1 entrada | | |
| 5.2 | Desde control: clic en "REINICIAR JUEGO" | Vuelve a la pantalla de setup | | |
| 5.3 | Configurar y lanzar segunda partida | Nueva partida inicia correctamente | | |
| 5.4 | Completar segunda partida | Historial tiene 2 entradas, en orden cronológico | | |
| 5.5 | Verificar que puntuaciones no se mezclan | Cada partida en historial tiene sus propios equipos y puntos | | |

---

## Escenario 6 — Historial de partidas (`/history-local`)

| # | Acción | Resultado esperado | ✅/❌ | Notas |
|---|--------|--------------------|-------|-------|
| 6.1 | Navegar a `/history-local` sin partidas | Muestra estado vacío (no hay historial) | | |
| 6.2 | Navegar a `/history-local` con partidas | Lista partidas con: equipos, puntuación, ganador, fecha | | |
| 6.3 | Verificar datos de una partida | Nombre de equipos, marcador final, ganador/empate, número de rondas | | |
| 6.4 | Verificar orden | Partidas más recientes primero | | |

---

## Escenario 7 — Set de preguntas personalizado

| # | Acción | Resultado esperado | ✅/❌ | Notas |
|---|--------|--------------------|-------|-------|
| 7.1 | Verificar si existe UI de creación de sets | (Documentar estado actual — puede estar pendiente) | | |
| 7.2 | Si no hay UI: sets solo vía localStorage directo | `lrmp_question_sets` vacío o con sets creados manualmente | | |
| 7.3 | En `/play`: seleccionar set personalizado si existe | Set aparece en la lista de bibliotecas | | |

---

## Escenario 8 — Edge cases de localStorage

| # | Acción | Resultado esperado | ✅/❌ | Notas |
|---|--------|--------------------|-------|-------|
| 8.1 | Corromper `lrmp_current_game` manualmente | App no crashea; trata como sin partida guardada | | |
| 8.2 | Corromper `lrmp_game_history` manualmente | App no crashea; muestra historial vacío | | |
| 8.3 | Borrar `lrmp_current_game` a mitad de partida | Próxima recarga no ofrece "Continuar" | | |
| 8.4 | Navegar directamente a `/play/control` sin setup previo | Muestra estado `setup` con equipos por defecto | | |
| 8.5 | Navegar directamente a `/play/board` sin setup previo | Muestra "Esperando inicio del juego..." | | |

---

## Escenario 9 — Multi-tab avanzado

| # | Acción | Resultado esperado | ✅/❌ | Notas |
|---|--------|--------------------|-------|-------|
| 9.1 | Abrir dos tabs de `/play/board` | Ambas muestran el mismo estado en tiempo real | | |
| 9.2 | Revelar una respuesta en control | Ambas tabs de board actualizan simultáneamente | | |
| 9.3 | Cerrar una tab de board durante el juego | No afecta la tab restante ni al control | | |
| 9.4 | Abrir `/play/board` en incógnito | Recibe broadcasts correctamente (BC es por origen, no por perfil) | | |
| 9.5 | Abrir dos tabs de `/play/control` | Segunda tab recibe broadcasts del estado pero no tiene contexto de dispatch propio; puede causar doble guardado | | |

---

## Escenario 10 — Navegadores (repetir escenarios 1-4)

| Navegador | Escenario 1 | Escenario 2 | Escenario 3 | Escenario 4 | Notas |
|-----------|-------------|-------------|-------------|-------------|-------|
| Chrome 120+ | | | | | |
| Firefox 120+ | | | | | |
| Edge 120+ | | | | | |
| Safari 17+ | | | | | |

> **Nota Safari:** BroadcastChannel tiene soporte desde Safari 15.4. Verificar que la sincronización funciona.

---

## Acciones de control — verificación rápida

| Acción | Tecla/Botón | Comportamiento esperado | ✅/❌ |
|--------|-------------|------------------------|-------|
| Revelar respuesta | Botón REVEAL en answer card | Respuesta se muestra en control y board | |
| Strike | Botón STRIKE rojo | Strikes aumentan; a 3 → overlay + fase stealing | |
| Robo exitoso | Botón ROBO EXITOSO | Puntos al equipo contrario; fase SCORED | |
| Robo fallido | Botón ROBO FALLIDO | Puntos al equipo con posesión; fase SCORED | |
| Siguiente pregunta | Botón SIGUIENTE PREGUNTA | Avanza ronda; alterna posesión | |
| Cambiar turno | Botón CAMBIAR TURNO | Alterna equipo activo; resetea strikes | |
| Reiniciar juego | Botón REINICIAR JUEGO | Vuelve a setup; limpia localStorage | |

---

## Bugs Encontrados

| # | Descripción | Severidad | Escenario | Estado |
|---|-------------|-----------|-----------|--------|
| — | — | — | — | — |

> **Severidades:** `crítico` (bloquea el juego), `alto` (funcionalidad rota), `medio` (UX degradada), `bajo` (cosmético)

---

## Notas Generales

<!-- Agregar observaciones, mejoras detectadas, o comportamientos inesperados no cubiertos arriba -->

---

*Última actualización: 2026-02-25*
*Issue: #31 — Testing del flujo sin login*
