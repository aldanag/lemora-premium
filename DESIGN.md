# Lemora — ADN de marca y design system

Fuente de verdad para editar el sitio. Los tokens viven en `src/index.css` (`@theme`). Versión visual con previews: https://claude.ai/artifact/EAzESYDJeE51LPwRSSyt4C

## Tokens de color

| Token | Valor | Rol |
|---|---|---|
| `white` | #ffffff | Fondo de página y cards |
| `mist` | #efeafd | Fondos suaves, botón secundario |
| `lavender` | #b9abf0 | Superficies grandes sin texto: marcos de imagen y fondos decorativos |
| `lilac` | #e2d9ff | Bloques violetas con texto: cards de pasos, panel del plan Básico, llamados a la acción |
| `primary` | #6c4fd4 | Botón primario (texto blanco), íconos, links, corona |
| `primary-dark` | #5a3fc0 | Hover violeta |
| `primary-tint` | #ece8fb | Fondos suaves violeta |
| `lime` | #e3f547 | Tags (badges) y trazos curvos del Hero |
| `accent` | #ff9a52 | Ticks de listas y borde del plan Premium |
| `ink` | #17122F | Texto y bloques oscuros |
| `ink-soft` | #4f4a5e | Texto secundario (solo sobre white/mist) |
| `ink-muted` | #6b6679 | Texto apagado (solo sobre white/mist) |

Lemora es una tienda online por membresía para emprendedores de Latinoamérica: el cliente arma el pedido en la tienda y el emprendedor lo recibe directo en WhatsApp. La marca se siente joven, clara y sin vueltas. Usá este sistema para cualquier página, pieza o pantalla de Lemora.

## Fundamentos del contenido

- Escribí en español rioplatense con voseo: "Probá", "Empezá", "Vendé", "Tenés", "Pagás". Nunca "tú" ni formas de España ("añadir": usá "agregar").
- Los títulos son frases cortas que terminan en punto, a veces en dos oraciones: "Tu tienda online. Sin comisiones.", "Empezá gratis. Vendé desde hoy."
- Los botones usan el infinitivo y dicen qué pasa: "Probar gratis 1 mes", "Suscribirme". Sin signos de exclamación ni emojis.
- Solo afirmaciones verdaderas. Los datos que se pueden repetir: sin comisiones por venta, sin tarjeta para el mes de prueba, Básico $12.490/mes con contratación mínima de 1 mes, Premium $18.990/mes con contratación mínima de 3 meses, pedidos por WhatsApp, cobro por MercadoPago. No inventes cifras, calificaciones con estrellas ni cantidades de tiendas.
- Los testimonios son siempre reales, con nombre, rubro o tienda y foto si existe. Un testimonio pendiente va como lugar marcado con `[Completar]`, nunca con datos inventados.
- Evitá jerga técnica ("marquee", "popup", "slides") en textos nuevos: el carrusel se cuenta en "imágenes", no en "slides". Si un plan ya usa la jerga, se respeta.
- Pendiente de decidir: el mes gratis se nombra "1 mes" en botones y planes y "30 días" en el título del banner. Elegí una sola forma y usala en todo el sitio.

## Fundamentos visuales

