import { useRef, useState } from "react"
import { useReveal } from "../lib/motion"

// Respuestas comunes a todos los planes: se editan acá, en un solo lugar.
export const faqsDefault = [
  {
    q: "¿Necesito saber de programación?",
    a: "No. Configurás tu tienda desde un panel simple: sin código y sin depender de nadie. Te enseñamos con tutoriales simples, rápidos y súper fáciles cómo gestionar toda tu tienda.",
  },
  {
    q: "¿Cómo armo mi tienda?",
    a: "Desde nuestro panel, cargá toda la información de tu negocio, configurá si tu tienda será para vender productos u ofrecer servicios, cargalos y empezá a vender.",
  },
  {
    q: "¿Lemora cobra comisión por cada venta?",
    a: "No. Vos te quedás con el 100% de cada venta. Nuestras tiendas no incluyen plataformas de pago: tus clientes hacen su pedido o reserva en tu tienda, te llega directo a tu WhatsApp y vos decidís cómo cobrar.",
  },
  {
    q: "¿Cómo recibo los pedidos?",
    a: "Directo a tu WhatsApp, con todos los datos del cliente. Además, nuestro sistema almacena todos tus pedidos en tu tienda para que puedas gestionarlos vos mismo.",
  },
  {
    q: "¿Puedo usar mi propia marca?",
    a: "Por supuesto. Cargá tu marca y tus imágenes, y personalizá la tienda a tu estilo. Lemora tiene un alto nivel de personalización para las webs.",
  },
  {
    q: "¿Qué medios de pago puedo usar?",
    a: "El que vos quieras. Acá tu negocio toma el control, sin intermediarios: decidís cómo cobrar, en efectivo, por transferencia u otros medios de pago.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Si estás en el plan Básico, cancelás cuando quieras. Si elegís el plan Premium, tiene una contratación mínima de 3 meses y, pasado ese período, podés darte de baja cuando quieras.",
  },
]

// Botón + / −: círculo blanco que pasa a tinta al abrir.
function Signo({ open }) {
  return (
    <span
      className={`flex h-8 w-8 flex-none items-center justify-center rounded-full transition ${
        open ? "bg-primary text-white" : "bg-white/10 text-lavender"
      }`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
        <path
          d={open ? "M5 12h14" : "M12 5v14M5 12h14"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

// Formato nuevo: etiqueta lima y título a la izquierda, lista abierta con líneas a la derecha.
export default function FAQ({ faqs = faqsDefault }) {
  const root = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)
  useReveal(root)

  return (
    <section id="faq" ref={root} className="py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span
            data-reveal
            className="inline-block rounded-full bg-lime px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink sm:px-3 sm:text-[12.5px] sm:tracking-[0.09em]"
          >
            Preguntas frecuentes
          </span>
          <h2
            data-words
            className="mt-4 text-[clamp(25px,8.2vw,32px)] font-bold text-white md:text-[34px]"
          >
            ¿Tenés alguna duda?
          </h2>
          <p data-reveal className="mt-3 max-w-[40ch] text-balance text-base text-snow-soft">
            Lo que casi todos quieren saber antes de empezar.
          </p>
        </div>

        <div data-reveal className="flex flex-col divide-y divide-white/15 border-y border-white/15">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="group flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left focus-ring"
                >
                  <span
                    className={`text-base font-bold md:text-lg ${
                      isOpen ? "text-white" : "text-snow-muted group-hover:text-white"
                    }`}
                  >
                    {item.q}
                  </span>
                  <Signo open={isOpen} />
                </button>
                <div
                  id={`faq-${i}`}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[56ch] pb-5 text-[15px] leading-relaxed text-snow-soft">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
