/** Arquivo de Sessão — página de estante que consulta e filtra filmes no localStorage. */
import { useEffect, useMemo, useState } from "react";
import { ArchiveX, Clapperboard, Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMovies, MOVIES_STORAGE_KEY, MOVIES_UPDATED_EVENT, removeMovie } from "@/lib/movieStorage";
import type { Movie } from "@/types/movie";

const shelfImage = "/manus-storage/arquivo-sessao-estante_62d82e7f.jpg";

export default function List() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useLocation();
  const [successVisible, setSuccessVisible] = useState(false);

  useEffect(() => {
    const refreshMovies = () => setMovies(getMovies());
    refreshMovies();
    window.addEventListener(MOVIES_UPDATED_EVENT, refreshMovies);
    window.addEventListener("storage", refreshMovies);
    return () => {
      window.removeEventListener(MOVIES_UPDATED_EVENT, refreshMovies);
      window.removeEventListener("storage", refreshMovies);
    };
  }, []);

  useEffect(() => {
    if (!location.includes("adicionado=1")) return;
    setSuccessVisible(true);
    const timeout = window.setTimeout(() => {
      setSuccessVisible(false);
      setLocation("/lista", { replace: true });
    }, 4200);
    return () => window.clearTimeout(timeout);
  }, [location, setLocation]);

  const filteredMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-PT");
    if (!normalizedQuery) return movies;
    return movies.filter((movie) => [movie.title, movie.genre, movie.director, String(movie.releaseYear)].some((field) => field.toLocaleLowerCase("pt-PT").includes(normalizedQuery)));
  }, [movies, query]);

  const handleDelete = (movie: Movie) => {
    const shouldDelete = window.confirm(`Remover “${movie.title}” da sua estante?`);
    if (!shouldDelete) return;
    removeMovie(movie.id);
  };

  return (
    <div className="page-enter px-5 py-7 sm:px-8 sm:py-10 xl:px-12">
      <div className="mx-auto max-w-6xl">
        {successVisible && <div role="status" className="mb-6 flex items-center justify-between gap-4 border border-[#9DB9A2] bg-[#E5F0E4] px-4 py-3 text-sm font-semibold text-[#214A38] shadow-[4px_4px_0_rgba(33,74,56,0.12)]"><span>O filme foi guardado na sua estante.</span><button onClick={() => setSuccessVisible(false)} className="grid h-6 w-6 place-items-center text-[#214A38] hover:bg-[#CFE2CD]" aria-label="Fechar aviso"><X className="h-4 w-4" /></button></div>}

        <section className="grid overflow-hidden border border-[#D6D0C4] bg-[#FFFCF5] md:grid-cols-[minmax(0,1fr)_275px]">
          <div className="p-6 sm:p-9">
            <p className="mb-4 inline-flex items-center gap-2 border-l-4 border-[#D84A3B] pl-3 text-[0.65rem] font-extrabold uppercase tracking-[0.19em] text-[#53605A]"><Clapperboard className="h-3.5 w-3.5" /> Coleção pessoal</p>
            <h1 className="font-display text-4xl leading-[0.95] tracking-tight text-[#20221E] sm:text-5xl">A minha estante.</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#64645C]">Uma coleção íntima, guardada neste navegador e pronta para a sua próxima sessão.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="border-l border-[#CFC8BB] pl-4"><strong className="font-display text-3xl leading-none text-[#143B3D]">{movies.length}</strong><span className="ml-2 text-[0.64rem] font-extrabold uppercase tracking-[0.15em] text-[#697068]">{movies.length === 1 ? "filme" : "filmes"}</span></div>
              <Button asChild className="h-11 rounded-none bg-[#D84A3B] px-4 font-bold text-white shadow-none hover:bg-[#BD352B] active:scale-[0.97]"><Link href="/adicionar"><Plus className="mr-2 h-4 w-4" /> Adicionar filme</Link></Button>
            </div>
          </div>
          <div className="relative min-h-40 overflow-hidden bg-[#143B3D] md:min-h-full"><img src={shelfImage} alt="Estante de uma videoteca" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[#143B3D]/35 mix-blend-multiply" /><span className="absolute bottom-5 left-5 border border-white/35 bg-[#143B3D]/75 px-2.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white">Desde o seu dispositivo</span></div>
        </section>

        <section className="mt-8">
          {movies.length > 0 && <div className="mb-6 flex flex-col gap-4 border-b border-[#CFC8BB] pb-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.17em] text-[#50635D]">Catálogo</p><h2 className="mt-1 font-display text-2xl text-[#20221E]">Filmes registados</h2></div><label className="relative block w-full sm:w-80"><span className="sr-only">Procurar filme</span><Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#67807A]" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 rounded-none border-[#CFC8BB] bg-[#FFFCF5] pl-10 text-sm shadow-none focus-visible:ring-[#D84A3B]/35" placeholder="Título, género ou realizador" /></label></div>}

          {movies.length === 0 ? <EmptyShelf /> : filteredMovies.length === 0 ? <NoResults onReset={() => setQuery("")} /> : <div className="grid gap-5 lg:grid-cols-2">{filteredMovies.map((movie, index) => <MovieCard key={movie.id} movie={movie} index={index} onDelete={handleDelete} />)}</div>}
        </section>
      </div>
    </div>
  );
}

function EmptyShelf() {
  return <div className="relative mx-auto max-w-4xl pt-4"><div className="absolute inset-x-7 bottom-0 top-8 border border-[#B7B0A4] bg-[#E9E1D4] shadow-[5px_5px_0_rgba(20,59,61,0.08)]" /><div className="absolute inset-x-3 bottom-2 top-4 border border-[#C8C0B3] bg-[#F1EADD]" /><div className="relative overflow-hidden border border-[#AFA899] bg-[#FFFCF5] px-6 pb-14 pt-12 text-center shadow-[7px_8px_0_rgba(20,59,61,0.12)]"><div className="absolute left-8 top-0 -translate-y-px border-x border-b border-[#AFA899] bg-[#D84A3B] px-4 py-2 text-[0.6rem] font-extrabold uppercase tracking-[0.17em] text-white">Ficha em branco</div><div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_30px,rgba(20,59,61,0.07)_31px,transparent_32px)] bg-[length:100%_32px] opacity-60" /><div className="relative mx-auto max-w-sm"><div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#D84A3B]/35 bg-[#FAE5E1] text-[#D84A3B]"><ArchiveX className="h-6 w-6" /></div><p className="mt-5 text-[0.63rem] font-extrabold uppercase tracking-[0.18em] text-[#61726C]">Divisória de estante</p><h2 className="mt-2 font-display text-3xl text-[#20221E]">A estante ainda está vazia.</h2><p className="mt-3 text-sm leading-6 text-[#686860]">Reserve a primeira ficha para o filme de que não quer perder o rasto.</p><Button asChild className="mt-6 h-11 rounded-none bg-[#D84A3B] px-5 font-bold text-white shadow-none hover:bg-[#BD352B]"><Link href="/adicionar"><Plus className="mr-2 h-4 w-4" /> Registar primeiro filme</Link></Button></div></div></div>;
}

function NoResults({ onReset }: { onReset: () => void }) {
  return <div className="border border-[#D6D0C4] bg-[#FFFCF5] px-6 py-14 text-center"><SlidersHorizontal className="mx-auto h-8 w-8 text-[#143B3D]" /><h2 className="mt-4 font-display text-2xl text-[#20221E]">Sem filmes nesta procura.</h2><p className="mt-2 text-sm text-[#686860]">Experimente outro título, género, ano ou realizador.</p><Button variant="ghost" onClick={onReset} className="mt-4 rounded-none border-b border-[#D84A3B] px-0 text-xs font-bold uppercase tracking-[0.12em] text-[#A82F27] hover:bg-transparent hover:text-[#D84A3B]">Limpar procura</Button></div>;
}
