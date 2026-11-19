import { cloneElement, useEffect, useRef, useState } from "react"
import { useReveal } from "../lib/motion"
import CrownIcon from "./CrownIcon"
import BarraMensajes from "./BarraMensajes"
import InventarioAnimado from "./InventarioAnimado"
import ClienteAnimado from "./ClienteAnimado"
import MarketingAnimado from "./MarketingAnimado"
import CarritoAnimado from "./CarritoAnimado"
import CarruselAnimado from "./CarruselAnimado"
import Button from "./Button"
import Tick from "./Tick"
import { funcionesPremium } from "../lib/funcionesPremium"
import { PREMIUM_LINK } from "../lib/planes"

// Una función por bloque, como en la landing del Básico: el texto a un lado y su imagen (cuadrada, generada en
// la landing original con `herramientas/premium-imagenes/generar.py`) al otro, alternando. Las animaciones en
// vivo van encima de la imagen y corren solo mientras el bloque está a la vista. Los textos están en
// src/lib/funcionesPremium.js.
const fotos = import.meta.glob("../assets/premium/premium-*.{webp,png,jpg}", {
  eager: true,
  import: "default",
})
const fotoDe = (n) => Object.entries(fotos).find(([ruta]) => ruta.includes(`premium-${n}.`))?.[1]

// Etiqueta corta de cada bloque (la píldora lima de arriba del título).
const etiquetas = [
  "Tu barra",
  "Tus categorías",
  "Tus clientes",
  "Tu inventario",
  "Tu carrito",
  "Tus promociones",
  "Tu marketing",
]

const funciones = funcionesPremium.map((f, i) => ({
  ...f,
  n: i + 1,
  etiqueta: etiquetas[i],
  imagen: fotoDe(i + 1),
  // el carrito (5) y los badges de Marketing (7) los dibuja la animación junto con la imagen
  superposicion:
    i === 0 ? <BarraMensajes /> : i === 2 ? <ClienteAnimado /> : i === 3 ? <InventarioAnimado /> : i === 4 ? <CarritoAnimado /> : i === 5 ? <CarruselAnimado /> : i === 6 ? <MarketingAnimado /> : undefined,
}))

// Devuelve true mientras el elemento está a la vista (para que las animaciones corran solo ahí).
function useAVista(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !("IntersectionObserver" in window)) {
      setVisible(true)
      return undefined
    }
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return visible
}

function Bloque({ funcion, invertido }) {
  const marco = useRef(null)
  const activa = useAVista(marco)
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      <div data-reveal className={invertido ? "md:order-2" : ""}>
        <span className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:text-[12px]">
          {funcion.etiqueta}
        </span>
        <h3 className="mt-3 text-balance text-[clamp(22px,6.4vw,26px)] font-bold leading-[1.1] text-white md:text-[30px]">
          {funcion.titulo}
        </h3>
        <p className="mt-3 text-base text-snow-soft">{funcion.cuerpo}</p>
        {funcion.puntos && (
          <ul className="mt-5 space-y-2">
            {funcion.puntos.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[15px] font-semibold text-white">
                <Tick className="mt-1 h-4 w-4" />
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div data-reveal className={invertido ? "md:order-1" : ""}>
        <div
          ref={marco}
          className="@container relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-[2rem] bg-lavender shadow-xl shadow-black/30 ring-1 ring-white/10"
        >
          {funcion.imagen ? (
            <img
              src={funcion.imagen}
              alt={funcion.etiquetaImagen ?? funcion.titulo}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <div
              role="img"
              aria-label={`Lugar para la imagen: ${funcion.etiquetaImagen ?? funcion.titulo}`}
              className="absolute inset-0 flex items-center justify-center bg-primary-tint p-8 text-center text-[15px] text-ink-soft"
            >
              {funcion.etiquetaImagen ?? funcion.titulo}
            </div>
          )}
          {funcion.superposicion && (
            <div className="pointer-events-none absolute inset-0 z-10">
              {cloneElement(funcion.superposicion, { activa })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Llamado a la acción entre bloques.
function Cta({ titulo, texto, tono = "lilac" }) {
  const fondo = tono === "lilac" ? "bg-lilac text-ink" : "bg-night-2 text-white ring-1 ring-white/10"
  return (
    <div
      data-reveal
      className={`flex flex-col items-center gap-5 rounded-[2rem] px-6 py-8 text-center md:flex-row md:justify-between md:px-10 md:text-left ${fondo}`}
    >
      <div>
        <p className="text-[clamp(20px,5.6vw,24px)] font-bold leading-tight">{titulo}</p>
        <p className={`mt-1 text-base ${tono === "lilac" ? "" : "text-snow-soft"}`}>{texto}</p>
      </div>
      <Button href={PREMIUM_LINK} external size="lg" className="w-full max-w-xs flex-none sm:w-60">
        Quiero el plan Premium
      </Button>
    </div>
  )
}

export default function FuncionesPremium() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="premium" ref={root} className="py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span
            data-reveal
            className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
          >
            <CrownIcon className="h-3.5 w-3.5" />
            Funciones Premium
          </span>
          <h2
            data-words
            className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(25px,8.2vw,32px)] font-bold text-white md:text-[34px]"
          >
            Tus clientes, tus ofertas, tu tienda.
          </h2>
          <p data-reveal className="mx-auto mt-3 max-w-xl text-balance text-base text-snow-soft">
            Todo lo del plan Básico y, además, cada una de las herramientas del plan Premium,
            explicadas una por una.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-14 md:gap-20">
          {funciones.map((f, i) => (
            <div key={f.titulo} className="contents">
              <Bloque funcion={f} invertido={i % 2 === 1} />
              {i === 2 && (
                <Cta
                  titulo="Todo esto, en tu tienda."
                  texto="Contratá el plan Premium o, si ya tenés el Básico, actualizamos tu plan en el día."
                />
              )}
              {i === 5 && (
                <Cta
                  titulo="¿Te convence? Empezá hoy."
                  texto="Escribinos por WhatsApp y armamos tu tienda Premium."
                  tono="oscuro"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
