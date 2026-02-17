'use client'

import { Button as FlowbiteButton } from 'flowbite-react'
import type { ComponentProps } from 'react'

type FlowbiteButtonProps = ComponentProps<typeof FlowbiteButton>

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

const variantMap: Record<NonNullable<ButtonProps['variant']>, FlowbiteButtonProps['color']> = {
  primary: 'yellow',
  secondary: 'teal',
  danger: 'failure',
}

const sizeMap: Record<NonNullable<ButtonProps['size']>, FlowbiteButtonProps['size']> = {
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
}) => {
  return (
    <FlowbiteButton
      type={type}
      color={variantMap[variant]}
      size={sizeMap[size]}
      onClick={onClick}
      disabled={disabled}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </FlowbiteButton>
  )
}
