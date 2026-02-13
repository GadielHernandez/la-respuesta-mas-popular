import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <main className="flex flex-col items-center gap-8 p-8 max-w-4xl w-full">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold font-display mb-2">
            La Respuesta más Popular
          </h1>
          <p className="text-gray-600 font-sans">
            Tailwind CSS Configuration Test
          </p>
        </div>

        {/* Custom Colors Demo */}
        <section className="w-full">
          <h2 className="text-2xl font-semibold font-display mb-4">Custom Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Primary Colors */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Primary (Blue)</h3>
              <div className="bg-primary-light text-gray-900 p-4 rounded-lg">
                primary-light
              </div>
              <div className="bg-primary text-white p-4 rounded-lg">
                primary
              </div>
              <div className="bg-primary-dark text-white p-4 rounded-lg">
                primary-dark
              </div>
            </div>

            {/* Secondary Colors */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Secondary (Green)</h3>
              <div className="bg-secondary-light text-gray-900 p-4 rounded-lg">
                secondary-light
              </div>
              <div className="bg-secondary text-white p-4 rounded-lg">
                secondary
              </div>
              <div className="bg-secondary-dark text-white p-4 rounded-lg">
                secondary-dark
              </div>
            </div>

            {/* Status Colors */}
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Status Colors</h3>
              <div className="bg-danger text-white p-4 rounded-lg">
                danger
              </div>
              <div className="bg-warning text-white p-4 rounded-lg">
                warning
              </div>
            </div>
          </div>
        </section>

        {/* cn() Function Demo */}
        <section className="w-full">
          <h2 className="text-2xl font-semibold font-display mb-4">
            cn() Function Test
          </h2>
          <div className="space-y-4">
            <div
              className={cn(
                "p-4 rounded-lg",
                "bg-primary text-white",
                "font-semibold"
              )}
            >
              This uses cn() to merge classes
            </div>
            <div
              className={cn(
                "p-4 rounded-lg bg-primary",
                "bg-secondary text-white"
              )}
            >
              cn() resolves conflicts: bg-secondary overrides bg-primary
            </div>
          </div>
        </section>

        {/* Font Demo */}
        <section className="w-full">
          <h2 className="text-2xl font-semibold font-display mb-4">
            Custom Fonts
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="font-sans text-lg">
                This text uses <strong>Inter</strong> (font-sans) - the default body font
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <p className="font-display text-lg font-semibold">
                This text uses <strong>Poppins</strong> (font-display) - for headings
              </p>
            </div>
          </div>
        </section>

        {/* Success Message */}
        <div className="w-full p-6 bg-secondary-light border-2 border-secondary rounded-lg text-center">
          <p className="text-lg font-semibold text-secondary-dark">
            ✅ Tailwind CSS is configured correctly!
          </p>
          <p className="text-sm text-gray-700 mt-2">
            All custom colors, fonts, and utilities are working as expected.
          </p>
        </div>
      </main>
    </div>
  );
}
