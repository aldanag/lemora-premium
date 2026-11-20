import { useRef } from "react"
import { useReveal } from "../lib/motion"
import Button from "../components/Button"
import { PREMIUM_LINK } from "../lib/planes"
import { ETIQUETA } from "../lib/pastillas"

const pasos = [
  {
    n: "01",
    title: "Elegí el plan Premium",
    body: "Escribinos por WhatsApp y te ayudamos a contratarlo. Si ya tenés el plan Básico, actualizamos tu plan en el día.",
  },
  {
    n: "02",
    title: "Configurá tu tienda",
    body: "Preparamos tu tienda en menos de 24 horas. Te capacitamos para crear tus productos y servicios y para gestionar toda tu tienda.",
  },
  {
    n: "03",
    title: "Compartila y vendé",
    body: "Empezá a vender, compartí tu sitio, llegá a más clientes y mostrá tu web profesional al mundo. Todo tu negocio gestionado desde un único lugar.",
  },
]

export default function PremiumPasos() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="como-empezar" ref={root} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span
            data-reveal
            className={ETIQUETA}
          >
            Cómo empezar
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-white md:text-[34px]"
          >
            De cero a tu tienda funcionando, en tres pasos.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pasos.map((p) => (
            <div
              key={p.n}
              data-reveal
              className="rounded-3xl bg-lilac p-7 text-ink transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
            >
              <span className="text-[12.5px] font-semibold uppercase tracking-[0.09em]">
                Paso {p.n}
              </span>
              <h3 className="mt-3 text-[19px] font-bold">{p.title}</h3>
              <p className="mt-1.5 text-base">{p.body}</p>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-8 flex justify-center">
          <Button href={PREMIUM_LINK} external variant="inverse" size="lg" className="w-full max-w-xs sm:w-56">
            Suscribirme a Premium
          </Button>
        </div>
      </div>
    </section>
  )
}
