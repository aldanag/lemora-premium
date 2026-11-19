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
    mensual: 9000,
    anual: 96000,
    commitment: "Contratación mínima: 1 mes",
    features: [
      "Cargá productos o servicios ilimitados",
      "Gestión de pedidos",
      "Carrusel de hasta 8 imágenes",
      "3 banners promocionales",
      "Página de contacto con formulario y mapa",
      "Agregar a favoritos",
      "Preguntas frecuentes",
      "Reseñas de clientes",
      "Cupones y descuentos automáticos",
      "Ventana emergente al salir",
      "Incluye Lemora Ads en barra promocional",
    ],
  },
  {
    name: "Premium",
    crown: true,
    mensual: 15000,
    anual: 160000,
    commitment: "Contratación mínima: 3 meses",
    intro: "Todo lo del plan Básico y además:",
    features: [
      { text: "Carrusel de hasta 12 imágenes", strong: "12 imágenes" },
      { text: "5 banners promocionales", strong: "5" },
      { text: "Gestión de inventario por categorías", isNew: true },
      { text: "Panel para gestión de clientes", isNew: true },
      { text: "Nuevo menú por categorías", isNew: true },
      { text: "Página dedicada para cada categoría", isNew: true },
      { text: "Barra promocional con tus propios mensajes, sin Lemora Ads", isNew: true },
    ],
  },
]
