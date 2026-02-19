'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

function SectionHeader({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <div className="mb-6">
      <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-widest text-[#fdb42d]">
        {label}
      </p>
      <h2 className="font-display text-2xl font-extrabold text-white">{title}</h2>
      <p className="mt-1 text-sm text-[#8891a5]">{sub}</p>
    </div>
  )
}

export default function DemoPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [inputValues, setInputValues] = useState({
    teamName: '',
    email: '',
    password: '',
  })

  return (
    <div className="bg-game min-h-screen">
      {/* Header */}
      <header className="border-b border-[#2a3550] px-8 py-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-[#4a5a7a]">
            app / demo
          </p>
          <h1 className="font-display text-glow-gold text-5xl font-extrabold text-white">
            UI Components
          </h1>
          <p className="mt-3 max-w-xl text-base text-[#b8bcc8]">
            Sistema de componentes reutilizables de La Respuesta más Popular. Construidos sobre
            Flowbite React con el tema Dark Blue + Gold.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-16 px-8 py-14">
        {/* ── Button ── */}
        <section>
          <SectionHeader
            label="components/ui/Button"
            title="Button"
            sub="Acción principal de la interfaz. Tres variantes para cada contexto de uso."
          />
          <div className="card-gold space-y-6 p-8">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#4a5a7a]">
                Variantes
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Jugar ahora</Button>
                <Button variant="outline">Ver historial</Button>
                <Button variant="danger">Eliminar</Button>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#4a5a7a]">
                Tamaños
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">
                  Pequeño
                </Button>
                <Button variant="primary" size="md">
                  Mediano
                </Button>
                <Button variant="primary" size="lg">
                  Grande
                </Button>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#4a5a7a]">
                Estado deshabilitado
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" disabled>
                  Deshabilitado
                </Button>
                <Button variant="outline" disabled>
                  Deshabilitado
                </Button>
                <Button variant="danger" disabled>
                  Deshabilitado
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Card ── */}
        <section>
          <SectionHeader
            label="components/ui/Card"
            title="Card"
            sub="Contenedor de contenido con variantes default y gold. Soporta título, footer y modo interactivo."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card title="Partida reciente">
              <p className="text-sm text-[#b8bcc8]">Equipo Rojo vs Equipo Azul</p>
              <p className="mt-2 font-mono text-2xl font-bold text-[#fdb42d]">320 — 280</p>
            </Card>

            <Card
              title="Pregunta del día"
              variant="gold"
              footer={
                <Button variant="primary" size="sm">
                  Ver respuestas
                </Button>
              }
            >
              <p className="text-sm text-[#b8bcc8]">¿Nombre algo que se encuentra en una cocina?</p>
            </Card>

            <Card
              title="Próxima partida"
              onClick={() => alert('Card clickeada')}
            >
              <p className="text-sm text-[#b8bcc8]">Click para configurar</p>
              <p className="mt-2 text-xs text-[#4a5a7a]">2 equipos • 5 rondas</p>
            </Card>
          </div>
        </section>

        {/* ── Input ── */}
        <section>
          <SectionHeader
            label="components/ui/Input"
            title="Input"
            sub="Campo de texto accesible con label, helper text y estado de error. Soporta todos los tipos HTML."
          />
          <div className="card-gold grid gap-6 p-8 md:grid-cols-2">
            <Input
              label="Nombre del equipo"
              placeholder="Ej: Los Campeones"
              value={inputValues.teamName}
              onChange={(e) => setInputValues((prev) => ({ ...prev, teamName: e.target.value }))}
              required
            />

            <Input
              label="Correo electrónico"
              type="email"
              placeholder="jugador@ejemplo.com"
              value={inputValues.email}
              onChange={(e) => setInputValues((prev) => ({ ...prev, email: e.target.value }))}
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={inputValues.password}
              onChange={(e) => setInputValues((prev) => ({ ...prev, password: e.target.value }))}
              helperText="Mínimo 8 caracteres"
            />

            <Input
              label="Campo con error"
              placeholder="Ingresa texto"
              error="Este campo es requerido"
            />

            <Input
              label="Campo deshabilitado"
              placeholder="No disponible"
              value="Solo lectura"
              disabled
            />
          </div>
        </section>

        {/* ── Modal ── */}
        <section>
          <SectionHeader
            label="components/ui/Modal"
            title="Modal"
            sub="Diálogo accesible con focus trap y cierre al hacer click fuera. Soporta título, cuerpo y footer."
          />
          <div className="card-gold flex flex-wrap gap-4 p-8">
            <Button variant="primary" onClick={() => setModalOpen(true)}>
              Abrir modal
            </Button>
            <Button variant="danger" onClick={() => setConfirmModalOpen(true)}>
              Confirmar acción
            </Button>
          </div>

          {/* Info modal */}
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Nueva partida"
            footer={
              <div className="flex gap-3">
                <Button variant="primary" onClick={() => setModalOpen(false)}>
                  Confirmar
                </Button>
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Cancelar
                </Button>
              </div>
            }
          >
            <p className="text-[#b8bcc8]">
              ¿Deseas iniciar una nueva partida? Configura los equipos y el número de rondas antes
              de comenzar.
            </p>
            <div className="mt-4 space-y-4">
              <Input label="Nombre del equipo 1" placeholder="Equipo Rojo" required />
              <Input label="Nombre del equipo 2" placeholder="Equipo Azul" required />
            </div>
          </Modal>

          {/* Confirm modal */}
          <Modal
            isOpen={confirmModalOpen}
            onClose={() => setConfirmModalOpen(false)}
            title="¿Eliminar partida?"
            size="sm"
            footer={
              <div className="flex gap-3">
                <Button variant="danger" onClick={() => setConfirmModalOpen(false)}>
                  Sí, eliminar
                </Button>
                <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>
                  Cancelar
                </Button>
              </div>
            }
          >
            <p className="text-[#b8bcc8]">
              Esta acción no se puede deshacer. Se eliminarán todos los datos de la partida.
            </p>
          </Modal>
        </section>
      </div>
    </div>
  )
}
