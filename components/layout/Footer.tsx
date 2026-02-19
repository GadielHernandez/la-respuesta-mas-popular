export function Footer() {
  return (
    <footer className="border-t border-warm-border bg-game-config">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <p className="text-[11px] font-black italic uppercase tracking-tight text-white">
            La Respuesta <span className="text-primary">más Popular</span>
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
            Hecho para jugar en familia
          </p>
        </div>
      </div>
    </footer>
  )
}
