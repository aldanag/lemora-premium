import { useRef } from "react"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import Tick from "../components/Tick"
import { LANDING_PLANES, peso, plans } from "../lib/planes"

// Las listas salen de los mismos datos que las tarjetas de planes, así no se desfasan.
const nombre = (f) => f.text ?? f
const basico = plans.find((p) => p.name === "Básico")
const conBasico = basico.features.map(nombre)
const premium = plans.find((p) => p.name === "Premium")
const conPremium = premium.features.map(nombre)

export default function PremiumComparar() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="comparar" ref={root} className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <span
            data-reveal
            className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
          >
            ¿Básico o Premium?
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-white md:text-[34px]"
          >
            Lo esencial en el Básico. Todo lo demás en Premium.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div data-reveal className="rounded-3xl bg-night-2 p-6 ring-1 ring-white/10">
            <p className="text-sm font-semibold uppercase tracking-[0.09em] text-snow-muted">
              Con el Básico
            </p>
            <p className="mt-2 text-[28px] font-extrabold text-white">
              {peso(basico.mensual)}
              <span className="text-base font-bold text-snow-soft">/mes</span>
            </p>
            <p className="mt-1 text-sm text-snow-soft">Ideal para empezar a vender online.</p>
            <ul className="mt-4 space-y-2">
              {conBasico.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm text-snow-soft">
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="rounded-3xl bg-white p-6 ring-[3px] ring-accent">
            <p className="text-sm font-semibold uppercase tracking-[0.09em] text-ink-soft">
              Con el Premium, además
            </p>
            <p className="mt-2 text-[28px] font-extrabold text-ink">
              {peso(premium.mensual)}
              <span className="text-base font-bold text-ink-soft">/mes</span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">{premium.commitment}.</p>
            <ul className="mt-4 space-y-2">
              {conPremium.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal className="mt-8 flex justify-center">
          <Button href={LANDING_PLANES} variant="outline" size="lg" className="w-full max-w-xs sm:w-56">
            Ver todos los planes
          </Button>
        </div>
      </div>
    </section>
  )
}
