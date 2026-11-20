import { useEffect, useState } from "react"
import logo from "../assets/lemora-logo.svg"
import logoClaro from "../assets/lemora-logo-claro.svg"
import Button from "./Button"
import { PREMIUM_LINK } from "../lib/planes"

const defaultLinks = [
  { label: "Funciones", href: "#premium" },
  { label: "Precio", href: "#precio" },
  { label: "Cómo empezar", href: "#como-empezar" },
  { label: "Preguntas", href: "#faq" },
]

export default function Nav({ links = defaultLinks, logoHref = "#top" }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-[var(--gutter)] z-50 px-[var(--gutter)]">
      <div
        className={`relative mx-auto flex items-center justify-between gap-4 rounded-full py-2 ring-1 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
          scrolled
            ? "max-w-4xl bg-white pl-4 pr-2 shadow-lg shadow-black/30 ring-ink/5 md:pl-6"
            : "max-w-[calc(112rem-2.5rem)] bg-transparent px-5 shadow-none ring-transparent md:px-[var(--inset-panel)]"
        }`}
      >
        <a href={logoHref} className={`flex-none rounded-lg ${scrolled ? "focus-ring" : "focus-ring-inverse"}`}>
          <img
            src={scrolled ? logo : logoClaro}
            alt="Lemora"
            className={`w-auto transition-[height] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] motion-reduce:transition-none ${
              scrolled
                ? "h-[18px] min-[340px]:h-[21.6px] md:h-[28.8px]"
                : "h-5 min-[340px]:h-6 md:h-8"
            }`}
          />
        </a>

        <nav aria-label="Principal" className="hidden md:absolute md:left-1/2 md:block md:-translate-x-1/2">
          <ul className="flex items-center gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative rounded text-sm font-medium transition after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:transition-transform after:duration-300 hover:after:scale-x-100 motion-reduce:after:transition-none ${
                    scrolled
                      ? "text-ink-soft hover:text-ink focus-ring after:bg-primary"
                      : "text-snow-soft hover:text-white focus-ring-inverse after:bg-lavender"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          href={PREMIUM_LINK}
          external
          variant={scrolled ? "dark" : "inverse"}
          size="sm"
          className="flex-none max-[359px]:px-3 max-[359px]:text-[13px]"
        >
          Suscribirme<span className="max-[339px]:hidden">&nbsp;a Premium</span>
        </Button>
      </div>
    </header>
  )
}
