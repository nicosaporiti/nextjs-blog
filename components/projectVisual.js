function MatcherVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0d1015] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,59,84,0.45),transparent_38%)]" />
      <div className="relative flex h-full min-h-[220px] flex-col justify-between p-5 md:p-7">
        <div className="flex items-center gap-2 text-[11px] font-semibold">
          <span className="rounded-full border border-[#364259] bg-[#1d2532] px-3 py-1 text-[#f0b44b]">MENÚ</span>
          <span className="rounded-full border border-[#364259] bg-[#111722] px-3 py-1 text-[#a5afc0]">Directorio</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#f0b44b] text-[#f0b44b]">M</div>
              <span className="text-xl font-semibold tracking-[0.18em] text-[#f0b44b]">MATCHER NEWS</span>
            </div>
            <div className="mb-4 inline-flex rounded-full border border-[#42506a] bg-[#1c2431] px-4 py-1.5 text-xs font-semibold text-[#f0b44b]">
              RSS + Nostr en una experiencia simple
            </div>
            <h4 className="max-w-xl text-3xl font-black leading-[0.98] tracking-[-0.05em] text-[#f3eee5] md:text-5xl">
              Lo que amas leer en 1 minuto, sin configurar nada.
            </h4>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#98a1b2] md:text-base">
              Portales curados y My Feeds por carpetas para decidir rápido dónde enfocar tu atención.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#42506a] bg-[#111722] px-4 py-2 text-sm font-semibold text-[#f0b44b]">Iniciar sesión</span>
              <span className="rounded-full bg-[#f0b44b] px-4 py-2 text-sm font-semibold text-[#12161d]">Empezar ahora</span>
              <span className="rounded-full border border-[#42506a] bg-[#111722] px-4 py-2 text-sm font-semibold text-[#f0b44b]">Ver demo (60s)</span>
            </div>
          </div>
          <div className="rounded-[24px] border border-[#283245] bg-[#12161d] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
            <div className="mb-4 rounded-2xl border border-[#2f394d] bg-[#0e1218] px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-[#f0b44b]">
              Vista Real De La App
            </div>
            {[["Trump eleva los aranceles globales al 15%", "DIARIO FINANCIERO"], ["Bitcoin rompe resistencia y vuelve el impulso", "BLOOMBERG"]].map(([title, source], index) => (
              <div key={title} className={`rounded-[22px] border border-[#273244] bg-[#0f1318] p-4 ${index === 0 ? "mb-4" : ""}`}>
                <div className="flex gap-4">
                  <div className={`h-20 w-28 rounded-2xl ${index === 0 ? "bg-[linear-gradient(135deg,#d4aa67,#584733)]" : "bg-[linear-gradient(135deg,#0f3d77,#201227)]"}`} />
                  <div className="flex-1">
                    <div className="mb-2 h-4 w-4/5 rounded bg-[#eae3d8]/90" />
                    <div className="mb-1 h-3 w-3/4 rounded bg-[#6f7785]" />
                    <div className="h-3 w-1/2 rounded bg-[#4c5462]" />
                  </div>
                </div>
                <div className="mt-3 border-t border-[#283245] pt-3">
                  <div className="flex items-center justify-between text-xs tracking-[0.18em] text-[#f0b44b]">
                    <span>{source}</span>
                    <span className="text-[#7e8797]">{index === 0 ? "40 min" : "55 min"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GrosoVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1220] text-white">
      <div className="relative grid h-full min-h-[220px] items-center gap-6 p-5 lg:grid-cols-[1fr_1.1fr] lg:p-8">
        <div>
          <div className="mb-4 flex items-center gap-3 text-2xl font-semibold">
            <span className="text-[#3b82f6]">⌘</span>
            <span>Groso.app</span>
          </div>
          <h4 className="text-3xl font-black leading-[1.02] tracking-[-0.05em] text-white md:text-5xl">
            Entrena fuerza con datos reales, <span className="text-[#3b82f6]">progresa</span> semana a semana
          </h4>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#96a0af] md:text-base">
            Registra entrenamientos en segundos, mide volumen total, detecta estancamientos y mejora tu rendimiento.
          </p>
          <div className="mt-6 inline-flex rounded-2xl bg-[#3b82f6] px-5 py-3 text-sm font-semibold text-white">
            Entrenar Ahora
          </div>
        </div>
        <div className="relative rounded-[28px] border border-white/8 bg-[#121b2b] p-4 shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xl font-semibold">Gym Tracker</span>
            <div className="flex gap-2">
              <span className="h-7 w-7 rounded-lg bg-white/8" />
              <span className="h-7 w-7 rounded-lg bg-white/8" />
              <span className="h-7 w-7 rounded-lg bg-white/8" />
            </div>
          </div>
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[5, 21, 5].map((value) => (
              <div key={value} className="rounded-xl bg-white/6 p-4 text-center">
                <div className="text-3xl font-bold">{value}</div>
                <div className="mt-1 text-xs text-[#97a3b5]">Indicador</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-white/6 p-4">
            <div className="mb-3 h-4 w-24 rounded bg-white/10" />
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, index) => (
                <span
                  key={index}
                  className={`h-8 rounded-full ${index % 9 === 0 || index % 11 === 0 ? "bg-[#3b82f6]" : "bg-transparent border border-white/6"}`}
                />
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 left-0 rounded-[24px] border border-white/10 bg-[#141d2d] px-5 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
            <div className="text-sm text-[#96a0af]">Progreso esta semana</div>
            <div className="text-3xl font-bold text-[#3b82f6]">+24%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuscafondosVisual() {
  return (
    <div className="h-full w-full overflow-hidden rounded-[18px] border border-[#d6d9de] bg-[#f5f7fb] text-[#1f2937]">
      <div className="border-b border-[#d6d9de] bg-white px-5 py-4">
        <div className="text-3xl font-semibold">
          Busca<span className="text-[#2563eb]">Fondos.com</span>
        </div>
      </div>
      <div className="p-5">
        <div className="overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,rgba(19,24,34,0.85),rgba(57,64,73,0.75)),linear-gradient(135deg,#c48a4e,#a0b6d4)] px-5 py-6 text-white">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#60a5fa]">Analiza tu próxima inversión</div>
          <div className="mt-3 text-3xl font-bold leading-tight">Busca y compara fondos mutuos en Chile</div>
          <div className="mt-2 max-w-2xl text-sm text-white/85">
            Encuentra administradoras, series y métricas para decidir más rápido.
          </div>
        </div>
        <div className="mt-5 rounded-[14px] border border-[#d6d9de] bg-white p-5 shadow-sm">
          <div className="mb-5 text-3xl font-bold">Elige tu fondo mutuo ideal en segundos</div>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="mb-4 inline-flex rounded-xl bg-[#e5e7eb] p-1">
                <span className="rounded-lg bg-[#2680c2] px-4 py-2 text-sm font-semibold text-white">Buscar AGF</span>
                <span className="px-4 py-2 text-sm font-semibold text-[#4b5563]">Buscar Todos</span>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((field) => (
                  <div key={field}>
                    <div className="mb-2 text-sm font-semibold text-[#111827]">Filtro</div>
                    <div className="h-12 rounded-lg border border-[#d6d9de] bg-[#fafafa]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-8">
              <div className="mb-3 text-2xl font-bold">¿Cuánto cobra mi Fondo Mutuo?</div>
              <div className="space-y-3 text-base leading-8 text-[#374151]">
                <p>Selecciona la administradora y los fondos mutuos de tu interés.</p>
                <p>Conocerás su tasa anual de costos aproximada y acceso a la ficha del fondo.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectVisual({ name }) {
  switch (name) {
    case 'Matcher News':
      return <MatcherVisual />;
    case 'Groso App':
      return <GrosoVisual />;
    case 'Buscafondos':
      return <BuscafondosVisual />;
    default:
      return (
        <div className="flex h-full min-h-[220px] items-center justify-center bg-surface-container-high text-sm text-on-surface-variant">
          Preview unavailable
        </div>
      );
  }
}
