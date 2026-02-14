# Questions Components

This directory contains React components related to question management and display.

## Purpose

Components in this folder handle:

- Question display and rendering
- Question creation and editing forms
- Question set management UI
- Question preview components
- Answer display and reveal animations

## Structure

```
questions/
├── QuestionDisplay.tsx      # Main question display component
├── QuestionForm.tsx         # Form for creating/editing questions
├── QuestionSetCard.tsx      # Card component for question sets
├── QuestionSetEditor.tsx    # Full editor for question sets
├── QuestionList.tsx         # List of questions
├── AnswerForm.tsx           # Form for adding/editing answers
└── QuestionPreview.tsx      # Preview component for questions
```

## Usage

All components should follow the project conventions defined in `CLAUDE.md`:

- Use TypeScript with strict types
- Follow naming conventions (PascalCase for components)
- Use Tailwind CSS for styling
- Export components as named exports
- Most components will be Client Components due to interactivity

## Example

```typescript
'use client'

import { QuestionDisplay } from '@/components/questions/QuestionDisplay'
import type { Question } from '@/types/question.types'

export default function GamePage() {
  const currentQuestion: Question = { /* ... */ }

  return (
    <QuestionDisplay
      question={currentQuestion}
      onAnswerReveal={handleReveal}
    />
  )
}
```

## References

- See [CLAUDE.md](../../CLAUDE.md) for full coding conventions
- See [DEVELOPMENT_PLAN.md](../../DEVELOPMENT_PLAN.md) for question data types
- See [types/question.types.ts](../../types/question.types.ts) for TypeScript interfaces
