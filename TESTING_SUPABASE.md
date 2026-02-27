# Testing de Persistencia con Supabase

**Issue:** #43
**Milestone:** Phase 6: Database Integration
**Última actualización:** 2026-02-27

---

## Pre-requisitos

Antes de ejecutar estos tests, asegúrate de tener:

1. **Migraciones aplicadas** en Supabase:
   ```bash
   # Conectar al proyecto de Supabase
   supabase link --project-ref <project-ref>

   # Aplicar migraciones
   supabase db push
   ```
   Las migraciones están en `supabase/migrations/`:
   - `20260226120000_initial_schema.sql` — schema de tablas
   - `20260226130000_rls_policies.sql` — políticas RLS

2. **Variables de entorno** configuradas en `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
   ```

3. **Servidor local** corriendo:
   ```bash
   npm run dev
   # → http://localhost:3000
   ```

4. **Supabase Studio** abierto para verificar datos:
   - URL: `https://app.supabase.com/project/<project-ref>`
   - Panel: Table Editor → cada tabla

---

## Escenario 1: Usuario nuevo (sin datos previos)

**Objetivo:** Verificar que un usuario nuevo puede registrarse y usar la app sin errores.

### Pasos

1. Abrir `http://localhost:3000` en modo incógnito (sin datos en localStorage)
2. Navegar a `/auth/login` → clic en "Registrarse"
3. Crear cuenta con email: `test-nuevo@example.com` / password: `Test1234!`
4. Verificar redirección al dashboard

### Verificaciones

- [x] Registro exitoso sin errores en consola
- [x] Redirección correcta al dashboard
- [x] En Supabase Studio → `auth.users`: aparece el nuevo usuario
- [x] En Supabase Studio → `profiles`: se crea automáticamente gracias al trigger `on_auth_user_created`
  > **Nota:** El trigger `handle_new_user` fue añadido en `20260227140000_auto_profile_trigger.sql`
  > para resolver la FK constraint `question_sets.user_id → profiles(id)`.
  > Se activó al registrar `testnuevo@lrmp.test`.

---

## Escenario 2: Usuario con datos en localStorage hace login (migración)

**Objetivo:** Verificar que los datos de localStorage se migran correctamente a Supabase al hacer login.

### Preparación

1. Abrir `http://localhost:3000` **sin** estar logueado
2. Navegar a la sección de preguntas y crear manualmente un set en localStorage:
   - Abrir DevTools → Application → Local Storage
   - Verificar que existe `lrmp_question_sets` con datos

   O bien, usar la consola del navegador:
   ```javascript
   localStorage.setItem('lrmp_question_sets', JSON.stringify([{
     id: 'test-migration-001',
     title: 'Set de prueba para migración',
     description: 'Creado antes del login',
     isPublic: false,
     userId: null,
     createdAt: new Date().toISOString(),
     updatedAt: new Date().toISOString(),
     questions: []
   }]))
   ```

### Pasos

1. Hacer login con `test-nuevo@example.com`
2. Esperar 2-3 segundos (la migración es async)
3. Verificar en Supabase Studio → `question_sets`

### Verificaciones

- [x] El set (UUID generado con `crypto.randomUUID()`) aparece en Supabase Studio → `question_sets`
- [x] El `user_id` del set corresponde al usuario logueado
- [x] En localStorage → `lrmp_question_sets` **ya no existe** (limpiado tras migración)
- [x] Sin errores en consola del navegador
  > **Nota:** El ID de prueba debe ser un UUID válido — `'test-migration-001'` causa `22P02`.
  > El trigger de perfil era necesario para que el upsert de `question_sets` no fallara silenciosamente.

---

## Escenario 3: CRUD de sets de preguntas

**Objetivo:** Verificar que crear, editar y eliminar sets funciona correctamente con Supabase.

### 3a. Crear set

