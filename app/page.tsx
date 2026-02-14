import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <main className="flex w-full max-w-4xl flex-col items-center gap-8 p-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-display mb-2 text-4xl font-bold">La Respuesta más Popular</h1>
          <p className="font-sans text-gray-600">Tailwind CSS Configuration Test</p>
        </div>

        {/* Custom Colors Demo */}
        <section className="w-full">
          <h2 className="font-display mb-4 text-2xl font-semibold">Custom Colors</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Primary Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Primary (Blue)</h3>
              <div className="bg-primary-light rounded-lg p-4 text-gray-900">primary-light</div>
              <div className="bg-primary rounded-lg p-4 text-white">primary</div>
              <div className="bg-primary-dark rounded-lg p-4 text-white">primary-dark</div>
            </div>

            {/* Secondary Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Secondary (Green)</h3>
              <div className="bg-secondary-light rounded-lg p-4 text-gray-900">secondary-light</div>
              <div className="bg-secondary rounded-lg p-4 text-white">secondary</div>
              <div className="bg-secondary-dark rounded-lg p-4 text-white">secondary-dark</div>
            </div>

            {/* Status Colors */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Status Colors</h3>
              <div className="bg-danger rounded-lg p-4 text-white">danger</div>
              <div className="bg-warning rounded-lg p-4 text-white">warning</div>
            </div>
          </div>
        </section>

        {/* cn() Function Demo */}
        <section className="w-full">
          <h2 className="font-display mb-4 text-2xl font-semibold">cn() Function Test</h2>
          <div className="space-y-4">
            <div className={cn('rounded-lg p-4', 'bg-primary text-white', 'font-semibold')}>
              This uses cn() to merge classes
            </div>
            <div className={cn('bg-primary rounded-lg p-4', 'bg-secondary text-white')}>
              cn() resolves conflicts: bg-secondary overrides bg-primary
            </div>
          </div>
        </section>

        {/* Font Demo */}
        <section className="w-full">
          <h2 className="font-display mb-4 text-2xl font-semibold">Custom Fonts</h2>
          <div className="space-y-4">
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="font-sans text-lg">
                This text uses <strong>Inter</strong> (font-sans) - the default body font
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <p className="font-display text-lg font-semibold">
                This text uses <strong>Poppins</strong> (font-display) - for headings
              </p>
            </div>
          </div>
        </section>

        {/* Success Message */}
        <div className="bg-secondary-light border-secondary w-full rounded-lg border-2 p-6 text-center">
          <p className="text-secondary-dark text-lg font-semibold">
            ✅ Tailwind CSS is configured correctly!
          </p>
          <p className="mt-2 text-sm text-gray-700">
            All custom colors, fonts, and utilities are working as expected.
          </p>
        </div>
      </main>
    </div>
  )
}
