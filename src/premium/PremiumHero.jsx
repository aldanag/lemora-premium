import { useEffect, useRef, useState } from "react"
import { gsap, REDUCED_MOTION_OFF, useGSAP, useReveal } from "../lib/motion"
import Button from "../components/Button"
import CrownIcon from "../components/CrownIcon"
import Tick from "../components/Tick"
import WhatsAppIcon from "../components/WhatsAppIcon"
import { PREMIUM_LINK } from "../lib/planes"
import manoCelular from "../assets/hero/mano-celular.webp"
import badgeBF from "../assets/premium-overlays/badge-bf.svg"
import badgeCM from "../assets/premium-overlays/badge-cm.svg"
import badgeHS from "../assets/premium-overlays/badge-hs.svg"
import fotoAviso from "../assets/premium-overlays/aviso-producto.jpg"
import { ETIQUETA_ICONO } from "../lib/pastillas"
import TiendaPantalla from "./TiendaPantalla"

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

// El celular de las imágenes Premium (marco violeta oscuro, hora 9:41, isla, barra promocional, «TU TIENDA», la foto y
// los productos). Es más alto que el espacio visible: lo corta el borde de abajo del panel.
// Celular sostenido por una mano (el mockup trae la pantalla transparente: detrás va la tienda dibujada en TiendaPantalla, que se edita en tiendaHero.js).
// El celular mide 39,1 % del ancho de la imagen, así que la imagen se dimensiona desde --ancho-celu; la pantalla está en
// 31,5 % / 20,3 % con 37,1 % x 59,4 % de la imagen. El marco del celular arranca al 19,35 % del alto: se sube esa parte
// para que el celular quede donde estaba el anterior (el resto de la mano lo corta el borde de abajo de la escena).
// Contenido del aviso de confianza (el mismo se usa en la escena y, en escritorio, alineado con las otras tarjetas).
function AvisoContenido() {
  return (
    <>
        <img src={fotoAviso} alt="" className="w-14 flex-none object-cover" />
        <div className="flex-1 px-2.5 py-2 leading-snug">
          <p className="text-[11px]">
            Alguien en <b>tu zona</b> ya compró este artículo
          </p>
          <p className="mt-0.5 text-[10px] font-bold">Remera oliva</p>
        </div>
    </>
  )
}

// Contenido de la tarjeta «Oferta por tiempo limitado» (la misma se usa en la escena y, en escritorio, pegada al celular).
function OfertaContenido({ tiempo }) {
  const dos = (n) => String(n).padStart(2, "0")
  const [dias, horas, minutos, segundos] = tiempo
  return (
    <>
        <p className="flex items-center gap-1.5 whitespace-nowrap text-[10px] font-bold uppercase leading-none tracking-[0.02em]">
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
              <span className="mt-0.5 text-[8px] text-ink-muted">{et}</span>
            </div>
          ))}
        </div>
    </>
  )
}

