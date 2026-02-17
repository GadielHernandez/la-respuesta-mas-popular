'use client'

import { Label, TextInput, HelperText } from 'flowbite-react'

import { cn } from '@/lib/utils'

interface InputProps {
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'search'
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  className?: string
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
}) => {
  const inputId = id ?? name ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <Label htmlFor={inputId}>
          <span className="text-sm font-semibold text-[#b8bcc8]">
            {label}
            {required && <span className="ml-1 text-[#fdb42d]">*</span>}
          </span>
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
        color={error ? 'failure' : 'gray'}
      />

      {(error || helperText) && (
        <HelperText color={error ? 'failure' : 'gray'}>
          {error ?? helperText}
        </HelperText>
      )}
    </div>
  )
}
