import { useEffect, useRef, useState } from "react"
import { gsap, REDUCED_MOTION_OFF, useGSAP, useReveal } from "../lib/motion"
import Button from "../components/Button"
import CrownIcon from "../components/CrownIcon"
import Tick from "../components/Tick"
import WhatsAppIcon from "../components/WhatsAppIcon"
import { PREMIUM_LINK } from "../lib/planes"
import fotoTienda from "../assets/hero/tienda-foto.webp"
import prodRemera from "../assets/hero/prod-remera.webp"
import prodShort from "../assets/hero/prod-short.webp"
import badgeBF from "../assets/premium-overlays/badge-bf.svg"
import fotoAviso from "../assets/premium-overlays/aviso-producto.jpg"

// Portada del plan Premium. A la izquierda el título (la palabra final se escribe sola, en una línea) y a la derecha
// la tienda real de las imágenes Premium en un celular, cortado contra el borde de abajo del panel, con las piezas
// aprobadas flotando alrededor: «Sin Lemora Ads», la oferta con su contador, la notificación de confianza y el pedido
// por WhatsApp. Con "reducir movimiento" todo queda quieto.
const palabras = ["vender más.", "conocer clientes.", "ordenar stock.", "promocionar."]

const prefiereQuieto = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

// Cambia de palabra cada 2,6 s: la actual sube y sale por arriba y la siguiente sube desde abajo (como los títulos del resto de la web).
function useRotar(cantidad, activo) {
  const [actual, setActual] = useState(0)
  useEffect(() => {
    if (!activo) return undefined
    const id = setInterval(() => setActual((i) => (i + 1) % cantidad), 2600)
    return () => clearInterval(id)
  }, [cantidad, activo])
  return actual
}

// Cuenta regresiva de la oferta, como en la tienda real: 1 día, 19 horas, 59 minutos, 39 segundos, y baja de a un segundo.
const INICIO = 24 * 3600 + 19 * 3600 + 59 * 60 + 39
function useCuentaRegresiva(activo) {
  const [seg, setSeg] = useState(INICIO)
  useEffect(() => {
    if (!activo) return undefined
    const id = setInterval(() => setSeg((s) => (s <= 1 ? INICIO : s - 1)), 1000)
    return () => clearInterval(id)
  }, [activo])
  return [Math.floor(seg / 86400), Math.floor((seg % 86400) / 3600), Math.floor((seg % 3600) / 60), seg % 60]
}

// Trazo del rulo de Lemora (la curva de la «L»), el mismo de las imágenes Premium.
const RULO =
  "M313.2 425.5C294.6 387 251.8 351.2 215.3 334.7M215.3 334.7C200.8 328.1 187.3 324.5 176.7 325.1C140 324.9 117 350.2 127.2 370.6C139.8 398 167.2 390.1 193.1 363.7C202.3 354.6 209.9 344.8 215.3 334.7ZM215.3 334.7C227.3 312.3 228.9 288.7 215.1 270.6C197.3 246.5 165 244.9 136.4 226.3C69.6 184.2 30 101.1 13.9 3.6"

const mensajes = ["Compra mínima $70.000", "Envíos a todo el país", "Solo transferencia"]

const Lupa = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-[5cqw] w-[5cqw]" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2.6" />
    <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
)
const Corazon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[5cqw] w-[5cqw]" aria-hidden="true">
    <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.6 4.5c2 0 3.5 1 5.4 3 1.9-2 3.4-3 5.4-3 3.6 0 5.7 3.8 4.2 7.3C19.5 16.4 12 21 12 21Z" />
  </svg>
)
const Carrito = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[5cqw] w-[5cqw]" aria-hidden="true">
    <path d="M3 4h2.6l.5 2H21l-2 8H8L5.4 4H3Zm5.5 15a1.7 1.7 0 1 0 0 .01Zm9 0a1.7 1.7 0 1 0 0 .01Z" />
  </svg>
)
const Menu = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-[5cqw] w-[5cqw]" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
  </svg>
)