- **Color.** Cada color tiene un rol. `primary` (violeta) en el botón primario con texto blanco, y también en íconos, links y la corona. `lime` (amarillo) en los tags (badges) y en los trazos curvos decorativos del Hero. `accent` (naranja) en los ticks de las listas y en el borde del plan Premium. `lavender` en superficies grandes sin texto y `lilac` en los bloques violetas con texto. `mist` en fondos de sección y botones secundarios. `ink` en texto y bloques oscuros. El fondo de página es `white`.
- **Texto sobre color.** Sobre `lilac`, `lavender`, `accent` y `lime` el texto va siempre en `ink`; sobre `lilac` también sirve `ink-soft` (6,3:1). `primary` y `ink-muted` no alcanzan contraste de texto sobre `lilac`. Sobre `primary` va siempre en blanco. `ink-soft` y `ink-muted` solo sobre `white` y `mist`. Nunca uses blanco sobre `accent`.
- **Tipografía.** Manrope en todo. Los títulos van apretados: H1 con `-0.035em` y H2 con `-0.03em` y `line-height` 1.1. El texto corrido en peso 400, las listas en 400 con la palabra clave en 700. Los badges van en mayúsculas con `0.09em` de espaciado.
- **Cajas.** Tres niveles de esquina: panel (`radius-panel`), card (`radius-card`) e interior (`radius-inner`). Botones, badges, menú y avatares en `radius-pill`. No mezcles esquinas dentro de un mismo nivel.
- **Anchos.** El Hero ocupa hasta 88rem. Las secciones de contenido ocupan 5xl (1024px). La sección de planes ocupa 3xl (768px) para que las cards midan unos 356px: cards angostas, texto a la izquierda y botones al ancho de la card.
- **Fondos de sección.** Alternalos con criterio: blanco, `mist`, panel `lilac`, bloque `ink`. No cortes la página en más de un banner oscuro seguido de otro color.
- **Sombras.** Solo `shadow-card` sobre fondos oscuros o de color, y `shadow-nav` en el menú contraído. Sin sombras duras desplazadas ni bordes laterales de color en las cards.
- **Menú.** Es una píldora blanca. Arriba del todo ocupa el ancho del Hero y sin sombra. Al scrollear se contrae a un ancho de 4xl y suma `shadow-nav`.
- **Foco.** Todo elemento interactivo usa un contorno sólido de 2px en `ink` con 2px de separación.
- **Movimiento.** Una sola entrada en el Hero: el título sube línea por línea y el resto aparece con un pequeño retraso. Las secciones aparecen una vez al entrar en pantalla (28px hacia arriba, 1s, curva `expo.out`). Con "reducir movimiento" activado no se anima nada y todo se ve.
- **Botones.** Un solo componente, con cuatro variantes por rol (`primary` violeta, `secondary` mist, `dark` ink, `chip`) y tres tamaños por lugar (`sm` menú, `md` cards, `lg` Hero). Peso 600 en todos, mismo hover y mismo foco. Detalle completo en el componente Button.
- **Botones apilados.** En una card, el botón principal (`primary`, violeta) va arriba y el secundario (`mist`) abajo, ambos al ancho de la card. El aviso "No te pedimos la tarjeta" va centrado justo sobre el botón de prueba.

## Iconografía

- Íconos SVG en línea, trazo de 2 a 2,5px con puntas redondeadas, sin librería ni fuente de íconos. Color `primary` sobre blanco; los ticks de listas van en `accent` (trazo de 3px).
- Los íconos en uso: check (listas), más y menos (acordeón), flecha, chat, ojo (Ver ejemplo) y corona rellena (Premium).
- La corona marca solo al plan Premium, al lado de su nombre. En las listas, las funciones exclusivas se distinguen en negrita y siempre con check.
- Sin emojis como decoración.

## Logo

El logo es el wordmark "Lemora" en letra cursiva, en un violeta (`#664FD3`) casi idéntico a `primary`. Es la versión provisoria hasta confirmar la definitiva. Usalo sobre `white` o `mist` y no lo recolorees. El archivo está en el grupo Logos de Assets.

## Imágenes

Las capturas del producto reales se muestran dentro de una card de `radius-card`, alineadas arriba. Hasta tener imágenes finales, los marcos de producto quedan como placeholders grises con un ícono de imagen.
- **Botón secundario.** Sobre fondos blancos o `mist` usa `secondary` (gris `mist` con borde fino). Sobre fondos de color (`lilac`, `lavender`) usa `tinted` (blanco con borde fino). No uses `secondary` sobre `lilac`: se apaga.


---

## Paleta en modo oscuro (web Premium)

Esta web usa la misma marca sobre fondos azules. Los tokens viven en `src/index.css` (`@theme`).

