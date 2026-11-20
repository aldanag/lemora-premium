import Nav from "./components/Nav"
import FAQ, { faqsDefault } from "./components/FAQ"
import TrialBanner from "./components/TrialBanner"
import Footer from "./components/Footer"
import FuncionesPremium from "./components/FuncionesPremium"
import PremiumHero from "./premium/PremiumHero"
import PremiumEjemplos from "./premium/PremiumEjemplos"
import PremiumPara from "./premium/PremiumPara"
import PremiumPrecio from "./premium/PremiumPrecio"
import PremiumPasos from "./premium/PremiumPasos"
import PremiumComparar from "./premium/PremiumComparar"

// Respuesta de la FAQ de la landing para la misma pregunta.
const comun = (q) => faqsDefault.find((f) => f.q === q).a

const faqs = [
  {
    q: "¿Qué suma el plan Premium?",
    a: "Todo lo del plan Básico y además: gestión de inventario por categorías, panel para gestión de clientes, menú y página propia para cada categoría, carrusel de hasta 12 imágenes, 5 banners promocionales y una barra promocional con tus propios mensajes, sin Lemora Ads.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: comun("¿Puedo cancelar cuando quiera?"),
  },
  {
    q: "Ya tengo el plan Básico: ¿puedo pasar a Premium?",
    a: "Sí. Podés hacerlo desde el panel de tu tienda, contactándonos, y actualizamos tu plan en el día.",
  },
  {
    q: "¿Necesito saber de programación?",
    a: comun("¿Necesito saber de programación?"),
  },
  {
    q: "¿Lemora cobra comisión por cada venta?",
    a: comun("¿Lemora cobra comisión por cada venta?"),
  },
  {
    q: "¿Cómo recibo los pedidos?",
    a: comun("¿Cómo recibo los pedidos?"),
  },
  {
    q: "¿Puedo usar mi propia marca?",
    a: comun("¿Puedo usar mi propia marca?"),
  },
  {
    q: "¿Qué medios de pago puedo usar?",
    a: comun("¿Qué medios de pago puedo usar?"),
  },
]

export default function PremiumApp() {
  return (
    <>
      <Nav />
      <main>
        <PremiumHero />
        <PremiumEjemplos />
        <FuncionesPremium />
        <PremiumPara />
        <PremiumPrecio />
        <PremiumPasos />
        <PremiumComparar />
        <TrialBanner />
        <FAQ faqs={faqs} />
      </main>
      <Footer />
    </>
  )
}