// El celular de las imágenes Premium (marco violeta oscuro, hora 9:41, isla, barra promocional, «TU TIENDA», la foto y
// los productos). Es más alto que el espacio visible: lo corta el borde de abajo del panel.
function TiendaCelular() {
  const pista = [...mensajes, ...mensajes]
  return (
    <div className="w-[var(--ancho-celu)] rounded-t-[calc(var(--ancho-celu)*0.145)] bg-marco-celu px-[calc(var(--ancho-celu)*0.0265)] pt-[calc(var(--ancho-celu)*0.0265)]">
      <div className="overflow-hidden rounded-t-[calc(var(--ancho-celu)*0.115)] bg-white text-ink [container-type:inline-size]">
        <div
          aria-hidden="true"
          className="relative flex h-[11.2cqw] items-center justify-between bg-white pl-[8cqw] pr-[6.4cqw] text-[4.4cqw] font-extrabold leading-none"
        >
          <span>9:41</span>
          <span className="absolute left-1/2 top-[2.4cqw] h-[7.2cqw] w-[28%] -translate-x-1/2 rounded-full bg-isla" />
          <span className="flex items-center gap-[2.4cqw]">
            <svg viewBox="0 0 17 11" className="h-[3.2cqw] w-auto" fill="currentColor">
              <rect x="0" y="7.5" width="3" height="3.5" rx="0.8" />
              <rect x="4.6" y="5" width="3" height="6" rx="0.8" />
              <rect x="9.2" y="2.5" width="3" height="8.5" rx="0.8" />
              <rect x="13.8" y="0" width="3" height="11" rx="0.8" />
            </svg>
            <svg viewBox="0 0 26 12" className="h-[3.2cqw] w-auto" fill="none">
              <rect x="0.7" y="0.7" width="21.6" height="10.6" rx="3" stroke="currentColor" strokeWidth="1.4" />
              <rect x="2.8" y="2.8" width="17.4" height="6.4" rx="1.6" fill="currentColor" />
              <rect x="23.4" y="4" width="2" height="4" rx="1" fill="currentColor" />
            </svg>
          </span>
        </div>

        {/* Barra promocional con mensajes propios */}
        <div className="flex h-[8cqw] items-center overflow-hidden bg-night text-white">
          <div className="marquee-pista flex w-max flex-none items-center gap-[6cqw] whitespace-nowrap pr-[6cqw] text-[3.3cqw] font-bold">
            {pista.map((m, i) => (
              <span key={i} className="flex-none">
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="flex h-[16cqw] items-center justify-between px-[5cqw]">
          <span className="text-[4.6cqw] font-semibold tracking-[0.22em]">TU TIENDA</span>
          <span className="flex items-center gap-[3.6cqw]">
            <Lupa />
            <Corazon />
            <Carrito />
            <Menu />
          </span>
        </div>

        <img src={fotoTienda} alt="" width="900" height="599" className="block w-full" />

        <div className="grid grid-cols-2 gap-[4cqw] px-[4cqw] pt-[4cqw]">
          {[
            { foto: prodRemera, nombre: "Remera básica", badge: true },
            { foto: prodShort, nombre: "Short de jean" },
          ].map((p) => (
            <div key={p.nombre}>
              <div className="relative">
                <img src={p.foto} alt="" width="420" height="420" className="aspect-square w-full rounded-[3.4cqw] object-cover" />
                {/* Badge de promoción (el real de Black Friday) */}
                {p.badge && <img src={badgeBF} alt="" className="absolute left-[3cqw] top-[3cqw] w-[17cqw]" />}
              </div>
              <p className="mt-[2cqw] text-[3.8cqw] font-semibold">{p.nombre}</p>
              <p className="text-[3.8cqw] font-bold text-primary">$14.900</p>
            </div>
          ))}
          {[
            { foto: prodShort, nombre: "Short de jean" },
            { foto: prodRemera, nombre: "Remera básica" },
          ].map((p, i) => (
            <div key={i} className="mt-[3cqw]">
              <img src={p.foto} alt="" width="420" height="420" className="aspect-square w-full rounded-[3.4cqw] object-cover" />
              <p className="mt-[2cqw] text-[3.8cqw] font-semibold">{p.nombre}</p>
              <p className="text-[3.8cqw] font-bold text-primary">$14.900</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PremiumHero() {
  const root = useRef(null)
  const [quieto] = useState(prefiereQuieto)
  const palabraActual = useRotar(palabras.length, !quieto)
  const [dias, horas, minutos, segundos] = useCuentaRegresiva(!quieto)
  useReveal(root)

  // Las piezas flotan despacio. Con "reducir movimiento" quedan quietas.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(REDUCED_MOTION_OFF, () => {
        gsap.to("[data-flota]", {
          y: (i) => (i % 2 ? -8 : 8),
          duration: (i) => 2.8 + i * 0.45,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        })
      })
    },
    { scope: root },
  )

  const sombra = "shadow-xl shadow-black/30"
  const dos = (n) => String(n).padStart(2, "0")

  return (
    <section id="top" ref={root} className="mx-auto max-w-[112rem] px-[var(--gutter)] pb-16 pt-[calc(var(--gutter)*2+var(--menu-h))] md:pb-24">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-night-2 ring-1 ring-white/10 md:rounded-[2.5rem]">
        <div className="relative grid items-stretch gap-8 px-5 pt-10 md:px-[var(--inset-panel)] md:pt-14 lg:[--alto-panel:31rem] lg:min-h-[var(--alto-panel)] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-0">
          {/* Rulo de Lemora (el mismo trazo de las imágenes Premium) al fondo de todo el panel: lo corta solo el borde redondeado */}
          <svg
            aria-hidden="true"
            viewBox="0 0 286 430"
            fill="none"
            className="pointer-events-none absolute -z-10 hidden overflow-visible lg:block lg:left-[calc(72%-var(--alto-panel,34rem)*0.7)] lg:top-[calc(var(--alto-panel,34rem)*-0.74)] lg:w-[calc(var(--alto-panel,34rem)*1.15)]"
          >
            <path d={RULO} stroke="var(--color-accent)" strokeWidth="27.9" strokeLinecap="round" />
          </svg>

          {/* Texto: un solo ritmo de espacios (título 16, bajada 12, botones 24, tildes 20). */}
          <div className="text-center lg:self-center lg:text-left">
            <span
              data-reveal
              className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
            >
              <CrownIcon className="h-3.5 w-3.5" />
              Plan Premium
            </span>
            <h1
              data-reveal
              className="mt-4 text-[clamp(32px,9vw,40px)] font-bold leading-[1.05] text-white md:text-[48px] lg:text-[clamp(40px,3.6vw,54px)]"
            >
              <span className="sr-only">
                Tu tienda, con todo para vender más, conocer clientes, ordenar stock y promocionar.
              </span>
              <span aria-hidden="true">
                Tu tienda, con todo para{" "}
                <span className="grid overflow-hidden pb-[0.16em] -mb-[0.16em] text-lavender">
                  {palabras.map((w, i) => {
                    const dif = (i - palabraActual + palabras.length) % palabras.length
                    const estado =
                      dif === 0
                        ? "translate-y-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
                        : dif === palabras.length - 1
                          ? "-translate-y-[115%] transition-transform duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)]"
                          : "translate-y-[115%]"
                    return (
                      <span key={w} className={`col-start-1 row-start-1 motion-reduce:transition-none ${estado}`}>
                        {w}
                      </span>
                    )
                  })}
                </span>
              </span>
            </h1>
            <p
              data-reveal
              className="mx-auto mt-3 md:mt-4 max-w-xl text-base font-semibold text-snow-soft md:text-[19px] lg:mx-0 lg:text-[18px]"
            >
              Todo lo del plan Básico y además gestión de clientes e inventario, categorías con su propia
              página, barra promocional propia y herramientas de marketing. Sin comisiones por venta.
            </p>
            <div
              data-reveal
              className="mt-5 sm:mt-6 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center sm:gap-x-4 lg:justify-start"
            >
              <Button href={PREMIUM_LINK} external variant="inverse" size="lg" className="w-full max-w-xs sm:w-auto">
                Suscribirme a Premium
              </Button>
              <Button href="#premium" variant="outline" size="lg" className="w-full max-w-xs sm:w-auto">
                Ver las funciones
              </Button>
            </div>
            <ul
              data-reveal
              className="mt-4 sm:mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-sm font-semibold text-snow-soft lg:justify-start"
            >
              {["Sin comisiones", "Mínimo 3 meses", "Podés pasar desde el Básico"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Escena: el celular arranca arriba y lo corta el borde de abajo del panel (la escena toca el borde). */}
          <div
            className="relative mx-auto h-[27rem] w-full max-w-[34rem] overflow-hidden [--ancho-celu:14.5rem] md:h-[31rem] md:[--ancho-celu:16.5rem] lg:h-auto lg:max-w-none lg:[--ancho-celu:min(calc(var(--alto-panel)/1.8),calc((100vw-var(--gutter)*2-var(--inset-panel)*2-2.5rem)*0.366))]"
          >
            <div aria-hidden="true" className="absolute left-1/2 top-[3.5rem] -translate-x-1/2 md:top-[4rem] lg:left-[42%]">
              <TiendaCelular />
            </div>

            {/* Botón de WhatsApp de la tienda (vende por WhatsApp), pegado a la esquina del celular */}
            <span
              aria-hidden="true"
              className={`absolute bottom-4 left-[calc(50%+var(--ancho-celu)/2-3.6rem)] lg:left-[calc(42%+var(--ancho-celu)/2-3.6rem)] flex h-12 w-12 items-center justify-center rounded-full ${sombra}`}
            >
              <WhatsAppIcon circular className="h-12 w-12" />
            </span>

            <div aria-hidden="true">
              {/* Sin Lemora Ads */}
              <div
                data-flota
                className={`absolute left-0 top-[6%] flex items-center gap-2 rounded-2xl bg-night py-1.5 pl-1.5 pr-3 text-white ring-1 ring-white/15 ${sombra} md:left-[2%] md:gap-2.5 md:py-2 md:pl-2 md:pr-4 lg:left-auto lg:right-0 lg:top-[27%]`}
              >
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-accent text-ink md:h-8 md:w-8">
                  <Tick className="h-4 w-4" tone="text-ink" />
                </span>
                <span className="whitespace-nowrap text-[11px] font-bold md:text-sm">Sin Lemora Ads</span>
              </div>

              {/* Oferta con contador */}
              <div data-flota className={`absolute right-0 top-[3%] w-[10.6rem] rounded-2xl bg-white p-2 text-ink md:right-[2%] md:w-[14rem] md:p-2.5 lg:left-0 lg:right-auto lg:top-[4%] ${sombra}`}>
                <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.02em] md:text-[11px]">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v5.4l3.6 2.1-1 1.6L11 13V7h2Z" />
                  </svg>
                  Oferta por tiempo limitado
                </p>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {[
                    [dias, "DÍAS"],
                    [horas, "HORAS"],
                    [minutos, "MIN"],
                    [segundos, "SEG"],
                  ].map(([v, et]) => (
                    <div key={et} className="flex flex-col items-center justify-center rounded-lg py-1 ring-1 ring-[#E6E2F0]">
                      <b className="text-[15px] leading-none tabular-nums md:text-[17px]">{dos(v)}</b>
                      <span className="mt-0.5 text-[7px] text-ink-muted md:text-[8px]">{et}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notificación de confianza */}
              <div
                data-flota
                className={`absolute bottom-[26%] left-0 hidden w-[13.4rem] items-stretch overflow-hidden rounded-2xl bg-white text-ink sm:flex md:left-[1%] lg:left-0 ${sombra}`}
              >
                <img src={fotoAviso} alt="" className="w-14 flex-none object-cover" />
                <div className="flex-1 px-2.5 py-2 leading-snug">
                  <p className="text-[11px]">
                    Alguien en <b>tu zona</b> ya compró este artículo
                  </p>
                  <p className="mt-0.5 text-[10px] font-bold">Remera oliva</p>
                </div>
              </div>

              {/* Pedido por WhatsApp */}
              <div
                data-flota
                className={`absolute right-0 top-[44%] hidden items-center gap-2.5 rounded-2xl bg-white p-2.5 pr-3 text-ink sm:flex md:right-[1%] lg:bottom-[12%] lg:right-0 lg:top-auto ${sombra}`}
              >
                <WhatsAppIcon className="h-9 w-9 flex-none" />
                <span className="min-w-0">
                  <span className="block text-xs font-bold">WhatsApp</span>
                  <span className="block whitespace-nowrap text-[11px] text-ink-muted">Nuevo pedido</span>
                </span>
                <span className="self-start text-[10px] text-ink-muted">ahora</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