| Token | Valor | Rol |
|---|---|---|
| `night` | #17122F | Fondo de la página |
| `night-2` | #1F1842 | Paneles, tarjetas y pie |
| `night-3` | #2A2058 | Tarjetas elevadas |
| `snow` | #F4F1FF | Texto principal sobre oscuro |
| `snow-soft` | #DFD8F8 | Texto secundario sobre oscuro (bajadas): intermedio entre el lila y el blanco, 13.2:1 sobre `night` |
| `snow-mid` | #C3BAE7 | Intermedio entre `snow-soft` y `snow-muted`: preguntas sin abrir y textos de apoyo, 9.9:1 sobre `night` |
| `snow-muted` | #A79DD6 | Texto apagado sobre oscuro (metadatos), 7.2:1 sobre `night` |
| `marco-celu` | #3B3262 | Marco violeta oscuro de los celulares |
| `isla` | #0B0818 | Isla (notch) del celular |
| `lavender` | #B9ABF0 | Palabra que se escribe en la portada y acentos sobre oscuro |

Los bloques claros (lila, blanco) se conservan en Todo lo del Básico, Cómo empezar, el precio, la comparación y el banner, para no perder la identidad.

## Botones

`Button.jsx` es **idéntico** en la landing y en Premium: si cambia uno, se copia al otro. La variante es el rol; el tamaño, el lugar donde vive.

**Color según la superficie**

| Superficie | Principal | Secundario |
| --- | --- | --- |
| Blanco o `mist` | `primary` (violeta) | `secondary` (gris con borde fino) |
| Lila (`lilac`, `lavender`) o foto | `primary` | `tinted` (blanco con borde fino) |
| Oscuro (`ink`, `night`) | `inverse` (blanco). Nunca violeta | `outline` (borde blanco) |
| Menú | `dark` sobre la píldora blanca; `inverse` si el menú es transparente sobre oscuro | |

- `chip`: acción chica y discreta ("Ver ejemplo"), siempre sobre claro.
- Un solo botón principal por zona visible.

**Tamaños (alto fijo)**: `sm` 40 px (solo el menú), `md` 44 px, `lg` 52 px. El menú mide 56 px (`--menu-h`).

**Ancho del botón suelto y centrado**: `w-full max-w-xs sm:w-56`. Dentro de tarjetas angostas (planes), ancho completo (`block`). En la tarjeta ancha de precio, ancho completo solo en celular; desde `md` mide lo que pide su texto (`md:w-fit`), alineado a la izquierda, con 24 px de aire sobre el botón.

**Textos**: Básico "Probar gratis 1 mes" (menú: "Probar gratis"). Premium "Suscribirme a Premium" (plan anual: "Suscribirme al plan anual").

**Foco**: `focus-ring` (contorno `ink`) sobre claro y `focus-ring-inverse` (contorno `lavender`) sobre oscuro. Significan lo mismo en las dos webs y cada variante de `Button` trae el suyo.

**Otros controles**: `Segmented` (Mensual/Anual, Básico/Premium, Sin/Con Lemora; el activo cambia de color según la opción, igual en todos: la primera en tinta y las demás en violeta), `IconButton` (48 px, flechas del carrusel: blanco sobre oscuro) y `LinkTexto` (link subrayado; `suelto` mide 44 px de alto).


---

## Modo oscuro primero (decisión del 2026-11-23)

Toda pieza nueva (web Premium, banners, videos, historias, anuncios) se diseña **primero sobre el azul de marca** (`night` `#17122F`); la versión clara se deriva después y es una variante. Detalle completo en `marca/MARCA.md`, secciones 12 a 15, y dibujado en `marca/hoja-de-estilo-premium.html`.

- **Fondos:** `night` liso, o el panel degradé `linear-gradient(160deg, #1A1452 0%, #0F0C37 55%, #080620 100%)` cuando hay celular o escena. Es el único degradé permitido (profundidad, no decoración).
- **Botón principal:** blanco sobre azul; violeta solo sobre blanco o lila.

### Cómo combinar los colores sin perder la marca

