import { Button } from '@/components/ui/Button'

export default function Home() {
  return (
    <div className="bg-game flex min-h-screen items-center justify-center p-8">
      <main className="flex w-full max-w-4xl flex-col items-center gap-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-display text-glow-gold mb-3 text-5xl font-extrabold text-white">
            La Respuesta más Popular
          </h1>
          <p className="text-lg text-[#b8bcc8]">Design System Preview</p>
        </div>

        {/* Color Palette */}
        <section className="w-full">
          <h2 className="font-display mb-4 text-xl font-bold text-white">Color Palette</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="card-gold flex flex-col gap-2 p-4">
              <div className="h-10 w-full rounded-lg bg-[#fdb42d]" />
              <span className="text-xs font-semibold text-[#b8bcc8]">Gold Primary</span>
              <span className="font-mono text-xs text-[#4a5a7a]">#fdb42d</span>
            </div>
            <div className="card-gold flex flex-col gap-2 p-4">
              <div className="h-10 w-full rounded-lg bg-[#4ecdc4]" />
              <span className="text-xs font-semibold text-[#b8bcc8]">Teal Secondary</span>
              <span className="font-mono text-xs text-[#4a5a7a]">#4ecdc4</span>
            </div>
            <div className="card-gold flex flex-col gap-2 p-4">
              <div className="h-10 w-full rounded-lg bg-[#1b2134]" />
              <span className="text-xs font-semibold text-[#b8bcc8]">Game BG</span>
              <span className="font-mono text-xs text-[#4a5a7a]">#1b2134</span>
            </div>
            <div className="card-gold flex flex-col gap-2 p-4">
              <div className="h-10 w-full rounded-lg bg-[#232b42]" />
              <span className="text-xs font-semibold text-[#b8bcc8]">Card BG</span>
              <span className="font-mono text-xs text-[#4a5a7a]">#232b42</span>
            </div>
          </div>
        </section>

        {/* Button Variants */}
        <section className="w-full">
          <h2 className="font-display mb-4 text-xl font-bold text-white">Buttons</h2>
          <div className="card-gold flex flex-wrap gap-4 p-6">
            <Button variant="primary" size="lg">
              Primary (Gold)
            </Button>
            <Button variant="outline" size="lg">
              Secondary (Teal)
            </Button>
            <Button variant="danger" size="lg">
              Danger
            </Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
        </section>

        {/* Typography */}
        <section className="w-full">
          <h2 className="font-display mb-4 text-xl font-bold text-white">Typography</h2>
          <div className="card-gold space-y-4 p-6">
            <p className="font-display text-4xl font-extrabold text-white">
              Poppins — Display Font
            </p>
            <p className="font-sans text-lg text-[#b8bcc8]">
              Nunito — Body Font. Amigable, redondeada y legible en cualquier tamaño.
            </p>
            <p className="font-sans text-sm text-[#8891a5]">
              Texto secundario — gris medio para descripciones y metadata.
            </p>
          </div>
        </section>

        {/* Custom Utilities */}
        <section className="w-full">
          <h2 className="font-display mb-4 text-xl font-bold text-white">Custom Utilities</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="card-gold glow-gold p-6 text-center">
              <p className="font-semibold text-[#fdb42d]">.glow-gold</p>
              <p className="mt-1 text-sm text-[#b8bcc8]">Gold box-shadow glow</p>
            </div>
            <div className="card-gold p-6 text-center">
              <p className="text-glow-gold font-extrabold text-[#fdb42d]">.text-glow-gold</p>
              <p className="mt-1 text-sm text-[#b8bcc8]">Text shadow dorado</p>
            </div>
            <div className="card-gold glow-gold-sm p-6 text-center">
              <p className="font-semibold text-[#fdb42d]">.glow-gold-sm</p>
              <p className="mt-1 text-sm text-[#b8bcc8]">Subtle gold glow</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
