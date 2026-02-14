# UI Components

Reusable UI components for La Respuesta más Popular.

## Available Components

### Button
Accessible, type-safe button component with multiple variants and sizes.

**Location**: `components/ui/Button.tsx`
**Documentation**: [Button.md](./Button.md)
**Demo**: `/demo/button`

**Quick Example**:
```typescript
import { Button } from '@/components/ui/Button'

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

**Variants**: `primary`, `secondary`, `danger`
**Sizes**: `sm`, `md`, `lg`
**Features**: Disabled state, custom styling, accessibility support

---

## Upcoming Components

The following components are planned for implementation:

- **Card**: Container component for content grouping
- **Input**: Form input component with validation
- **Modal**: Dialog/modal component for overlays

## Guidelines

All UI components follow these principles:

1. **TypeScript First**: Fully typed with strict mode
2. **Accessibility**: WCAG 2.1 AA compliant
3. **Composable**: Can be combined and customized
4. **Consistent**: Follow project design tokens
5. **Documented**: Each component has documentation and examples

## Using Components

Import components using the `@/` alias:

```typescript
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
```

## Development

When creating new UI components:

1. Place in `components/ui/` directory
2. Use TypeScript with explicit types
3. Follow naming convention: PascalCase
4. Use `cn()` utility for class merging
5. Include prop interface documentation
6. Create demo page in `app/demo/[component]/page.tsx`
7. Add documentation in `ComponentName.md`
8. Update this README

## Testing

Each component should include:

- TypeScript type safety
- Manual testing checklist
- Demo page for visual verification
- Accessibility verification
