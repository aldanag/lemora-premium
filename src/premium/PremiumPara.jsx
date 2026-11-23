import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBagShopping, faCalendarCheck } from "@fortawesome/free-solid-svg-icons"
import { useReveal } from "../lib/motion"
import Tick from "../components/Tick"
import { plans } from "../lib/planes"
import { ETIQUETA, INSIGNIA } from "../lib/pastillas"

// Todo lo que ya trae el plan Básico y se mantiene en Premium. La lista sale de los mismos datos que las tarjetas de planes
// (src/lib/planes.js), así no se desfasa. Las funciones que Premium mejora llevan una pastilla corta.
const basico = plans.find((p) => p.name === "Básico")

// [nombre que se muestra en Premium, pastilla]: solo para las funciones que cambian al pasar a Premium.
const MEJORAS = {
  "Carrusel de hasta 8 imágenes": ["Carrusel de imágenes", "Hasta 12 en Premium"],
  "3 banners promocionales": ["Banners promocionales", "Hasta 5 en Premium"],
  "Incluye Lemora Ads en barra promocional": ["Barra promocional", "Con tus propios mensajes"],
}

const items = basico.features.map((f) => {
  const mejora = MEJORAS[f]
  return { texto: mejora ? mejora[0] : f, mejora: mejora ? mejora[1] : null }
})

const tipos = [
  { icon: faBagShopping, texto: "Tienda de productos" },
  { icon: faCalendarCheck, texto: "Tienda de servicios, con turnos" },
]

export default function PremiumPara() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="productos-y-servicios" ref={root} className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center">
          <span data-reveal className={ETIQUETA}>
            Todo lo del Básico
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-white md:text-[34px]"
          >
            Todo lo del Básico, incluido.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-snow-soft">
            Con Premium mantenés todo lo del plan Básico y lo cargás desde el mismo panel, sin límite. Elegís si tu tienda
            vende productos o ofrece servicios.
          </p>
        </div>

        <div data-reveal className="mt-8 flex flex-wrap justify-center gap-3">
          {tipos.map((t) => (
            <span
              key={t.texto}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-lilac px-4 py-2 text-sm font-semibold text-ink"
            >
              <FontAwesomeIcon icon={t.icon} className="h-4 w-4" aria-hidden="true" />
              {t.texto}
            </span>
          ))}
        </div>

        <div data-reveal className="mt-6 rounded-3xl bg-night-2 p-6 ring-1 ring-white/10 md:p-8">
          <ul className="grid gap-x-10 gap-y-3.5 md:grid-cols-2">
            {items.map((it) => (
              <li key={it.texto} className="flex items-start gap-2.5 text-[15px] text-snow">
                <Tick className="mt-[0.3em] h-4 w-4" />
                <span className="min-w-0 flex-1">
                  <span className="font-semibold">{it.texto}</span>
                  {it.mejora && <span className={`ml-2 inline-block align-middle ${INSIGNIA}`}>{it.mejora}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
