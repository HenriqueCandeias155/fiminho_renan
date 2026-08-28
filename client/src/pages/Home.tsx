/** Arquivo de Sessão — entrada da aplicação encaminhada de forma segura para a estante. */
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/lista", { replace: true });
  }, [setLocation]);

  return null;
}
