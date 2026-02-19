'use client'

import {
  Modal as FlowbiteModal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'flowbite-react'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  /**
   * Título del modal.
   * La primera palabra se renderiza en blanco, el resto en dorado italic
   * (patrón del Stitch design guide).
   */
  title?: string
  children: React.ReactNode
  size?: ModalSize
  footer?: React.ReactNode
  dismissible?: boolean
}

function SplitTitle({ title }: { title: string }) {
  const [first, ...rest] = title.split(' ')
  return (
    <>
      <span className="text-white">{first}</span>
      {rest.length > 0 && (
        <>
          {' '}
          <span className="italic text-[#dba61f]">{rest.join(' ')}</span>
        </>
      )}
    </>
  )
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
        <ModalHeader>
          <SplitTitle title={title} />
        </ModalHeader>
      )}

      <ModalBody>{children}</ModalBody>

      {footer && <ModalFooter>{footer}</ModalFooter>}
    </FlowbiteModal>
  )
}
