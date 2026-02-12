# Questions Components

This directory contains React components related to question management and display.

## Purpose
Components in this folder handle:
- Question display and rendering
- Question creation and editing forms
- Question set management UI
- Question preview components

## Structure
```
questions/
├── QuestionDisplay.tsx      # Main question display component
├── QuestionForm.tsx          # Form for creating/editing questions
├── QuestionSetCard.tsx       # Card component for question sets
└── QuestionPreview.tsx       # Preview component for questions
```

## Usage
All components should follow the project conventions defined in `CLAUDE.md`:
- Use TypeScript with strict types
- Follow naming conventions (PascalCase for components)
- Use Tailwind CSS for styling
- Export components as named exports

## Example
```typescript
import { QuestionDisplay } from '@/components/questions/QuestionDisplay'

<QuestionDisplay question={currentQuestion} onAnswerReveal={handleReveal} />
```
