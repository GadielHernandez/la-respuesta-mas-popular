export interface TeamScoreProps {
  teamName: string
  score: number
  isActive: boolean
  /** `team1` → acento dorado · `team2` → acento azul (en panel de moderador) */
  variant: 'team1' | 'team2'
  /**
   * `board` (default) → tarjeta grande lateral del tablero público (proyector).
   * `control` → fila compacta del panel de moderador.
   */
  displayMode?: 'board' | 'control'
  /** Solo en `control`: indica que este equipo es el que intenta robar en la fase de robo */
  isStealing?: boolean
  className?: string
}

/**
 * Marcador de un equipo.
 *
 * Componente puro — solo props, sin acceso a contexto. Usable tanto en el
 * tablero público (`displayMode="board"`) como en el panel del moderador
 * (`displayMode="control"`).
 *
 * La animación de score usa `key={score}` para re-montar el número
 * y re-disparar `.animate-score-popup` con cada cambio — sin useState ni useEffect.
 */
export function TeamScore({
  teamName,
  score,
  isActive,
  variant,
  displayMode = 'board',
  isStealing = false,
  className = '',
}: TeamScoreProps): React.ReactElement {
  // En control mode, team2 usa azul (no hay token, es estándar Tailwind)
  const nameColorControl = variant === 'team1' ? 'text-primary' : 'text-blue-400'

  // ─── Modo tablero público ─────────────────────────────────────────────────
  if (displayMode === 'board') {
    return (
      <div
        className={`flex flex-col items-center transition-all duration-500 ${className}`}
      >
        <div
          className={`flex flex-col items-center p-8 rounded-3xl transition-all duration-500
            ${isActive
              ? 'active-team-glow bg-primary/5'
              : 'border border-white/5 bg-white/5 opacity-40'
            }`}
        >
          {/* Nombre del equipo */}
          <h2
            className={`text-lg font-bold tracking-[0.15em] uppercase mb-2
              ${isActive ? 'text-primary' : 'text-white/60'}`}
          >
            {teamName}
          </h2>

          {/* Score — key re-monta el elemento al cambiar, disparando .animate-score-popup */}
          <span
            key={score}
            className={`text-7xl font-black leading-none animate-score-popup
              ${isActive ? 'text-glow-gold text-white' : 'text-white/60'}`}
          >
            {score}
          </span>
        </div>

        {/* Indicador de turno activo */}
        {isActive && (
          <div className="mt-4 flex flex-col items-center">
            <span className="text-[10px] text-primary font-bold tracking-widest uppercase">
              Turno Actual
            </span>
            <span className="material-symbols-outlined text-primary text-xl animate-bounce mt-1">
              expand_more
            </span>
          </div>
        )}
      </div>
    )
  }

  // ─── Modo panel de moderador ──────────────────────────────────────────────
  return (
    <div
      className={`relative bg-game-card border rounded-xl p-4 transition-all duration-500
        ${isActive
          ? 'border-2 border-primary possession-glow'
          : isStealing
            ? 'border-2 border-danger-strike/70 shadow-[0_0_16px_rgba(188,44,44,0.25)]'
            : 'border border-warm-border opacity-70 hover:opacity-100'
        }
        ${className}`}
    >
      {/* Badge de posesión */}
      {isActive && (
        <div className="absolute -top-2 -right-2 bg-primary text-game-board text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
          <span className="material-symbols-outlined text-[10px]">stars</span>
          POSESIÓN
        </div>
      )}

      {/* Badge de robo */}
      {isStealing && (
        <div className="absolute -top-2 -right-2 bg-danger-strike text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
          <span className="material-symbols-outlined text-[10px]">swap_horiz</span>
          ROBANDO
        </div>
      )}

      {/* Nombre + Score */}
      <div className="flex justify-between items-center">
        <span className={`font-bold text-sm uppercase tracking-wide ${nameColorControl}`}>
          {teamName}
        </span>

        {/* Score — key re-monta al cambiar, dispara .animate-score-popup */}
        <span
          key={score}
          className="text-3xl font-black animate-score-popup"
        >
          {score}
        </span>
      </div>
    </div>
  )
}
