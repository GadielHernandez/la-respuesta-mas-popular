# La Respuesta más Popular

> Juego interactivo estilo "100 mexicanos dijeron" / Family Feud construido con Next.js, TypeScript, Tailwind CSS y Supabase.

## Descripción

**La Respuesta más Popular** es una aplicación web que permite a dos equipos competir respondiendo encuestas al estilo del popular programa de televisión. Incluye funcionalidades tanto para jugar sin registro (usando localStorage) como para usuarios autenticados (con persistencia en Supabase).

## Características Principales

- ✅ **Juego sin registro:** Juega inmediatamente sin crear cuenta (datos en localStorage)
- ✅ **Autenticación de usuarios:** Registro/login con Supabase Auth
- ✅ **CRUD de preguntas:** Crea y gestiona tus propios sets de preguntas
- ✅ **Sistema de puntuación:** Scoring completo con multiplicadores por ronda
- ✅ **Historial de partidas:** Guarda y revisa todas las partidas jugadas
- ✅ **Timer opcional:** Countdown por ronda configurable
- ✅ **Responsive:** Optimizado para desktop y tablets
- ✅ **Hotkeys:** Atajos de teclado para jugar rápidamente

## Stack Tecnológico

- **Framework:** [Next.js 14+](https://nextjs.org) (App Router)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com)
- **Base de datos:** [Supabase](https://supabase.com)
- **Autenticación:** Supabase Auth
- **Deploy:** [Vercel](https://vercel.com)

## Inicio Rápido

### Prerrequisitos

- Node.js 18+ y npm/yarn/pnpm
- Cuenta de Supabase (gratis)

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/la-respuesta-mas-popular.git
cd la-respuesta-mas-popular
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Para obtener tus credenciales de Supabase:
- Crea un proyecto en [Supabase](https://supabase.com)
- Ve a Settings > API
- Copia la URL y la anon key

4. **Configurar base de datos**

Ejecuta las migraciones de Supabase:
```bash
# Desde Supabase Studio, ejecuta los scripts en:
supabase/migrations/001_initial_schema.sql
supabase/migrations/002_rls_policies.sql
```

5. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

### Jugar sin Registro

1. Visita la landing page
2. Click en "Jugar sin registro"
3. Configura nombres de equipos
4. ¡Comienza a jugar!

Tus datos se guardarán en localStorage del navegador.

### Jugar con Cuenta

1. Crea una cuenta (Register)
2. Crea tu propio set de preguntas en "Mis Preguntas"
3. Configura tu partida
4. Juega y guarda el historial

### Hotkeys (Atajos de Teclado)

- `1-8`: Revelar respuesta correspondiente
- `Space` o `X`: Agregar strike
- `Enter` o `N`: Siguiente pregunta
- `P`: Pausar/Reanudar
- `?`: Mostrar ayuda de hotkeys

## Estructura del Proyecto

```
la-respuesta-mas-popular/
├── app/                    # Next.js App Router (páginas)
├── components/             # Componentes React
│   ├── game/              # Componentes del juego
│   ├── questions/         # CRUD de preguntas
│   ├── ui/                # Componentes UI base
│   └── layout/            # Layout components
├── lib/                   # Lógica de negocio
│   ├── supabase/         # Cliente y queries de Supabase
│   ├── game/             # Motor del juego
│   └── storage/          # Adaptadores de persistencia
├── hooks/                 # Custom React Hooks
├── types/                 # TypeScript types
├── contexts/              # React Contexts
├── data/                  # Preguntas demo
└── supabase/             # Migraciones de DB
```

## Desarrollo

### Convenciones de Código

Ver [CLAUDE.md](./CLAUDE.md) para:
- Estándares de TypeScript
- Convenciones de naming
- Estructura de componentes
- Git workflow

### Plan de Desarrollo

Ver [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) para:
- Roadmap completo del proyecto
- Fases de desarrollo
- Issues detallados
- Arquitectura

### Crear Issues

Ver [GITHUB_ISSUES.md](./GITHUB_ISSUES.md) para todos los issues listos para copiar a GitHub.

## Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Crea build de producción
npm run start        # Inicia servidor de producción
npm run lint         # Ejecuta ESLint
npm run type-check   # Verifica tipos de TypeScript
```

## Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

Ver [CLAUDE.md](./CLAUDE.md) para convenciones de commits y PRs.

## Roadmap

- [x] Setup inicial del proyecto
- [x] UI base y componentes
- [x] Motor del juego (lógica core)
- [x] Modo sin login (localStorage)
- [x] Autenticación de usuarios
- [x] Persistencia con Supabase
- [x] CRUD de preguntas
- [x] Historial de partidas
- [x] Features avanzados (timer, multiplicadores)
- [x] Deploy a producción
- [ ] Efectos de sonido
- [ ] Animaciones avanzadas
- [ ] Modo oscuro
- [ ] Sets públicos compartibles
- [ ] PWA (instalable)
- [ ] Internacionalización (i18n)

## Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## Contacto

Tu Nombre - [@tu_twitter](https://twitter.com/tu_twitter)

Link del proyecto: [https://github.com/tu-usuario/la-respuesta-mas-popular](https://github.com/tu-usuario/la-respuesta-mas-popular)

## Agradecimientos

- Inspirado en el programa "100 mexicanos dijeron"
- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel](https://vercel.com)

---

**Última actualización:** 2026-02-10
