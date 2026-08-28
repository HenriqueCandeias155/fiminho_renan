/** Arquivo de Sessão — camada de persistência local e eventos da coleção. */
import type { Movie, MovieDraft } from "@/types/movie";

export const MOVIES_STORAGE_KEY = "arquivo-de-sessao:filmes";
export const MOVIES_UPDATED_EVENT = "arquivo-de-sessao:atualizado";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getMovies(): Movie[] {
  if (!isBrowser()) return [];

  try {
    const storedMovies = window.localStorage.getItem(MOVIES_STORAGE_KEY);
    if (!storedMovies) return [];

    const movies = JSON.parse(storedMovies) as Movie[];
    return Array.isArray(movies) ? movies : [];
  } catch {
    return [];
  }
}

function saveMovies(movies: Movie[]) {
  window.localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(movies));
  window.dispatchEvent(new Event(MOVIES_UPDATED_EVENT));
}

export function addMovie(draft: MovieDraft): Movie {
  const movie: Movie = {
    ...draft,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  saveMovies([movie, ...getMovies()]);
  return movie;
}

export function removeMovie(id: string) {
  saveMovies(getMovies().filter((movie) => movie.id !== id));
}
