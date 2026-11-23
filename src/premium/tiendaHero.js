// Contenido de la tienda que se ve dentro del celular del hero de Premium (la dibuja TiendaPantalla.jsx).
// Todo lo que se ve se cambia desde acá: textos, colores, logo, imagen principal y productos.
//
// Para usar otras imágenes: poné el archivo en src/assets/hero/ (o pisá uno de los que ya están, con el mismo nombre)
// y importalo acá abajo. Medidas recomendadas:
//   logo        PNG/WebP/SVG con fondo transparente, ancho 400 px o más (si es null se escribe el nombre en texto)
//   portada     vertical o cuadrada, mínimo 900 x 900 px (si es horizontal se recorta a los costados)
//   productos   cuadradas, mínimo 420 x 420 px
import portada from "../assets/hero/tienda-foto.webp"
import remera from "../assets/hero/prod-remera.webp"
import short from "../assets/hero/prod-short.webp"
import badgeBF from "../assets/premium-overlays/badge-bf.svg"

const tienda = {
  // Marca
  nombre: "Tu tienda",
  logo: null, // ej.: import logo from "../assets/hero/logo.webp" y poner logo: logo
  acento: "#6c4fd4", // color de precios y detalles
  oscuro: "#14123a", // barra promocional y textos fuertes

  // Barra promocional de arriba
  mensajes: ["Envíos a todo el país", "3 cuotas sin interés", "Retiro gratis en local"],

  // Portada: foto con texto centrado encima. Para dejar solo la foto, borrá `titulo` y `bajada`.
  // `etiqueta` es opcional: una pastilla chica arriba del título (hoy sin usar).
  portada,
  titulo: "Básicos para todos los días",
  bajada: "Calidad que dura, precios que se animan.",

  // Productos (van directo debajo de la portada). `badge` es opcional (imagen del cartel de promoción); `antes` es el precio tachado.
  productos: [
    { nombre: "Remera básica", foto: remera, precio: "$14.900", antes: "$19.900", badge: badgeBF },
    { nombre: "Short de jean", foto: short, precio: "$22.500" },
    { nombre: "Remera oliva", foto: remera, precio: "$14.900" },
    { nombre: "Short clásico", foto: short, precio: "$21.000", antes: "$26.000" },
  ],
}

export default tienda
