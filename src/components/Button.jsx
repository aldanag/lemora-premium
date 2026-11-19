// Único botón del sitio: variante = rol, tamaño = lugar donde vive. Todo pensado para fondos oscuros.
const base =
  "group/btn inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold text-center transition-[filter,background-color,scale] duration-200 focus-ring active:scale-[0.98] motion-reduce:transition-none"

const variants = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  // Secundario sobre oscuro: vidrio suave con borde fino.
  secondary: "bg-white/10 text-snow ring-1 ring-white/15 hover:bg-white/15",
  // El contraste fuerte: blanco con texto ink.
  light: "bg-white text-ink hover:bg-primary-tint focus-ring-dark",
  // Borde blanco sobre oscuro (el par del botón blanco).
  outline: "bg-transparent text-white ring-1 ring-white/70 hover:bg-white/10",
  // Oscuro: para el menú blanco.
  dark: "bg-ink text-white hover:bg-ink-soft",
  lime: "bg-lime text-ink hover:brightness-95 focus-ring-dark",
  chip: "gap-1.5 bg-white/10 text-snow hover:bg-white/15",
}

const sizes = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-2.5 text-[15px]",
  lg: "px-8 py-3 text-[15px]",
  chip: "px-3 py-1.5 text-[13px]",
}

export default function Button({
  href,
  external = false,
  variant = "primary",
  size,
  block = false,
  className = "",
  children,
  ...rest
}) {
  const resolvedSize = size ?? (variant === "chip" ? "chip" : "md")
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} ${variants[variant]} ${sizes[resolvedSize]} ${
        block ? "w-full" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}