function CelularMano({ tiempo }) {
  return (
    <div
      className="relative"
      style={{ width: "calc(var(--ancho-celu) / 0.391)", aspectRatio: "1418 / 1892", marginTop: "calc(var(--ancho-celu) * -0.66)" }}
    >
      {/* Contraluz: un halo violeta detrás del celular y la mano, para que la silueta oscura se despegue del fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: "20%",
          top: "10%",
          width: "60%",
          height: "74%",
          background: "radial-gradient(closest-side, rgba(108,79,212,0.55), rgba(84,70,220,0.26) 45%, rgba(84,70,220,0) 100%)",
          filter: "blur(14px)",
        }}
      />
      <TiendaPantalla />
      {/* Barra de estado del celular: hora, señal y batería (la isla viene dibujada en la imagen de la mano, encima de esta barra) */}
      <div
        aria-hidden="true"
        className="absolute flex items-center justify-between bg-white font-extrabold leading-none text-ink"
        style={{ left: "31.5%", top: "20.3%", width: "37.1%", height: "4.4%", borderRadius: "11% 11% 0 0 / 72% 72% 0 0", padding: "0 calc(var(--ancho-celu) * 0.075) 0 calc(var(--ancho-celu) * 0.085)", fontSize: "calc(var(--ancho-celu) * 0.042)" }}
      >
        <span>9:41</span>
        <span className="flex items-center" style={{ gap: "calc(var(--ancho-celu) * 0.016)" }}>
          <svg viewBox="0 0 17 11" fill="currentColor" style={{ height: "calc(var(--ancho-celu) * 0.036)", width: "auto" }}>
            <rect x="0" y="7.5" width="3" height="3.5" rx="0.8" />
            <rect x="4.6" y="5" width="3" height="6" rx="0.8" />
            <rect x="9.2" y="2.5" width="3" height="8.5" rx="0.8" />
            <rect x="13.8" y="0" width="3" height="11" rx="0.8" />
          </svg>
          <svg viewBox="0 0 24 18" fill="none" style={{ height: "calc(var(--ancho-celu) * 0.036)", width: "auto" }}>
            <path d="M12 16.2 9.4 13.4a3.7 3.7 0 0 1 5.2 0L12 16.2Z" fill="currentColor" />
            <path d="M5.6 9.6a9.1 9.1 0 0 1 12.8 0M2 5.8a14.2 14.2 0 0 1 20 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <svg viewBox="0 0 26 12" fill="none" style={{ height: "calc(var(--ancho-celu) * 0.036)", width: "auto" }}>
            <rect x="0.7" y="0.7" width="21.6" height="10.6" rx="3" stroke="currentColor" strokeWidth="1.4" />
            <rect x="2.8" y="2.8" width="17.4" height="6.4" rx="1.6" fill="currentColor" />
            <rect x="23.4" y="4" width="2" height="4" rx="1" fill="currentColor" />
          </svg>
        </span>
      </div>
      <img src={manoCelular} alt="" width="1100" height="1468" className="absolute inset-0 h-full w-full" style={{ filter: "drop-shadow(0 0 0.9rem rgba(145,130,255,0.4))" }} />
      {/* Escritorio: tres tarjetas alineadas a la izquierda del celular (aviso, carteles de promoción y oferta). Los carteles
          y la oferta se unen con rectas punteadas, como en las imágenes del plan, a un aro sobre el cartel del primer
          producto y sobre el producto. Las medidas van en % de la imagen de la mano (1418 x 1892 px) y se mueven con el celular. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
        <svg viewBox="0 0 1418 1892" fill="none" className="absolute inset-0 h-full w-full overflow-visible">
          <g stroke="#b9afff" strokeWidth="5" strokeLinecap="round" strokeDasharray="0.1 14">
            <path d="M 409 987 H 490" />
            <path d="M 409 1090 H 490" />
          </g>
          <g fill="#fff" stroke="#7c5cf0" strokeWidth="5">
            <circle cx="500" cy="987" r="11" />
            <circle cx="500" cy="1090" r="11" />
          </g>
        </svg>
        <div className="absolute right-[71.2%] top-[29.6%] flex w-[12.4rem] items-stretch overflow-hidden rounded-2xl bg-white text-ink shadow-xl shadow-black/30">
          <AvisoContenido />
        </div>
        <div className="absolute right-[71.2%] top-[45.4%] w-[12.4rem] rounded-2xl bg-white p-2 text-ink shadow-xl shadow-black/30">
          <p className="whitespace-nowrap text-[10px] font-bold uppercase leading-none tracking-[0.02em]">Promociones especiales</p>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {[
              [badgeBF, "Black Friday"],
              [badgeHS, "Hot Sale"],
              [badgeCM, "CyberMonday"],
            ].map(([img, nombre]) => (
              <div key={nombre} className="flex flex-col items-center justify-center rounded-lg px-0.5 py-1 ring-1 ring-[#E6E2F0]">
                <img src={img} alt="" className="h-6 w-full object-contain" />
                <span className="mt-0.5 whitespace-nowrap text-[8px] font-semibold leading-none text-ink-muted">{nombre}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-[71.2%] top-[54.7%] w-[12.4rem] rounded-2xl bg-white p-2 text-ink shadow-xl shadow-black/30">
          <OfertaContenido tiempo={tiempo} />
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

  return (
    <section id="top" ref={root} className="mx-auto max-w-[112rem] px-[var(--gutter)] pb-16 pt-[calc(var(--gutter)*2+var(--menu-h))] md:pb-24">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#1a1452_0%,#0f0c37_55%,#080620_100%)] ring-1 ring-white/10 md:rounded-[2.5rem]">
        {/* Fondo: puntitos que se desvanecen hacia el texto y dos resplandores (azul frío arriba a la izquierda, violeta detrás del celular) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(#b8b0ff_1px,transparent_1.4px)] [background-size:22px_22px] [mask-image:linear-gradient(100deg,transparent_30%,#000_75%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-[#3a46d8]/25 blur-[90px]"
        />
        <div className="relative grid items-stretch gap-8 px-5 pt-10 md:px-[var(--inset-panel)] md:pt-14 lg:[--alto-panel:36rem] lg:min-h-[var(--alto-panel)] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-0">

          {/* Texto: un solo ritmo de espacios (título 16, bajada 12, botones 24, tildes 20). */}
          <div className="text-center lg:self-center lg:text-left">
            <span
              data-reveal
              className={ETIQUETA_ICONO}
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
            className="relative mx-auto h-[27rem] w-full max-w-[34rem] overflow-x-visible overflow-y-clip [--ancho-celu:14.5rem] md:h-[31rem] md:[--ancho-celu:16.5rem] lg:h-auto lg:max-w-none lg:[--ancho-celu:min(calc(var(--alto-panel)/1.8),calc((100vw-var(--gutter)*2-var(--inset-panel)*2-2.5rem)*0.366))]"
          >
            {/* Escenario: discos concéntricos detrás del celular, para dar profundidad y que la mano se despegue del fondo */}
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[44%] aspect-square -translate-x-1/2 -translate-y-1/2 lg:left-[42%]" style={{ width: "calc(var(--ancho-celu) * 2.7)" }}>
              <div className="absolute inset-0 rounded-full border border-white/[0.07]" />
              <div className="absolute inset-[13%] rounded-full border border-[#a79bff]/20" />
              <div className="absolute inset-[27%] rounded-full bg-[radial-gradient(closest-side,rgba(98,82,235,0.42),rgba(60,52,190,0.14)_70%,transparent)] ring-1 ring-[#a79bff]/25" />
            </div>

            <div aria-hidden="true" className="absolute left-1/2 top-[6.75rem] -translate-x-1/2 md:top-[5.5rem] lg:left-[42%]">
              <CelularMano tiempo={[dias, horas, minutos, segundos]} />
            </div>

            <div aria-hidden="true">
              {/* Sin Lemora Ads */}
              <div
                data-flota
                className={`absolute left-0 top-[6%] flex items-center gap-2 rounded-2xl bg-night py-1.5 pl-1.5 pr-3 text-white ring-1 ring-white/15 ${sombra} md:left-[2%] md:gap-2.5 md:py-2 md:pl-2 md:pr-4 lg:left-auto lg:right-0 lg:top-[5%] xl:top-[24%]`}
              >
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-accent text-ink md:h-8 md:w-8">
                  <Tick className="h-4 w-4" tone="text-ink" />
                </span>
                <span className="whitespace-nowrap text-[11px] font-bold md:text-sm">Sin Lemora Ads</span>
              </div>

              {/* Oferta con contador: en escritorio va pegada al celular (ver CelularMano) */}
              <div data-flota className={`absolute bottom-[3%] left-0 w-[10.6rem] rounded-2xl bg-white p-2 text-ink md:left-[6%] md:w-[14rem] md:p-2.5 xl:hidden ${sombra}`}>
                <OfertaContenido tiempo={[dias, horas, minutos, segundos]} />
              </div>

              {/* Notificación de confianza */}
              <div
                data-flota
                className={`absolute bottom-[26%] left-0 hidden w-[13.4rem] items-stretch overflow-hidden rounded-2xl bg-white text-ink sm:flex md:-left-8 md:bottom-[40%] lg:hidden ${sombra}`}
              >
                <AvisoContenido />
              </div>

              {/* Pedido por WhatsApp */}
              <div
                data-flota
                className={`absolute right-0 top-[44%] hidden items-center gap-2.5 rounded-2xl bg-white p-2.5 pr-3 text-ink sm:flex md:-right-6 lg:bottom-[12%] lg:right-0 lg:top-auto ${sombra}`}
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
