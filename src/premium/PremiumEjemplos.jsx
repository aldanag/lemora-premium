import { useEffect, useRef, useState } from "react"
import { useReveal } from "../lib/motion"
import mouraEscritorio from "../assets/tiendas/escritorio-1.webp"
import mouraMovil from "../assets/tiendas/movil-1.webp"
import boutiqueEscritorio from "../assets/tiendas/escritorio-2.webp"
import boutiqueMovil from "../assets/tiendas/movil-2.webp"
import { ETIQUETA } from "../lib/pastillas"

// Tiendas creadas con el plan Premium, en el mismo formato que las del Básico: una tarjeta por tienda, con la pantalla de
// escritorio y el celular. Las capturas son largas (la portada de cada tienda) y se deslizan muy despacio dentro de su pantalla,
// todas juntas: arrancan a la vez y tardan lo mismo (36 s, ida y vuelta), y solo se mueven mientras la sección está a la vista.
// Para cambiarlas: escritorio-N.webp (800 px de ancho) y movil-N.webp (390 px) en src/assets/tiendas.
const tiendas = [
  {
    nombre: "Moura Deco",
    rubro: "Deco y accesorios",
    href: "https://moura.lemora.lat/",
    escritorio: mouraEscritorio,
    movil: mouraMovil,
  },
  {
    nombre: "Boutique",
    rubro: "Indumentaria",
    href: "https://premium.lemora.lat/",
    escritorio: boutiqueEscritorio,
    movil: boutiqueMovil,
  },
]

const Candado = () => (
  <svg viewBox="0 0 24 24" className="h-[2.2cqw] w-[2.2cqw] flex-none" fill="currentColor" aria-hidden="true">
    <path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1Zm2 0h6V8a3 3 0 0 0-6 0v2Z" />
  </svg>
)

function Tarjeta({ t }) {
  const dominio = new URL(t.href).hostname
  // Cada tarjeta arranca su scroll desde arriba cuando entra en pantalla (y se reinicia si sale): así nunca se ve una tarjeta
  // "empezada a la mitad". Las tarjetas que se ven juntas (escritorio) arrancan a la vez; el escritorio y el celular de una
  // misma tarjeta también, porque comparten el mismo inicio y la misma duración.
  const enlace = useRef(null)
  const [viva, setViva] = useState(false)
  useEffect(() => {
    const el = enlace.current
    if (!el || !("IntersectionObserver" in window)) {
      setViva(true)
      return undefined
    }
    const io = new IntersectionObserver(([e]) => setViva(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <article data-reveal>
      <a
        ref={enlace}
        href={t.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver la tienda ${t.nombre}, ${t.rubro.toLowerCase()}`}
        className={`group relative block aspect-[100/92] w-full cursor-pointer overflow-hidden rounded-[2rem] bg-night-2 ring-1 ring-white/10 focus-ring-inverse [container-type:inline-size] ${viva ? "tarjeta-viva" : ""}`}
      >
        {/* Escritorio, con la barra del navegador y la dirección de la tienda */}
        <div className="absolute left-[9.5%] top-[19.5cqw] aspect-[16/10] w-[81%] overflow-hidden rounded-2xl bg-white ring-1 ring-white/20 [container-type:inline-size]">
          <div className="flex h-full flex-col">
            <div className="flex h-[10.5%] flex-none items-center gap-[2cqw] bg-[#F2F2F7] px-[2.4cqw]">
              <span className="flex gap-[1cqw]">
                {[0, 1, 2].map((n) => (
                  <i key={n} className="block h-[1.4cqw] w-[1.4cqw] rounded-full bg-ink/25" />
                ))}
              </span>
              <span className="mx-auto flex h-[78%] w-[52%] items-center justify-center gap-[1cqw] rounded-full bg-white px-[2cqw] text-[2.4cqw] font-medium leading-none text-ink-soft ring-1 ring-ink/10">
                <Candado />
                <span className="truncate">{dominio}</span>
              </span>
              <span className="w-[6cqw]" />
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">
              <img
                src={t.escritorio}
                alt=""
                width="800"
                height="1450"
                loading="lazy"
                draggable="false"
                className="scroll-suave block w-full"
                style={{ "--hasta": "-62%", "--dur": "36s" }}
              />
            </div>
          </div>
        </div>

        {/* Celular con el marco de las imágenes Premium (hora, isla y señal), cortado por el borde de abajo */}
        <div className="absolute right-[6cqw] top-[52cqw] w-[26cqw] rounded-t-[4.4cqw] bg-[#3B3262] px-[1.2cqw] pt-[1.2cqw]">
          <div className="overflow-hidden rounded-t-[3.3cqw] bg-white">
            <div
              aria-hidden="true"
              className="relative flex h-[3.9cqw] items-center justify-between bg-white pl-[2.4cqw] pr-[2cqw] text-[max(6.5px,1.5cqw)] font-extrabold leading-none text-ink"
            >
              <span>9:41</span>
              <span className="absolute left-1/2 top-[0.8cqw] h-[2cqw] w-[26%] -translate-x-1/2 rounded-full bg-[#0b0818]" />
              <span className="flex items-center gap-[max(2px,0.5cqw)]">
                <svg viewBox="0 0 17 11" className="h-[max(3.8px,0.95cqw)] w-auto" fill="currentColor">
                  <rect x="0" y="7.5" width="3" height="3.5" rx="0.8" />
                  <rect x="4.6" y="5" width="3" height="6" rx="0.8" />
                  <rect x="9.2" y="2.5" width="3" height="8.5" rx="0.8" />
                  <rect x="13.8" y="0" width="3" height="11" rx="0.8" />
                </svg>
                <svg viewBox="0 0 26 12" className="h-[max(3.8px,0.95cqw)] w-auto" fill="none">
                  <rect x="0.7" y="0.7" width="21.6" height="10.6" rx="3" stroke="currentColor" strokeWidth="1.4" />
                  <rect x="2.8" y="2.8" width="17.4" height="6.4" rx="1.6" fill="currentColor" />
                  <rect x="23.4" y="4" width="2" height="4" rx="1" fill="currentColor" />
                </svg>
              </span>
            </div>
            <div className="h-[40cqw] overflow-hidden">
              <img
                src={t.movil}
                alt=""
                width="390"
                height="1950"
                loading="lazy"
                draggable="false"
                className="scroll-suave block w-full"
                style={{ "--hasta": "-62%", "--dur": "36s" }}
              />
            </div>
          </div>
        </div>

        <span className="absolute left-[9.5%] top-[7cqw] rounded-full bg-white/10 px-3 py-1 text-[13px] font-semibold text-white ring-1 ring-white/25">
          {t.rubro}
        </span>

        <span className={`absolute right-[9.5%] top-[7cqw] ${ETIQUETA}`}>
          Plan Premium
        </span>

        <span className="absolute bottom-[7cqw] left-[9.5%] inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none">
          Ver tienda
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
            <path
              d="M7 17 17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </article>
  )
}

export default function PremiumEjemplos() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="ejemplos" ref={root} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span
            data-reveal
            className={ETIQUETA}
          >
            Tiendas con Premium
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-white md:text-[34px]"
          >
            Mirá tiendas creadas con el plan Premium.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-snow-soft">
            Entrá a cada una y recorré cómo se ve y cómo se compra.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:mx-auto md:max-w-4xl md:grid-cols-2">
          {tiendas.map((t) => (
            <Tarjeta key={t.nombre} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
