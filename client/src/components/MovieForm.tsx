/** Arquivo de Sessão — formulário reutilizável para catalogar uma nova obra cinematográfica. */
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Check, RotateCcw } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { addMovie } from "@/lib/movieStorage";
import type { MovieDraft } from "@/types/movie";

const currentYear = new Date().getFullYear();

const movieSchema = z.object({
  title: z.string().trim().min(2, "Indique um título com pelo menos 2 caracteres."),
  genre: z.string().trim().min(2, "Indique o género do filme."),
  releaseYear: z.coerce.number().int().min(1888, "Indique um ano válido.").max(currentYear + 5, "O ano indicado parece estar demasiado distante."),
  director: z.string().trim().min(2, "Indique o nome do realizador."),
  durationMinutes: z.coerce.number().int().min(1, "Indique a duração em minutos.").max(1000, "Indique uma duração válida."),
  classification: z.string().trim().max(20, "Use no máximo 20 caracteres.").optional().or(z.literal("")),
  synopsis: z.string().trim().max(650, "Use no máximo 650 caracteres.").optional().or(z.literal("")),
  posterUrl: z.string().trim().url("Introduza um endereço de imagem válido.").optional().or(z.literal("")),
});

type MovieFormInput = z.input<typeof movieSchema>;
type MovieFormValues = z.output<typeof movieSchema>;

const defaultValues: MovieFormValues = {
  title: "",
  genre: "",
  releaseYear: currentYear,
  director: "",
  durationMinutes: 90,
  classification: "",
  synopsis: "",
  posterUrl: "",
};

type MovieFormProps = {
  onSaved: () => void;
};

export function MovieForm({ onSaved }: MovieFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MovieFormInput, unknown, MovieFormValues>({
    resolver: zodResolver(movieSchema),
    defaultValues,
  });

  const onSubmit = (values: MovieFormValues) => {
    const draft: MovieDraft = {
      title: values.title.trim(),
      genre: values.genre.trim(),
      releaseYear: values.releaseYear,
      director: values.director.trim(),
      durationMinutes: values.durationMinutes,
      classification: values.classification?.trim() || undefined,
      synopsis: values.synopsis?.trim() || undefined,
      posterUrl: values.posterUrl?.trim() || undefined,
    };

    addMovie(draft);
    onSaved();
    reset(defaultValues);
  };

  const fieldClass = (hasError?: boolean) => `h-12 rounded-none border bg-[#FFFCF5] px-3.5 text-sm shadow-none transition focus-visible:ring-2 focus-visible:ring-[#D84A3B]/35 ${hasError ? "border-[#D84A3B]" : "border-[#CFC8BB] focus-visible:border-[#143B3D]"}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <div className="grid gap-x-5 gap-y-6 md:grid-cols-2">
        <Field label="Título" required error={errors.title?.message}>
          <Input id="title" className={fieldClass(Boolean(errors.title))} placeholder="Ex.: Parasitas" {...register("title")} />
        </Field>
        <Field label="Género" required error={errors.genre?.message}>
          <Input id="genre" className={fieldClass(Boolean(errors.genre))} placeholder="Ex.: Drama, thriller" {...register("genre")} />
        </Field>
        <Field label="Ano de estreia" required error={errors.releaseYear?.message}>
          <Input id="releaseYear" type="number" min="1888" max={currentYear + 5} className={fieldClass(Boolean(errors.releaseYear))} {...register("releaseYear")} />
        </Field>
        <Field label="Realizador" required error={errors.director?.message}>
          <Input id="director" className={fieldClass(Boolean(errors.director))} placeholder="Ex.: Bong Joon-ho" {...register("director")} />
        </Field>
        <Field label="Duração (minutos)" required error={errors.durationMinutes?.message}>
          <Input id="durationMinutes" type="number" min="1" className={fieldClass(Boolean(errors.durationMinutes))} {...register("durationMinutes")} />
        </Field>
        <Field label="Classificação etária" error={errors.classification?.message}>
          <Input id="classification" className={fieldClass(Boolean(errors.classification))} placeholder="Ex.: M/14" {...register("classification")} />
        </Field>
        <Field label="Imagem do cartaz" error={errors.posterUrl?.message} className="md:col-span-2">
          <Input id="posterUrl" type="url" className={fieldClass(Boolean(errors.posterUrl))} placeholder="https://exemplo.com/cartaz.jpg" {...register("posterUrl")} />
        </Field>
        <Field label="Sinopse" error={errors.synopsis?.message} className="md:col-span-2">
          <Textarea id="synopsis" className={`min-h-32 resize-y rounded-none border bg-[#FFFCF5] px-3.5 py-3 text-sm shadow-none transition focus-visible:ring-2 focus-visible:ring-[#D84A3B]/35 ${errors.synopsis ? "border-[#D84A3B]" : "border-[#CFC8BB] focus-visible:border-[#143B3D]"}`} placeholder="Uma nota breve sobre o filme, a sessão ou o que o tornou memorável." {...register("synopsis")} />
        </Field>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#CFC8BB] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs leading-5 text-[#64645C]"><Check className="h-4 w-4 text-[#143B3D]" /> Os cinco primeiros campos são obrigatórios.</p>
        <div className="flex gap-3">
          <Button type="button" variant="ghost" onClick={() => reset(defaultValues)} className="h-11 rounded-none border border-[#CFC8BB] px-4 text-[#143B3D] hover:bg-[#E8E0D3] hover:text-[#143B3D]">
            <RotateCcw className="mr-2 h-4 w-4" /> Limpar
          </Button>
          <Button type="submit" disabled={isSubmitting} className="h-11 rounded-none bg-[#D84A3B] px-5 font-bold text-white shadow-none hover:bg-[#BD352B] active:scale-[0.97]">
            Guardar filme <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
};

function Field({ label, required, error, className, children }: FieldProps) {
  const id = label.toLowerCase().replaceAll(" ", "-").replaceAll("(", "").replaceAll(")", "");
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-2.5 flex items-center gap-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-[#424840]">
        {label}{required && <span className="text-[#D84A3B]" aria-hidden="true">*</span>}
      </Label>
      {children}
      {error && <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-[#B72E27]"><AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />{error}</p>}
    </div>
  );
}
