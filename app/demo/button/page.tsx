'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/Button'

interface PropRow {
  prop: string
  type: string
  default: string
  desc: string
}

const PROPS: PropRow[] = [
  {
    prop: 'variant',
    type: "'primary' | 'secondary' | 'danger'",
    default: "'primary'",
    desc: 'Estilo visual del botón',
  },
  { prop: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Tamaño del botón' },
  { prop: 'children', type: 'React.ReactNode', default: '—', desc: 'Contenido del botón' },
  { prop: 'onClick', type: '() => void', default: '—', desc: 'Handler de click' },
  { prop: 'disabled', type: 'boolean', default: 'false', desc: 'Estado deshabilitado' },
  {
    prop: 'type',
    type: "'button' | 'submit' | 'reset'",
    default: "'button'",
    desc: 'Tipo HTML nativo',
  },
  { prop: 'className', type: 'string', default: "''", desc: 'Clases CSS adicionales' },
  {
    prop: 'ariaLabel',
    type: 'string',
    default: '—',
    desc: 'Label accesible para screen readers',
  },
]

function ClickBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#fdb42d]/30 bg-[#fdb42d]/10 px-2 py-0.5 font-mono text-xs font-bold text-[#fdb42d]">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#fdb42d]" />
      {count}
    </span>
  )
}

function CodeSnippet({ code }: { code: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-lg border border-[#2a3550] bg-[#141927] p-3">
      <code className="font-mono text-xs leading-relaxed text-[#b8bcc8]">{code}</code>
    </pre>
  )
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-xl font-bold text-white">{children}</h2>
      <p className="mt-1 text-sm text-[#8891a5]">{sub}</p>
    </div>
  )
}

export default function ButtonDemoPage() {
  const [counts, setCounts] = useState({ primary: 0, secondary: 0, danger: 0 })

  const inc = (key: keyof typeof counts) =>
    setCounts((prev) => ({ ...prev, [key]: prev[key] + 1 }))

  return (
    <div className="bg-game min-h-screen">
      {/* Page header */}
      <header className="border-b border-[#2a3550] px-8 py-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-[#4a5a7a]">
            components / ui
          </p>
          <h1 className="font-display text-glow-gold text-5xl font-extrabold text-white">Button</h1>
          <p className="mt-3 max-w-xl text-base text-[#b8bcc8]">
            Componente reutilizable con variantes de color, tamaños, estados y soporte completo de
            accesibilidad. Construido sobre Flowbite React.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-14 px-8 py-14">
        {/* ── Variants ── */}
        <section>
          <SectionTitle sub="Tres variantes para diferentes contextos: acción principal, acción secundaria, y acción destructiva.">
            Variantes
          </SectionTitle>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Primary */}
            <div className="card-gold flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#fdb42d]">
                  primary
                </span>
                <ClickBadge count={counts.primary} />
              </div>
              <Button variant="primary" onClick={() => inc('primary')}>
                Jugar ahora
              </Button>
              <CodeSnippet
                code={`<Button variant="primary">\n  Jugar ahora\n</Button>`}
              />
            </div>

            {/* Secondary */}
            <div className="card-gold flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#4ecdc4]">
                  secondary
                </span>
                <ClickBadge count={counts.secondary} />
              </div>
              <Button variant="secondary" onClick={() => inc('secondary')}>
                Ver historial
              </Button>
              <CodeSnippet
                code={`<Button variant="secondary">\n  Ver historial\n</Button>`}
              />
            </div>

            {/* Danger */}
            <div className="card-gold flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#ff6b6b]">
                  danger
                </span>
                <ClickBadge count={counts.danger} />
              </div>
              <Button variant="danger" onClick={() => inc('danger')}>
                Eliminar partida
              </Button>
              <CodeSnippet
                code={`<Button variant="danger">\n  Eliminar partida\n</Button>`}
              />
            </div>
          </div>
        </section>

        {/* ── Sizes ── */}
        <section>
          <SectionTitle sub="Tres tamaños disponibles. El tamaño md es el predeterminado.">
            Tamaños
          </SectionTitle>

          <div className="card-gold p-8">
            <div className="flex flex-wrap items-end gap-6">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <div key={size} className="flex flex-col items-center gap-3">
                  <Button variant="primary" size={size}>
                    {size === 'sm' ? 'Pequeño' : size === 'md' ? 'Mediano' : 'Grande'}
                  </Button>
                  <span className="font-mono text-xs text-[#4a5a7a]">size="{size}"</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── States ── */}
        <section>
          <SectionTitle sub="Estado deshabilitado con opacidad reducida y cursor not-allowed para comunicar claramente la indisponibilidad.">
            Estados
          </SectionTitle>

          <div className="card-gold p-8">
            <div className="flex flex-wrap gap-6">
              {(['primary', 'secondary', 'danger'] as const).map((variant) => (
                <div key={variant} className="flex flex-col items-center gap-3">
                  <Button variant={variant} disabled>
                    Deshabilitado
                  </Button>
                  <span className="font-mono text-xs text-[#4a5a7a]">
                    variant="{variant}" disabled
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Form Types ── */}
        <section>
          <SectionTitle sub="Soporte nativo para los tres tipos HTML de botón.">
            Tipos de formulario
          </SectionTitle>

          <div className="card-gold p-8">
            <form
              onSubmit={(e) => e.preventDefault()}
              onReset={() => {}}
              className="flex flex-wrap items-center gap-4"
            >
              <Button type="submit" variant="primary">
                Guardar
              </Button>
              <Button type="reset" variant="secondary">
                Restablecer
              </Button>
              <Button type="button" variant="danger">
                Cancelar
              </Button>
            </form>
          </div>
        </section>

        {/* ── Accessibility ── */}
        <section>
          <SectionTitle sub="Prop ariaLabel para labels descriptivos en screen readers cuando el texto visible no es suficiente.">
            Accesibilidad
          </SectionTitle>

          <div className="card-gold p-8">
            <div className="flex flex-wrap gap-4">
              <Button variant="danger" ariaLabel="Eliminar pregunta número 3 permanentemente">
                ✕
              </Button>
              <Button
                variant="primary"
                ariaLabel="Revelar respuesta número 1: Pizza, 48 puntos"
              >
                1
              </Button>
              <Button variant="secondary" ariaLabel="Ir a la siguiente pregunta del juego">
                →
              </Button>
            </div>
            <CodeSnippet
              code={`<Button\n  variant="danger"\n  ariaLabel="Eliminar pregunta número 3"\n>\n  ✕\n</Button>`}
            />
          </div>
        </section>

        {/* ── Props API ── */}
        <section>
          <SectionTitle sub="Referencia completa de todas las props disponibles.">Props API</SectionTitle>

          <div className="card-gold overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a3550]">
                  {['Prop', 'Tipo', 'Default', 'Descripción'].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left font-mono text-xs font-semibold uppercase tracking-widest text-[#fdb42d]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a3550]">
                {PROPS.map((row) => (
                  <tr key={row.prop} className="transition-colors hover:bg-[#2a3550]/30">
                    <td className="px-5 py-3 font-mono text-xs text-[#fdb42d]">{row.prop}</td>
                    <td className="px-5 py-3 font-mono text-xs text-[#4ecdc4]">{row.type}</td>
                    <td className="px-5 py-3 font-mono text-xs text-[#b8bcc8]">{row.default}</td>
                    <td className="px-5 py-3 text-xs text-[#8891a5]">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
