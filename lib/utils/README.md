# Utility Functions

This directory contains utility functions and helper modules used across the application.

## Purpose

Functions in this folder provide:

- Common utility functions (formatters, validators, etc.)
- Helper functions for data manipulation
- Constants and configuration helpers
- Type guards and type utilities
- Domain-specific utilities organized by module

## Structure

```
utils/
├── formatters.ts           # String and number formatting utilities
├── validators.ts           # Validation functions
├── constants.ts            # Application constants
├── helpers.ts              # General helper functions
├── typeGuards.ts           # TypeScript type guard functions
└── dateUtils.ts            # Date/time utilities
```

## Usage

All utilities should:

- Be pure functions when possible
- Have explicit TypeScript types
- Include JSDoc comments
- Follow naming conventions (camelCase for functions)
- Be exported as named exports
- Have unit tests (when testing is implemented)

## Example

```typescript
import { formatDate, validateEmail } from '@/lib/utils/formatters'
import { APP_NAME, MAX_QUESTIONS_PER_SET } from '@/lib/utils/constants'
import { isValidQuestionSet } from '@/lib/utils/typeGuards'

const formattedDate = formatDate(new Date())
const isValid = validateEmail('user@example.com')

if (isValidQuestionSet(data)) {
  // TypeScript knows data is QuestionSet
  console.log(data.questions)
}
```

## Note

The main `lib/utils.ts` file contains the `cn()` function for Tailwind class merging and other commonly used utilities. Use this `utils/` folder for more specific or grouped utility functions that don't belong in the root utils file.

## References

- See [CLAUDE.md](../../CLAUDE.md) for coding conventions
- See [lib/utils.ts](../utils.ts) for the main utilities file
