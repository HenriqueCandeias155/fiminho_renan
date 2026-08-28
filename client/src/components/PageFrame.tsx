/** Arquivo de Sessão — moldura partilhada que mantém navegação e textura no catálogo. */
import type { ReactNode } from "react";
import { AppSidebar } from "@/components/AppSidebar";

type PageFrameProps = {
  children: ReactNode;
};

export function PageFrame({ children }: PageFrameProps) {
  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#20221E] lg:flex">
      <AppSidebar />
      <main className="min-h-screen min-w-0 flex-1">{children}</main>
    </div>
  );
}