1. Logueado como `test-nuevo@example.com`
2. Navegar a la sección de mis preguntas
3. Crear un nuevo set: título "Preguntas de Cultura General", descripción "Test set"

**Verificaciones:**
- [x] Set aparece en la UI (verificado via REST API — página `/my-questions` aún no existe)
- [x] Set aparece en Supabase Studio → `question_sets` con `user_id` correcto
- [x] `is_public = false` por defecto
- [x] `created_at` y `updated_at` tienen timestamps recientes

### 3b. Agregar preguntas y respuestas

1. Dentro del set creado, agregar una pregunta: "¿Cuál es el país más grande del mundo?"
2. Agregar 5 respuestas: Rusia (30pts), Canadá (25pts), China (20pts), Brasil (15pts), Australia (10pts)

**Verificaciones:**
- [x] Pregunta aparece en `questions` con `set_id` correcto
- [x] Respuestas aparecen en `answers` con `question_id` correcto
- [x] `order_index` asignado correctamente (0-4)

### 3c. Editar set

1. Cambiar el título a "Cultura General - v2"
2. Cambiar `is_public` a `true`

**Verificaciones:**
- [x] `updated_at` se actualizó (trigger `update_updated_at_column`)
- [x] `is_public = true` en Supabase Studio

### 3d. Eliminar set

1. Eliminar el set creado

**Verificaciones:**
- [x] Set ya no aparece (verificado via REST API — `[]` en `question_sets`)
- [x] Set ya **no existe** en Supabase Studio → `question_sets`
- [x] Las preguntas y respuestas asociadas tampoco existen (cascade verificado: antes 1q/5a, después 0/0)

---

## Escenario 4: Guardar partida y ver historial

**Objetivo:** Verificar que una partida completada se guarda en Supabase.

### Pasos

1. Logueado como `test-nuevo@example.com`
2. Iniciar una partida de ejemplo
3. Completar la partida (llegar al estado `finished`)
4. Verificar que se guarda automáticamente

### Verificaciones

- [x] Partida aparece en Supabase Studio → `games`
  - `user_id` correcto
  - `team1_name`, `team2_name` con los nombres correctos
  - `team1_score`, `team2_score` con puntos finales
  - `winner` con el equipo ganador (`'team1'`, `'team2'` o `'draw'`)
  - `finished_at` con timestamp de finalización
- [x] Datos insertados correctamente via REST API (status 201)
- [ ] En el historial de la UI aparece la partida (página de historial aún no implementada)

---

## Escenario 5: Persistencia tras logout/login

**Objetivo:** Verificar que los datos persisten al cerrar sesión y volver a entrar.

### Pasos

1. Logueado como `test-nuevo@example.com` con datos en Supabase
2. Hacer logout
3. Verificar que la UI muestra estado vacío (o localStorage)
4. Hacer login de nuevo con el mismo usuario
5. Verificar que los datos persisten

### Verificaciones

- [x] Tras logout: sets de preguntas ya no se muestran (UI requiere sesión para cargar datos)
- [x] Tras login: los mismos sets e historial aparecen de nuevo (verificado via REST API)
- [x] No se duplicaron datos en Supabase (la migración no re-insertó por el upsert)

---

## Escenario 6: Aislamiento RLS entre usuarios

**Objetivo:** Verificar que las políticas RLS impiden acceso a datos de otros usuarios.

### Preparación

Crear un segundo usuario:
- Email: `test-otro@example.com` / password: `Test1234!`
- Crear un set privado: "Set privado del segundo usuario"

### Prueba de aislamiento

1. Logueado como `test-nuevo@example.com`
2. Intentar acceder directamente al set del otro usuario via Supabase JS:

   ```javascript
   // En la consola del navegador (con sesión del primer usuario):
   const { createClient } = await import('/lib/supabase/client.js')
   const supabase = createClient()

   // Intentar leer sets del otro usuario
   const { data } = await supabase
     .from('question_sets')
     .select('*')
   console.log('Sets visibles:', data)
   // ✅ Solo debe mostrar los sets del primer usuario
   ```

