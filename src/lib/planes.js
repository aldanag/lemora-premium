// Datos compartidos de los planes (precios, funciones y links) de la web Premium.

// Página con todos los planes (la landing de Lemora). TODO: cambiar a https://lemora.lat/#planes
// cuando lemora.lat sirva la landing.
export const LANDING_PLANES = "https://landing-lemora.vercel.app/#planes"

// El mes gratis es del plan Básico. Desde ahí se puede pasar a Premium en el día.
export const WHATSAPP_TRIAL_LINK =
  "https://wa.me/543515957014?text=Hola,%20quiero%20probar%20Lemora%20gratis"

// TODO: reemplazar por el link real de suscripción de MercadoPago del plan Premium.
export const PREMIUM_LINK = `https://wa.me/543515957014?text=${encodeURIComponent(
  "Hola, quiero contratar el plan Premium de Lemora",
)}`

export const BASICO_CHECKOUT_LINK =
  "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=d37372dd19924098bcfeb189bbb8fbcf"

// Los planes anuales todavía no tienen link de suscripción propio en MercadoPago:
// por ahora el botón abre un WhatsApp con el plan elegido.
// TODO: reemplazar por los links reales de suscripción anual.
export const anualLink = (plan) =>
  `https://wa.me/543515957014?text=${encodeURIComponent(`Hola, quiero contratar el plan ${plan} anual de Lemora`)}`

export const peso = (n) => `$${Math.round(n).toLocaleString("es-AR")}`

// Las funciones que se comparan entre planes van en el mismo orden en las dos listas
// (carrusel, banners y barra promocional); las exclusivas de Premium llevan isNew
// (resaltadas).
export const plans = [
  {
    name: "Básico",
    badge: "1 mes gratis",
    mensual: 12490,
    anual: 124900,
    commitment: "Contratación mínima: 1 mes",
    features: [
      "Cargá productos o servicios ilimitados",
      "Gestión de pedidos",
      "Estadísticas: ingresos, pedidos por estado, más vendidos y ventas por categoría",
      "Pagos en efectivo y por transferencia",
      "Carrusel de hasta 6 slides",
      "8 banners promocionales",
      "Página de contacto con formulario y mapa",
      "Agregar a favoritos",
      "Preguntas frecuentes",
      "Reseñas de clientes",
      "Cupones y descuentos automáticos",
      "Incluye Lemora Ads en barra promocional",
    ],
  },
  {
    name: "Premium",
    crown: true,
    mensual: 18990,
    anual: 189900,
    commitment: "Contratación mínima: 3 meses",
    intro: "Todo lo del plan Básico y además:",
    features: [
      { text: "Menú y página propia para cada categoría, con filtrador", isNew: true },
      { text: "Panel de clientes con pedidos confirmados, exportables", isNew: true },
      { text: "Inventario con edición rápida de stock", isNew: true },
      { text: "Gastos de gestión y envío gratis, por cantidad o por monto", isNew: true },
      { text: "Vendé mayorista o minorista, con compra mínima por monto o por cantidad", isNew: true },
      { text: "Mercado Pago y cuotas, además de efectivo y transferencia", isNew: true },
      { text: "Marketing: notificación de confianza, ofertas por tiempo limitado y promociones", isNew: true },
      { text: "Ventana emergente al salir, para quien deja su pedido sin terminar", isNew: true },
      { text: "Barra promocional con tus mensajes y tu color, sin Lemora Ads", isNew: true },
    ],
  },
]
