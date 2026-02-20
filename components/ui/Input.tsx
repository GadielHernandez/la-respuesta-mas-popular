'use client'

import { Label, TextInput, HelperText } from 'flowbite-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type TextInputColor = 'gray' | 'info' | 'failure' | 'warning' | 'success'

interface InputProps {
  label?: string
  placeholder?: string
  type?: ComponentProps<typeof TextInput>['type']
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  className?: string
  sizing?: 'sm' | 'md' | 'lg'
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  helperText,
  disabled = false,
  required = false,
  name,
  id,
  className = '',
  sizing = 'md',
}) => {
  const inputId = id ?? name ?? label?.toLowerCase().replace(/\s+/g, '-')
  const color: TextInputColor = error ? 'failure' : 'gray'

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <Label htmlFor={inputId}>
          {label}
          {required && <span className="ml-1 text-primary">*</span>}
        </Label>
      )}

      <TextInput
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        color={color}
        sizing={sizing}
      />

      {(error || helperText) && (
        <HelperText color={error ? 'failure' : 'gray'}>{error ?? helperText}</HelperText>
      )}
    </div>
  )
}
