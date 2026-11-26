import { useRef, useState } from "react"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import LinkTexto from "../components/LinkTexto"
import CrownIcon from "../components/CrownIcon"
import Tick from "../components/Tick"
import { anualLink, PREMIUM_LINK, peso, plans, WHATSAPP_TRIAL_LINK } from "../lib/planes"
import { INSIGNIA } from "../lib/pastillas"

const premium = plans.find((p) => p.name === "Premium")

const opciones = [
  { id: false, label: "Mensual" },
  { id: true, label: "Anual", badge: "Ahorrá 17%" },
]

export default function PremiumPrecio() {
  const root = useRef(null)
  const [anual, setAnual] = useState(false)
  useReveal(root)

  return (
    <section id="precio" ref={root} className="py-16 md:py-24 text-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <h2
            data-words
            className="mx-auto max-w-xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold md:text-[34px]"
          >
            Un precio claro. Sin letra chica.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-snow-soft">
            El plan Premium tiene una contratación mínima de 3 meses y, pasado ese período, podés
            darte de baja cuando quieras. Sin comisiones por venta.
          </p>
        </div>

        <div
          data-reveal
          className="mx-auto mt-8 grid max-w-4xl gap-6 rounded-3xl bg-white p-5 text-ink ring-[3px] ring-accent sm:p-7 md:grid-cols-[0.8fr_1fr]"
        >
          <div className="flex flex-col items-center text-center">
            <h3 className="flex items-center justify-center gap-2 text-lg font-extrabold">
              <CrownIcon className="h-5 w-5 text-primary" />
              Plan Premium
            </h3>

            <div className="mt-4">
              <div
                role="group"
                aria-label="Período de pago"
                className="inline-flex flex-none rounded-full bg-primary-tint p-1 ring-1 ring-ink/10"
              >
                {opciones.map((op) => (
                  <button
                    key={op.label}
                    type="button"
                    aria-pressed={anual === op.id}
                    onClick={() => setAnual(op.id)}
                    className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-300 focus-ring motion-reduce:transition-none ${
                      anual === op.id ? (op.id ? "bg-primary text-white" : "bg-ink text-white") : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {op.label}
                    {op.badge && <span className={INSIGNIA}>{op.badge}</span>}
                  </button>
                ))}
              </div>
            </div>


            <div key={`precio-${anual}`} className="cambio-precio mt-5 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
              <p className="text-[36px] font-extrabold leading-none">
                {peso(anual ? premium.anual / 12 : premium.mensual)}
                <span className="text-base font-bold text-ink-soft">/mes</span>
              </p>
              {anual && (
                <p className="text-sm font-semibold text-ink-muted line-through decoration-2">
                  {peso(premium.mensual)}
                </p>
              )}
            </div>
            <p key={`nota-${anual}`} className="cambio-precio mt-2 text-[15px] font-bold text-primary">
              {anual
                ? `Pagás ${peso(premium.anual)} una vez al año · ahorrás ${peso(premium.mensual * 12 - premium.anual)}`
                : premium.commitment}
            </p>

            <p className="mt-4 text-balance text-sm font-semibold text-ink-soft">
              Si ya tenés el plan Básico, pasás a Premium desde el panel o escribiéndonos.
            </p>

            <div className="mt-6 flex w-full flex-col gap-3 md:mt-auto">
              <Button href={anual ? anualLink("Premium") : PREMIUM_LINK} external block>
                {anual ? "Suscribirme al plan anual" : "Suscribirme a Premium"}
              </Button>
              <p className="text-balance text-center text-sm text-ink-soft">
                ¿Querés probar primero?{" "}
                <LinkTexto href={WHATSAPP_TRIAL_LINK} external className="whitespace-nowrap">
                  Empezá con 1 mes gratis del Básico
                </LinkTexto>
              </p>
            </div>
          </div>

          <div className="border-t border-ink/10 pt-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <p className="text-sm font-bold text-ink-soft">{premium.intro}</p>
            <ul className="mt-3 space-y-2">
              {premium.features.map((f) => (
                <li
                  key={f.text}
                  className={`flex items-center gap-2.5 text-pretty text-sm ${f.isNew ? "font-bold" : ""}`}
                >
                  <Tick />
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
