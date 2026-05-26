"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar, DashboardHeader, SidebarItem } from "@/components/layout/DashboardLayout";

const sidebarItems: SidebarItem[] = [
  {
    id: "inicio",
    label: "Painel Geral",
    href: "/dashboard-cliente",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    id: "agendar",
    label: "Encontrar Diarista",
    href: "/dashboard-cliente/agendar",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeTab = pathname.startsWith("/dashboard-cliente/agendar") ? "agendar" : "inicio";

  const [userName, setUserName] = React.useState("");
  const [userRole, setUserRole] = React.useState("Cliente");

  React.useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) {
      try {
        const usuario = JSON.parse(stored);
        setUserName(usuario.nome || "");
        setUserRole(usuario.papel === "DIARISTA" ? "Profissional" : "Cliente");
      } catch { }
    }
  }, []);

  const title = activeTab === "inicio" ? "Painel Geral" : "Agendar Faxina";
  const subtitle = activeTab === "inicio" ? "Bem-vindo(a) de volta! Aqui está o resumo do seu dia." : "Encontre os melhores profissionais de limpeza em poucos passos.";

  return (
    <div className="min-h-screen bg-brand-light flex relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[200px] w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />

      <DashboardSidebar
        activeTab={activeTab}
        items={sidebarItems}
        userRole={userRole}
        onLogout={() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("usuario");
          window.location.href = "/home";
        }}
        tipTitle="Dica do dia"
        tipDescription="Deixe os produtos de limpeza em um local de fácil acesso para a diarista."
      />

      <main className="flex-1 flex flex-col mb-[72px] md:mb-0 relative z-10 h-screen overflow-hidden">
        <DashboardHeader
          title={title}
          subtitle={subtitle}
          userName={userName}
          userRole={userRole}
        />

        <div className="p-4 sm:p-8 flex-1 overflow-y-auto no-scrollbar pb-36 md:pb-28">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
