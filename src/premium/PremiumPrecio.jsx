import { useRef, useState } from "react"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import LinkTexto from "../components/LinkTexto"
import Segmented from "../components/Segmented"
import CrownIcon from "../components/CrownIcon"
import Tick from "../components/Tick"
import { anualLink, PREMIUM_LINK, peso, plans, WHATSAPP_TRIAL_LINK } from "../lib/planes"

const premium = plans.find((p) => p.name === "Premium")

const opciones = [
  { id: false, label: "Mensual" },
  { id: true, label: "Anual", badge: "Ahorrá 11%" },
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

        <div data-reveal className="mt-8 flex justify-center">
          <Segmented label="Período de pago" tone="dark" value={anual} onChange={setAnual} options={opciones} />
        </div>

        <div
          data-reveal
          className="mx-auto mt-8 grid max-w-4xl gap-6 rounded-3xl bg-white p-5 text-ink ring-[3px] ring-accent sm:p-7 md:grid-cols-[1.15fr_1fr]"
        >
          <div className="flex flex-col">
            <h3 className="flex items-center gap-2 text-xl font-extrabold">
              <CrownIcon className="h-5 w-5 text-primary" />
              Plan Premium
            </h3>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="text-[44px] font-extrabold leading-none">
                {peso(anual ? premium.anual / 12 : premium.mensual)}
                <span className="text-lg font-bold text-ink-soft">/mes</span>
              </p>
              {anual && (
                <p className="text-sm font-semibold text-ink-muted line-through decoration-2">
                  {peso(premium.mensual)}
                </p>
              )}
            </div>
            <p className="mt-2 text-[15px] font-bold text-primary">
              {anual
                ? `Pagás ${peso(premium.anual)} una vez al año · ahorrás ${peso(premium.mensual * 12 - premium.anual)}`
                : premium.commitment}
            </p>

            <p className="mt-4 text-sm font-semibold text-ink-soft">
              Si ya tenés el plan Básico, pasás a Premium desde el panel o escribiéndonos, y
              actualizamos tu plan en el día.
            </p>

            <div className="mt-6 flex flex-col gap-3 md:mt-auto md:pt-6">
              <Button href={anual ? anualLink("Premium") : PREMIUM_LINK} external className="w-full md:w-fit md:self-start md:px-10">
                {anual ? "Suscribirme al plan anual" : "Suscribirme a Premium"}
              </Button>
              <p className="text-center text-sm text-ink-soft md:text-left">
                ¿Querés probar primero?{" "}
                <LinkTexto href={WHATSAPP_TRIAL_LINK} external>
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
                  className={`flex items-center gap-2.5 text-sm ${f.isNew ? "font-bold" : ""}`}
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
