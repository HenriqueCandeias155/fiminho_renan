/** Arquivo de Sessão — modelo central da coleção de filmes. */
export type Movie = {
  id: string;
  title: string;
  genre: string;
  releaseYear: number;
  director: string;
  durationMinutes: number;
  classification?: string;
  synopsis?: string;
  posterUrl?: string;
  createdAt: string;
};

export type MovieDraft = Omit<Movie, "id" | "createdAt">;
