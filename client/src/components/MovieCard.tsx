/** Arquivo de Sessão — ficha de estante para leitura rápida e gestão de cada filme. */
import { Clock3, Film, Trash2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Movie } from "@/types/movie";

type MovieCardProps = {
  movie: Movie;
  index: number;
  onDelete: (movie: Movie) => void;
};

export function MovieCard({ movie, index, onDelete }: MovieCardProps) {
  return (
    <article className="group relative overflow-hidden border border-[#D6D0C4] bg-[#FFFCF5] shadow-[6px_6px_0_rgba(20,59,61,0.09)] transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[8px_10px_0_rgba(20,59,61,0.13)]" style={{ animationDelay: `${index * 45}ms` }}>
      <div className="absolute left-0 top-0 h-full w-1 bg-[#D84A3B]" />
      <div className="flex min-h-[214px]">
        <div className="relative hidden w-[33%] shrink-0 overflow-hidden bg-[#143B3D] sm:block">
          {movie.posterUrl ? (
            <img src={movie.posterUrl} alt={`Cartaz de ${movie.title}`} className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />
          ) : null}
          <div className={`absolute inset-0 flex flex-col justify-end bg-[radial-gradient(circle_at_75%_18%,rgba(216,74,59,0.82)_0,rgba(216,74,59,0)_22%),linear-gradient(145deg,rgba(8,34,36,0.1),rgba(8,34,36,0.86))] p-4 ${movie.posterUrl ? "" : ""}`}>
            <Film className="h-8 w-8 text-[#E5A952]" />
            <span className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/65">Ficha {String(index + 1).padStart(2, "0")}</span>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-[0.63rem] font-extrabold uppercase tracking-[0.16em] text-[#D84A3B]">
                <span>{movie.genre}</span><span className="h-1 w-1 rounded-full bg-[#D84A3B]" /><span>{movie.releaseYear}</span>
              </div>
              <h2 className="font-display text-2xl leading-[1.05] text-[#20221E] sm:text-[1.7rem]">{movie.title}</h2>
            </div>
            {movie.classification && <span className="shrink-0 border border-[#BFC6BB] px-2 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.1em] text-[#49605A]">{movie.classification}</span>}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#5D625A]">
            <span className="flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5 text-[#143B3D]" />{movie.director}</span>
            <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-[#143B3D]" />{movie.durationMinutes} min</span>
          </div>

          {movie.synopsis ? <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#686860]">{movie.synopsis}</p> : <p className="mt-4 text-sm italic leading-6 text-[#8A877E]">Sem nota de sessão.</p>}

          <div className="mt-auto flex justify-end pt-5">
            <Button variant="ghost" onClick={() => onDelete(movie)} className="h-8 rounded-none px-2.5 text-xs font-semibold text-[#7E4139] hover:bg-[#FAE5E1] hover:text-[#9F2E25]" aria-label={`Remover ${movie.title}`}>
              <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Remover
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
