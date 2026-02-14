# Button Component

A fully accessible, type-safe, and reusable button component for La Respuesta más Popular.

## Features

- Three visual variants: `primary`, `secondary`, `danger`
- Three size options: `sm`, `md`, `lg`
- Disabled state support
- Full TypeScript type safety
- Accessible with ARIA label support
- Keyboard navigation support
- Custom className override capability
- Hover and focus states with proper visual feedback

## Usage

### Basic Example

```typescript
import { Button } from '@/components/ui/Button'

export default function MyComponent() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Click Me
    </Button>
  )
}
```

### All Variants

```typescript
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
```

### Different Sizes

```typescript
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Disabled State

```typescript
<Button disabled>Disabled Button</Button>
```

### Custom Styling

```typescript
<Button variant="primary" className="rounded-full shadow-lg">
  Custom Styled
</Button>
```

### Form Integration

```typescript
<form onSubmit={handleSubmit}>
  <Button type="submit" variant="primary">
    Submit Form
  </Button>
</form>
```

### Accessibility

```typescript
<Button variant="danger" ariaLabel="Delete item permanently">
  Delete
</Button>
```

## Props

| Prop        | Type                                  | Default     | Description                                   |
| ----------- | ------------------------------------- | ----------- | --------------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | Visual style variant                          |
| `size`      | `'sm' \| 'md' \| 'lg'`                 | `'md'`      | Button size                                   |
| `children`  | `React.ReactNode`                     | required    | Button content                                |
| `onClick`   | `() => void`                          | -           | Click event handler                           |
| `disabled`  | `boolean`                             | `false`     | Disabled state                                |
| `className` | `string`                              | `''`        | Additional CSS classes                        |
| `type`      | `'button' \| 'submit' \| 'reset'`      | `'button'`  | HTML button type                              |
| `ariaLabel` | `string`                              | -           | Accessible label for screen readers           |

## Color Scheme

The Button component uses the project's color tokens from `tailwind.config.ts`:

- **Primary**: `#3B82F6` (blue-500) / Hover: `#1E40AF` (blue-800)
- **Secondary**: `#10B981` (green-500) / Hover: `#047857` (green-700)
- **Danger**: `#EF4444` (red-500) / Hover: `#B91C1C` (red-700)

## Styling Details

### Base Styles
- Font: Semibold
- Border radius: Rounded-md
- Transitions: Color transitions on hover
- Focus: Ring indicator with offset

### Size Mappings
- **Small**: `px-3 py-1.5 text-sm`
- **Medium**: `px-4 py-2 text-base`
- **Large**: `px-6 py-3 text-lg`

### Disabled State
- Opacity: 50%
- Cursor: Not allowed
- Hover states disabled

## Accessibility Features

1. **Keyboard Navigation**: Full support for Tab, Enter, and Space keys
2. **Focus Indicators**: Visible focus ring for keyboard users
3. **ARIA Labels**: Optional `ariaLabel` prop for screen readers
4. **Semantic HTML**: Uses proper `<button>` element
5. **Disabled State**: Properly communicated to assistive technologies

## Demo

View all button variations at `/demo/button` when running the development server.

## Implementation Details

The Button component follows the project's coding conventions:

- TypeScript strict mode with explicit types
- Uses `cn()` utility for class merging
- Follows Tailwind class ordering convention
- Implements proper React.FC typing
- Server Component compatible (no 'use client' needed for the component itself)

## Testing Checklist

- [ ] All variants render correctly
- [ ] All sizes render correctly
- [ ] Disabled state works
- [ ] onClick handler fires
- [ ] Custom className merges properly
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Hover states work on all variants
- [ ] Type="submit" works in forms
- [ ] ARIA labels are applied correctly

## Related Components

- Card (to be implemented)
- Input (to be implemented)
- Modal (to be implemented)

## Version

Created: 2026-02-13
Last Updated: 2026-02-13
