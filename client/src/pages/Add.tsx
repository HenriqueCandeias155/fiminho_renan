/** Arquivo de Sessão — página de catalogação, pensada como uma ficha de cinemateca. */
import { ArrowLeft, BookOpen, CircleCheckBig, Plus } from "lucide-react";
import { Link, useLocation } from "wouter";
import { MovieForm } from "@/components/MovieForm";
import { Button } from "@/components/ui/button";

const heroImage = "/manus-storage/arquivo-sessao-hero_39c25070.jpg";

export default function Add() {
  const [, setLocation] = useLocation();

  return (
    <div className="page-enter px-5 py-7 sm:px-8 sm:py-10 xl:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/lista" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#315654] transition hover:text-[#D84A3B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D84A3B]">
            <ArrowLeft className="h-4 w-4" /> A minha estante
          </Link>
          <div className="hidden items-center gap-2 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-[#6A7169] sm:flex"><BookOpen className="h-3.5 w-3.5 text-[#D84A3B]" /> Nova ficha</div>
        </div>

        <section className="relative overflow-hidden border border-[#D6D0C4] bg-[#E9E2D5] shadow-[7px_7px_0_rgba(216,74,59,0.18)]">
          <img src={heroImage} alt="Rolo de película e itens de arquivo cinematográfico" className="absolute inset-0 h-full w-full object-cover opacity-55 mix-blend-multiply" />
          <div className="relative grid min-h-[235px] items-end gap-6 p-7 sm:min-h-[268px] sm:p-10 md:grid-cols-[1fr_auto]">
            <div className="max-w-xl">
              <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#D84A3B] pl-3 text-[0.65rem] font-extrabold uppercase tracking-[0.19em] text-[#3D514B]">Ficha de catalogação</p>
              <h1 className="font-display text-4xl leading-[0.95] tracking-tight text-[#20221E] sm:text-5xl">Acrescente uma história à sua estante.</h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-[#3D4742]">Preencha os dados essenciais para encontrar este filme quando chegar a próxima sessão.</p>
            </div>
            <div className="hidden border border-[#45625C]/35 bg-[#FFFDF8]/75 px-5 py-4 backdrop-blur-sm md:block">
              <div className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-[#53605A]">Persistência</div>
              <div className="mt-1 font-display text-xl text-[#143B3D]">Neste dispositivo</div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_252px]">
          <div className="border border-[#D6D0C4] bg-[#FFFDF8] p-5 shadow-[5px_5px_0_rgba(20,59,61,0.07)] sm:p-8">
            <div className="mb-8 flex items-start gap-4 border-b border-[#D6D0C4] pb-5">
              <span className="flex h-10 w-9 shrink-0 items-center justify-center border-l-4 border-[#D84A3B] bg-[#E8E0D3] text-[#143B3D]"><Plus className="h-4 w-4" /></span>
              <div><h2 className="font-display text-2xl text-[#20221E]">Dados do filme</h2><p className="mt-1 text-sm text-[#686860]">Os campos com asterisco formam o registo mínimo.</p></div>
            </div>
            <MovieForm onSaved={() => setLocation("/lista?adicionado=1")} />
          </div>

          <aside className="border-t-4 border-[#D84A3B] bg-[#143B3D] p-6 text-[#F9F4EA] xl:self-start">
            <CircleCheckBig className="h-6 w-6 text-[#E5A952]" />
            <h2 className="mt-5 font-display text-2xl leading-tight">Uma ficha, uma sessão.</h2>
            <p className="mt-3 text-sm leading-6 text-[#F9F4EA]/70">O catálogo usa o armazenamento local do seu navegador. Nada é enviado para um servidor.</p>
            <Button asChild variant="ghost" className="mt-6 h-auto rounded-none border-b border-[#E5A952] px-0 pb-1 text-xs font-bold uppercase tracking-[0.14em] text-[#E5A952] hover:bg-transparent hover:text-[#F9F4EA]"><Link href="/lista">Ver filmes guardados</Link></Button>
          </aside>
        </section>
      </div>
    </div>
  );
}
