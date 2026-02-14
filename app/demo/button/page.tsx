'use client'

import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export default function ButtonDemo() {
  const [clickCount, setClickCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Button Component Demo</h1>
          <p className="text-gray-600">
            Reusable button component with multiple variants and sizes
          </p>
        </div>

        {/* Variants Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" onClick={() => setClickCount(clickCount + 1)}>
              Primary Button
            </Button>
            <Button variant="secondary" onClick={() => setClickCount(clickCount + 1)}>
              Secondary Button
            </Button>
            <Button variant="danger" onClick={() => setClickCount(clickCount + 1)}>
              Danger Button
            </Button>
          </div>
          <p className="text-sm text-gray-600">Click count: {clickCount}</p>
        </section>

        {/* Sizes Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="primary">
              Small
            </Button>
            <Button size="md" variant="primary">
              Medium
            </Button>
            <Button size="lg" variant="primary">
              Large
            </Button>
          </div>
        </section>

        {/* Disabled State */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Disabled State</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" disabled>
              Disabled Primary
            </Button>
            <Button variant="secondary" disabled>
              Disabled Secondary
            </Button>
            <Button variant="danger" disabled>
              Disabled Danger
            </Button>
          </div>
        </section>

        {/* All Combinations */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">All Combinations</h2>
          <div className="space-y-6">
            {(['primary', 'secondary', 'danger'] as const).map((variant) => (
              <div key={variant} className="space-y-2">
                <h3 className="text-lg font-medium capitalize">{variant}</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant={variant} size="sm">
                    Small
                  </Button>
                  <Button variant={variant} size="md">
                    Medium
                  </Button>
                  <Button variant={variant} size="lg">
                    Large
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Styling */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Custom Styling</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" className="rounded-full">
              Rounded Full
            </Button>
            <Button variant="secondary" className="uppercase tracking-wider">
              Uppercase
            </Button>
            <Button variant="danger" className="shadow-lg">
              With Shadow
            </Button>
          </div>
        </section>

        {/* Accessibility */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Accessibility</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" ariaLabel="Save your progress">
              Save
            </Button>
            <Button variant="danger" ariaLabel="Delete item permanently">
              Delete
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Try keyboard navigation with Tab and Enter/Space keys
          </p>
        </section>
      </div>
    </div>
  )
}
