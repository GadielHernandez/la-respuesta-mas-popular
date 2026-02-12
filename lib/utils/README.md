# Utility Functions

This directory contains utility functions and helper modules used across the application.

## Purpose
Functions in this folder provide:
- Common utility functions (formatters, validators, etc.)
- Helper functions for data manipulation
- Constants and configuration helpers
- Type guards and type utilities

## Structure
```
utils/
├── formatters.ts           # String and number formatting utilities
├── validators.ts           # Validation functions
├── constants.ts            # Application constants
├── helpers.ts              # General helper functions
└── typeGuards.ts           # TypeScript type guard functions
```

## Usage
All utilities should:
- Be pure functions when possible
- Have explicit TypeScript types
- Include JSDoc comments
- Follow naming conventions (camelCase for functions)
- Be exported as named exports

## Example
```typescript
import { formatDate, validateEmail } from '@/lib/utils/formatters'
import { APP_NAME } from '@/lib/utils/constants'

const formattedDate = formatDate(new Date())
const isValid = validateEmail('user@example.com')
```

## Note
The main `lib/utils.ts` file contains commonly used utilities. Use this folder for more specific or grouped utility functions.
