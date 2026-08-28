/** Arquivo de Sessão — navegação lateral editorial e pontos de acesso principais. */
import { Clapperboard, Film, ListVideo, Plus } from "lucide-react";
import { Link, useLocation } from "wouter";

const logoUrl = "/manus-storage/arquivo-sessao-logo_ee72e17f.png";

const navigation = [
  { href: "/lista", label: "A minha estante", icon: ListVideo },
  { href: "/adicionar", label: "Adicionar filme", icon: Plus },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <aside className="relative flex w-full flex-col overflow-hidden bg-[#143B3D] px-5 pb-5 pt-5 text-[#F9F4EA] lg:sticky lg:top-0 lg:h-screen lg:w-[276px] lg:shrink-0 lg:px-7 lg:py-8">
      <div className="absolute inset-y-0 left-0 w-1.5 bg-[#D84A3B]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full border border-[#F9F4EA]/10" />
      <div className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 rounded-full border border-[#F9F4EA]/10" />

      <Link href="/lista" className="relative flex items-center gap-3 self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A952] focus-visible:ring-offset-4 focus-visible:ring-offset-[#143B3D]">
        <img className="h-14 w-14 object-contain" src={logoUrl} alt="Símbolo Arquivo de Sessão" />
        <span><span className="font-display block text-[1.45rem] leading-[0.85] tracking-tight">Arquivo<br />de Sessão</span><span className="mt-2 block text-[0.57rem] font-bold uppercase tracking-[0.2em] text-[#E5A952]">Cinemateca pessoal</span></span>
      </Link>

      <div className="relative mt-8 hidden items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-[#F9F4EA]/55 lg:flex">
        <span className="h-px w-7 bg-[#D84A3B]" /> Ficheiro 01
      </div>

      <nav className="relative mt-5 flex w-full gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible" aria-label="Navegação principal">
        {navigation.map(({ href, label, icon: Icon }) => {
          const active = location === href || (href === "/lista" && location === "/");
          return (
            <Link
              key={href}
              href={href}
              className={`group flex shrink-0 items-center gap-3 border px-3.5 py-3 text-sm font-semibold transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5A952] ${
                active
                  ? "border-[#E5A952] bg-[#E5A952] text-[#17383A]"
                  : "border-transparent text-[#F9F4EA]/80 hover:border-[#F9F4EA]/25 hover:bg-[#F9F4EA]/10 hover:text-[#F9F4EA]"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={2.2} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="relative mt-auto hidden border-t border-[#F9F4EA]/15 pt-6 lg:block">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full border border-[#F9F4EA]/25 text-[#E5A952]">
            <Film className="h-4 w-4" />
          </div>
          <p className="text-xs leading-5 text-[#F9F4EA]/65">Registe, organize e volte a cada sessão.</p>
        </div>
        <div className="mt-6 flex items-center gap-2 text-[0.63rem] font-bold uppercase tracking-[0.18em] text-[#F9F4EA]/45">
          <Clapperboard className="h-3.5 w-3.5" /> Local e privado
        </div>
      </div>
    </aside>
  );
}
