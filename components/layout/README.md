# Layout Components

This directory contains layout and structural components used throughout the application.

## Purpose

Components in this folder handle:

- Page layouts and containers
- Header and navigation
- Footer components
- Sidebar components
- Page wrapper components

## Structure

```
layout/
├── MainLayout.tsx          # Main application layout wrapper
├── Header.tsx              # Application header
├── Footer.tsx              # Application footer
├── Sidebar.tsx             # Sidebar navigation (if needed)
└── PageContainer.tsx       # Reusable page container
```

## Usage

All components should follow the project conventions defined in `CLAUDE.md`:

- Use TypeScript with strict types
- Follow naming conventions (PascalCase for components)
- Use Tailwind CSS for styling
- Most layout components should be Server Components unless they need client interactivity

## Example

```typescript
import { MainLayout } from '@/components/layout/MainLayout'

export default function Page() {
  return (
    <MainLayout>
      <div>Page content</div>
    </MainLayout>
  )
}
```

## References

- See [CLAUDE.md](../../CLAUDE.md) for full coding conventions
- See [DEVELOPMENT_PLAN.md](../../DEVELOPMENT_PLAN.md) for project architecture
