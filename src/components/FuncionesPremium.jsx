import { cloneElement, useEffect, useRef, useState } from "react"
import { useReveal } from "../lib/motion"
import CrownIcon from "./CrownIcon"
import BarraMensajes from "./BarraMensajes"
import InventarioAnimado from "./InventarioAnimado"
import ClienteAnimado from "./ClienteAnimado"
import MarketingAnimado from "./MarketingAnimado"
import PagosAnimado from "./PagosAnimado"
import EscenaMayorista from "./escenas/EscenaMayorista"
import CarritoAnimado from "./CarritoAnimado"
import Button from "./Button"
import Tick from "./Tick"
import { funcionesPremium } from "../lib/funcionesPremium"
import { PREMIUM_LINK } from "../lib/planes"
import { ETIQUETA, ETIQUETA_ICONO } from "../lib/pastillas"

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
  "Tu venta",
  "Tus pagos",
  "Tu marketing",
]

const funciones = funcionesPremium.map((f, i) => ({
  ...f,
  n: i + 1,
  etiqueta: etiquetas[i],
  // la función 6 (mayorista o minorista) es una escena viva y no una imagen: las imágenes siguen la numeración sin ella
  imagen: i === 5 ? undefined : fotoDe(i < 5 ? i + 1 : i),
  escena: i === 5 ? <EscenaMayorista /> : undefined,
  // el carrito (5) y los badges de Marketing (8) los dibuja la animación junto con la imagen
  superposicion:
    i === 0 ? <BarraMensajes /> : i === 2 ? <ClienteAnimado /> : i === 3 ? <InventarioAnimado /> : i === 4 ? <CarritoAnimado /> : i === 6 ? <PagosAnimado /> : i === 7 ? <MarketingAnimado /> : undefined,
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
        <span className={ETIQUETA}>
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
          {funcion.escena ? (
            cloneElement(funcion.escena, { activa })
          ) : funcion.imagen ? (
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
  // Al acercarse el banner a la pantalla se enciende un resplandor violeta detrás, como el contraluz del celular del hero.
  const ref = useRef(null)
  const encendido = useAVista(ref)
  return (
    <div ref={ref} className="relative isolate">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-x-4 -inset-y-5 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(124,92,240,0.95),rgba(98,82,235,0.55)_60%,rgba(84,70,220,0)_100%)] blur-2xl transition-opacity duration-1000 ease-out motion-reduce:transition-none md:-inset-x-10 md:-inset-y-9 ${encendido ? "opacity-100" : "opacity-0"}`}
      />
      <div
        data-reveal
        className={`flex flex-col items-center gap-5 rounded-[2rem] px-6 py-8 text-center transition-shadow duration-1000 ease-out motion-reduce:transition-none md:flex-row md:justify-between md:px-10 md:text-left ${fondo} ${encendido ? "shadow-[0_0_0_1px_rgba(167,155,255,0.35),0_0_2.5rem_rgba(145,130,255,0.35)]" : "shadow-none"}`}
      >
        <div>
          <p className="text-[clamp(20px,5.6vw,24px)] font-bold leading-tight">{titulo}</p>
          <p className={`mt-1 text-base ${tono === "lilac" ? "" : "text-snow-soft"}`}>{texto}</p>
        </div>
        <Button href={PREMIUM_LINK} external variant={tono === "lilac" ? "primary" : "inverse"} size="lg" className="w-full max-w-xs flex-none sm:w-56">
          Suscribirme a Premium
        </Button>
      </div>
    </div>
  )
}

export default function FuncionesPremium() {
  const root = useRef(null)
  useReveal(root)

  return (
    <section id="premium" ref={root} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span
            data-reveal
            className={ETIQUETA_ICONO}
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
              {i === 4 && (
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
