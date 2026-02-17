'use client'

import { Modal as FlowbiteModal } from 'flowbite-react'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: ModalSize
  footer?: React.ReactNode
  dismissible?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footer,
  dismissible = true,
}) => {
  return (
    <FlowbiteModal show={isOpen} onClose={onClose} size={size} dismissible={dismissible}>
      {title && (
        <FlowbiteModal.Header>
          <span className="font-display font-bold text-white">{title}</span>
        </FlowbiteModal.Header>
      )}

      <FlowbiteModal.Body>{children}</FlowbiteModal.Body>

      {footer && <FlowbiteModal.Footer>{footer}</FlowbiteModal.Footer>}
    </FlowbiteModal>
  )
}
