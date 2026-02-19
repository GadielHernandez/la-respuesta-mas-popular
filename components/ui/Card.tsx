import { Card as FlowbiteCard } from 'flowbite-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type FlowbiteCardProps = ComponentProps<typeof FlowbiteCard>

interface CardProps {
  children: React.ReactNode
  title?: string
  footer?: React.ReactNode
  href?: string
  className?: string
  /** 'gold' agrega hover dorado sobre el card base */
  variant?: 'default' | 'gold' | 'selected'
  onClick?: () => void
  horizontal?: boolean
  imgSrc?: FlowbiteCardProps['imgSrc']
  imgAlt?: FlowbiteCardProps['imgAlt']
}

const variantClass: Record<NonNullable<CardProps['variant']>, string> = {
  default: '',
  gold: 'hover:border-[#dba61f] hover:shadow-[0_0_15px_rgba(219,166,31,0.1)]',
  selected: '!border-l-4 !border-l-[#dba61f]',
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  footer,
  href,
  className = '',
  variant = 'default',
  onClick,
  horizontal = false,
  imgSrc,
  imgAlt,
}) => {
  return (
    <FlowbiteCard
      href={href}
      horizontal={horizontal}
      imgSrc={imgSrc}
      imgAlt={imgAlt}
      className={cn(variantClass[variant], onClick && 'cursor-pointer', className)}
      onClick={onClick}
    >
      {title && (
        <h5 className="mb-2 text-sm font-black uppercase tracking-widest text-white">{title}</h5>
      )}
      {children}
      {footer && <div className="mt-4 border-t border-[#383429] pt-4">{footer}</div>}
    </FlowbiteCard>
  )
}
