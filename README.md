# Lemora · plan Premium

Sitio del plan Premium de Lemora, en azul oscuro (modo oscuro). Sale de la misma estructura que la landing del plan Básico (`../web-basico`), pero se mantiene por separado. Es una página única que vive en la raíz (`/`).

Hecho con React 19, Vite, Tailwind CSS v4 y GSAP.

## Secciones

Portada · Funciones Premium (con las animaciones en vivo) · Todo lo del Básico · Precio · Cómo empezar · ¿Básico o Premium? · Antes de decidir (prueba del Básico) · Preguntas frecuentes · Pie

## Dónde está cada cosa

- Colores: `src/index.css` (`@theme`). Fondos `night`, `night-2`, `night-3`; textos `snow`, `snow-soft`, `snow-muted`.
- Textos de las funciones Premium: `src/lib/funcionesPremium.js`. Los marcados «propuesta» esperan aprobación.
- Imágenes de las funciones: `src/assets/premium/premium-1` a `premium-7` (se generan en la landing original con `herramientas/premium-imagenes/generar.py`). Las animaciones están en `src/components/*Animado.jsx` y su CSS en `src/index.css`.
- Precios y links: `src/lib/planes.js`. `PREMIUM_LINK` abre un WhatsApp; falta el link real de suscripción de MercadoPago (TODO).
- Tiendas Premium de ejemplo: todavía no hay. Cuando existan, se suma una sección como la de Tiendas de la landing original.

## Cómo correrla

```bash
npm install
npm run dev -- --port 5191
```

Con `?motion=on` en la dirección se fuerza el movimiento aunque el sistema tenga las animaciones apagadas.