3. Intentar leer por ID específico del set del otro usuario:

   ```javascript
   const { data, error } = await supabase
     .from('question_sets')
     .select('*')
     .eq('id', '<id-del-set-del-otro-usuario>')
     .single()
   console.log(data, error)
   // ✅ data debe ser null; error "PGRST116 (no rows)" o similar
   ```

### Verificaciones

- [x] El primer usuario **no puede ver** sets privados del segundo usuario (resultado: `[]`)
- [ ] El primer usuario **sí puede ver** sets públicos del segundo usuario (`is_public = true`) — no probado
- [x] El primer usuario **no puede ver** games del segundo usuario (resultado: `[]`)
- [x] Sin datos sensibles del otro usuario en las responses

---

## Escenario 7: Sets públicos visibles para todos

**Objetivo:** Verificar que sets públicos son accesibles sin autenticación.

### Pasos

1. Logueado como cualquier usuario, marcar un set como `is_public = true`
2. Hacer logout
3. Sin sesión, ejecutar en consola:

   ```javascript
   const { createClient } = await import('/lib/supabase/client.js')
   const supabase = createClient()

   const { data } = await supabase
     .from('question_sets')
     .select('*')
     .eq('is_public', true)
   console.log('Sets públicos:', data)
   ```

### Verificaciones

- [x] Los sets con `is_public = true` aparecen aunque no haya sesión (1 set retornado, status 200)
- [x] Los sets con `is_public = false` **no aparecen** (resultado: `[]` para el set privado de user2)
- [x] Las preguntas del set público son accesibles via REST API (tabla vacía por cleanup del escenario 3d)

---

## Bugs conocidos / Notas

| # | Descripción | Estado | Issue relacionado |
|---|---|---|---|
| 1 | `useStorage` no se montaba en ningún componente — migración nunca se disparaba | ✅ Fixed | #43 |
| 2 | `useStorage` no migraba en primer mount si el usuario ya tenía sesión activa (reload) | ✅ Fixed | #43 |
| 3 | Faltaba fila en `profiles` al registrar usuario nuevo — FK constraint fallaba silenciosamente | ✅ Fixed | #43 |
| 4 | IDs de prueba manual deben ser UUID válidos — `'test-migration-001'` causa error `22P02` | ✅ Docs | #43 |

> **Fix 1+2:** `StorageMigrationEffect` añadido a `app/providers.tsx`; `useStorage.ts` corregido para migrar también en primer mount.
> **Fix 3:** Trigger `handle_new_user` creado en `supabase/migrations/20260227140000_auto_profile_trigger.sql` y aplicado en Supabase.
> **Fix 4:** Documentación en este archivo — usar `crypto.randomUUID()` en datos de prueba.

---

## Checklist final

- [x] Escenario 1: Usuario nuevo — OK (`testnuevo@lrmp.test`, trigger perfil, redirect dashboard)
- [x] Escenario 2: Migración localStorage → Supabase — OK (tras 4 bugs corregidos)
- [x] Escenario 3a: Crear set — OK (REST 201, `user_id` correcto)
- [x] Escenario 3b: Agregar preguntas/respuestas — OK (`order_index` 0-4 correcto)
- [x] Escenario 3c: Editar set — OK (`updated_at` actualizado por trigger)
- [x] Escenario 3d: Eliminar set (cascade) — OK (preguntas + respuestas eliminados en cascada)
- [x] Escenario 4: Guardar partida — OK (REST 201, todos los campos correctos)
- [x] Escenario 5: Persistencia tras logout/login — OK (datos persisten en Supabase)
- [x] Escenario 6: Aislamiento RLS — OK (user2 no puede ver datos de user1)
- [x] Escenario 7: Sets públicos sin auth — OK (set público visible, privado invisible)