La marca es flexible: una pieza se reconoce por la combinación. Alcanza con **dos de tres anclas**:

1. **El violeta**: resplandor, aros, botón o banner en `primary` / `glow` `#7C5CF0`.
2. **Un bloque claro**: tarjeta blanca o banner `lilac` dentro del azul.
3. **Un acento chico**: tilde `accent` o etiqueta `lime`, uno por pieza y nunca de fondo.

Siempre Manrope y el logo en blanco. Proporción de referencia en una pieza oscura: ~65 % azul, ~15 % violeta, ~15 % bloques claros, ≤5 % acentos. No usar otros azules o violetas fuera de la escalera, ni resplandores de otro color, ni más de un foco de luz por pieza.

Tokens que aparecen solo sobre oscuro (todavía no están en `@theme`, se usan como valores sueltos):

| Valor | Uso |
|---|---|
| `#7C5CF0` (`glow`) | Resplandor de banners y aros de las líneas punteadas |
| `#B9AFFF` (`punteado`) | Puntos de las líneas punteadas |
| `#A79BFF` | Borde fino del banner encendido (al 35 %) |
| `#FFF3C6` / `#241C1B` | Crema y su tinta, solo para el gancho de los videos |

## Elementos de Premium

Medidas y colores completos en `marca/MARCA.md`, sección 14. Resumen:

- **Contraluz y discos** detrás del celular con mano; un solo foco de luz por pieza.
- **Celular con mano** siempre cortado contra el borde de abajo del panel; pantalla dibujada en HTML (`TiendaPantalla.jsx`, contenido editable en `tiendaHero.js`).
- **Tarjetas flotantes**: blancas, **radio 12 px** (`rounded-xl`), sombra `shadow-xl shadow-black/30`, 12,4 rem de ancho; cuadritos interiores 8 px. Una columna a un lado del celular y WhatsApp del otro; "Sin Lemora Ads" arriba a la derecha.
- **Líneas punteadas con aro**: rectas, `stroke-dasharray: 0.1 14`, aro de radio 11 (relleno blanco, borde `#7C5CF0`).
- **Carteles de promoción** (Black Friday, Hot Sale, CyberMonday): SVG en `src/assets/premium-overlays/`.
- **Banner que se enciende** (`Cta` en `FuncionesPremium.jsx`): halo violeta detrás, 1 s, al llegar a la vista.
- **Alto del hero:** 31 rem en escritorio, igual que la landing principal y la página Básico. El celular escala por tramos (`--ancho-celu`: 14,5 rem, 15,5 rem y desde 2xl se mantiene) y las tarjetas conservan su tamaño.

## Movimiento (motion graphics)

GSAP (`src/lib/motion.js`) y CSS. Con "reducir movimiento" todo queda quieto y visible; `?motion=on` fuerza el movimiento para revisarlo.

| Efecto | Medida |
|---|---|
| Entrada de sección (`data-reveal`) | 28 px · 1 s · `expo.out` · escalonado 0,12 s · arranca al 88 % de la pantalla |
| Título que sube (`data-words`) | 0,9 s · `expo.out` · escalonado 0,06 s |
| Palabra que rota en el título | 0,9 s · `cubic-bezier(.19,1,.22,1)` · cada 2,6 s |
| Flotar (`data-flota`) | ±8 px · 2,8 s + 0,45 s por tarjeta · `sine.inOut` · ida y vuelta |
| Encender el halo del banner | Opacidad 0 → 1 en 1 s · `ease-out` |
| Marquesina de la barra promocional | `translateX(-50%)` · 18 s · lineal · infinita |
| Toque (tap) | Círculo violeta que se achica + dos ondas que se expanden; interacción con toques, no con mouse |

Reglas: un solo movimiento principal por escena; entrar subiendo, nunca girar ni rebotar; reposo = estado final legible. Importante: GSAP anula el `translate` de Tailwind en los elementos con `data-flota`, así que esos elementos se centran con `inset-x-0 mx-auto` y no con `-translate-x-1/2`.
