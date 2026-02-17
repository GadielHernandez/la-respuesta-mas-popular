import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  title?: string
  footer?: React.ReactNode
  href?: string
  className?: string
  variant?: 'default' | 'gold'
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  footer,
  href,
  className = '',
  variant = 'default',
  onClick,
}) => {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-200'

  const variantStyles = {
    default: 'bg-[#232b42] border border-[#31405e]',
    gold: 'card-gold',
  }

  const isInteractive = !!(href || onClick)

  const content = (
    <div className={cn(baseStyles, variantStyles[variant], isInteractive && 'cursor-pointer', className)}>
      {title && (
        <h5 className="font-display mb-4 text-xl font-bold text-white">{title}</h5>
      )}
      <div>{children}</div>
      {footer && (
        <div className="mt-4 border-t border-[#2a3550] pt-4">{footer}</div>
      )}
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="w-full text-left">
        {content}
      </button>
    )
  }

  return content
}
