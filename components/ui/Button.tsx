'use client'

import { Button as FlowbiteButton } from 'flowbite-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type FlowbiteButtonProps = ComponentProps<typeof FlowbiteButton>

// Variantes semánticas del proyecto → colores del tema Flowbite Stitch
type ButtonVariant = 'primary' | 'outline' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  fullSized?: boolean
}

const variantToColor: Record<ButtonVariant, FlowbiteButtonProps['color']> = {
  primary: 'primary',
  outline: 'outline',
  danger: 'danger',
  ghost: 'ghost',
}

const sizeToFlowbite: Record<ButtonSize, FlowbiteButtonProps['size']> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel,
  fullSized = false,
}) => {
  return (
    <FlowbiteButton
      type={type}
      color={variantToColor[variant]}
      size={sizeToFlowbite[size]}
      onClick={onClick}
      disabled={disabled}
      fullSized={fullSized}
      aria-label={ariaLabel}
      className={cn(className)}
    >
      {children}
    </FlowbiteButton>
  )
}
