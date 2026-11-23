import tienda from "./tiendaHero"

// Pantalla de la tienda dentro del celular del hero. Está dibujada con HTML (no es una captura), así que todo se edita en
// tiendaHero.js. Todas las medidas van en cqw (1 cqw = 1 % del ancho de la pantalla): la tienda escala con el celular.
// El alto de arriba (16,4 cqw) queda libre para la barra de estado que dibuja el hero (hora, señal, batería).

const Lupa = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-[5.2cqw] w-[5.2cqw]" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2.6" />
    <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
)
const Corazon = ({ className = "h-[5.2cqw] w-[5.2cqw]" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.6 4.5c2 0 3.5 1 5.4 3 1.9-2 3.4-3 5.4-3 3.6 0 5.7 3.8 4.2 7.3C19.5 16.4 12 21 12 21Z" />
  </svg>
)
const Carrito = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[5.2cqw] w-[5.2cqw]" aria-hidden="true">
    <path d="M3 4h2.6l.5 2H21l-2 8H8L5.4 4H3Zm5.5 15a1.7 1.7 0 1 0 0 .01Zm9 0a1.7 1.7 0 1 0 0 .01Z" />
  </svg>
)
const Menu = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-[5.2cqw] w-[5.2cqw]" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
  </svg>
)

export default function TiendaPantalla() {
  const t = tienda
  const pista = [...t.mensajes, ...t.mensajes]

  return (
    <div
      className="absolute overflow-hidden bg-white text-[var(--oscuro)] [container-type:inline-size]"
      style={{
        left: "31.3%",
        top: "20.1%",
        width: "37.5%",
        height: "59.8%",
        borderRadius: "11% / 5.3%",
        "--acento": t.acento,
        "--oscuro": t.oscuro,
      }}
    >
      <div style={{ height: "16.4cqw" }} />

      {/* Barra promocional */}
      <div className="flex h-[8.4cqw] items-center overflow-hidden bg-[var(--oscuro)] text-white">
        <div className="marquee-pista flex w-max flex-none items-center gap-[7cqw] whitespace-nowrap pr-[7cqw] text-[3.3cqw] font-bold">
          {pista.map((m, i) => (
            <span key={i} className="flex flex-none items-center gap-[7cqw]">
              {m}
              <span className="h-[1.1cqw] w-[1.1cqw] rounded-full bg-white/40" />
            </span>
          ))}
        </div>
      </div>

      {/* Cabecera: logo (o nombre) y accesos */}
      <div className="flex h-[15cqw] items-center justify-between px-[5cqw]">
        {t.logo ? (
          <img src={t.logo} alt={t.nombre} className="h-[8.4cqw] w-auto max-w-[44cqw] object-contain object-left" />
        ) : (
          <span className="text-[4.8cqw] font-extrabold tracking-[-0.01em]">{t.nombre}</span>
        )}
        <span className="flex items-center gap-[3.8cqw]">
          <Lupa />
          <Corazon />
          <span className="relative">
            <Carrito />
            <span className="absolute -right-[1.8cqw] -top-[1.8cqw] flex h-[3.6cqw] w-[3.6cqw] items-center justify-center rounded-full bg-[var(--acento)] text-[2.3cqw] font-bold leading-none text-white">
              2
            </span>
          </span>
          <Menu />
        </span>
      </div>

      {/* Portada: texto centrado, flechas y puntitos del carrusel, como en la tienda real */}
      <div className="relative mx-[4cqw] h-[66cqw] overflow-hidden rounded-[4.4cqw]">
        <img src={t.portada} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className={`absolute inset-0 ${t.titulo ? "bg-[linear-gradient(180deg,rgba(10,8,40,0.05)_25%,rgba(10,8,40,0.8)_100%)]" : "bg-[linear-gradient(180deg,transparent_70%,rgba(10,8,40,0.35)_100%)]"}`} />
        {t.titulo && (
          <div className="absolute inset-x-0 bottom-[8.5cqw] flex flex-col items-center px-[11cqw] text-center">
            {t.etiqueta && (
              <span className="mb-[2.2cqw] inline-block rounded-full bg-white/90 px-[2.8cqw] py-[1cqw] text-[2.7cqw] font-bold uppercase tracking-[0.06em] text-[var(--oscuro)]">
                {t.etiqueta}
              </span>
            )}
            <p className="text-balance text-[6.2cqw] font-extrabold leading-[1.08] tracking-[-0.01em] text-white">{t.titulo}</p>
            <p className="mt-[1.6cqw] text-balance text-[3.3cqw] font-medium leading-[1.3] text-white/85">{t.bajada}</p>
          </div>
        )}
        {[
          ["left-[2.4cqw]", "M14.5 5.5 8 12l6.5 6.5"],
          ["right-[2.4cqw]", "m9.5 5.5 6.5 6.5-6.5 6.5"],
        ].map(([lado, d]) => (
          <span key={lado} className={`absolute top-1/2 ${lado} flex h-[7.4cqw] w-[7.4cqw] -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white`}>
            <svg viewBox="0 0 24 24" fill="none" className="h-[4.2cqw] w-[4.2cqw]" aria-hidden="true">
              <path d={d} stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ))}
        <div className="absolute inset-x-0 bottom-[3.2cqw] flex justify-center gap-[1.5cqw]">
          <span className="h-[1.7cqw] w-[6cqw] rounded-full bg-white" />
          {[0, 1].map((i) => (
            <span key={i} className="h-[1.7cqw] w-[1.7cqw] rounded-full bg-white/55" />
          ))}
        </div>
      </div>

      {/* Productos */}
      <div className="mt-[4.4cqw] grid grid-cols-2 gap-x-[3.4cqw] gap-y-[4cqw] px-[4cqw]">
        {t.productos.map((p, i) => (
          <div key={i}>
            <div className="relative">
              <img src={p.foto} alt="" className="aspect-[4/4.6] w-full rounded-[3.4cqw] object-cover" />
              {p.badge && <img src={p.badge} alt="" className="absolute left-[2.4cqw] top-[2.4cqw] w-[15cqw]" />}
              <span className="absolute right-[2.2cqw] top-[2.2cqw] flex h-[7cqw] w-[7cqw] items-center justify-center rounded-full bg-white text-[var(--oscuro)] shadow-sm">
                <Corazon className="h-[3.6cqw] w-[3.6cqw]" />
              </span>
            </div>
            <p className="mt-[1.8cqw] text-[3.5cqw] font-semibold leading-tight">{p.nombre}</p>
            <p className="mt-[0.6cqw] flex items-baseline gap-[1.6cqw] text-[3.6cqw] font-extrabold text-[var(--acento)]">
              {p.precio}
              {p.antes && <s className="text-[2.9cqw] font-medium text-[#8b86a3]">{p.antes}</s>}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
