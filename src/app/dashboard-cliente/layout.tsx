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
    label: "Encontrar Diaristas",
    href: "/dashboard-cliente/agendar",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: "mural",
    label: "Mural de Vagas",
    href: "/dashboard-cliente/mural",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  {
    id: "contatos",
    label: "Contatos Desbloqueados",
    href: "/dashboard-cliente/contatos",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  {
    id: "avaliacoes",
    label: "Avaliações",
    href: "/dashboard-cliente/avaliacoes",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
  {
    id: "creditos",
    label: "Comprar Créditos",
    href: "/dashboard-cliente/creditos",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: "clube",
    label: "Clube de Vantagens",
    href: "/dashboard-cliente/clube",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </svg>
    )
  },
  {
    id: "perfil",
    label: "Meu Perfil",
    href: "/dashboard-cliente/perfil",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  },
  {
    id: "assinatura",
    label: "Assinatura",
    href: "/dashboard-cliente/assinatura",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  }
];

export default function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeTab = pathname.startsWith("/dashboard-cliente/clube") ? "clube"
                  : pathname.startsWith("/dashboard-cliente/creditos") ? "creditos"
                  : pathname.startsWith("/dashboard-cliente/contatos") ? "contatos"
                  : pathname.startsWith("/dashboard-cliente/avaliacoes") ? "avaliacoes"
                  : pathname.startsWith("/dashboard-cliente/perfil") ? "perfil"
                  : pathname.startsWith("/dashboard-cliente/assinatura") ? "assinatura"
                  : pathname.startsWith("/dashboard-cliente/mural") ? "mural" 
                  : pathname.startsWith("/dashboard-cliente/agendar") ? "agendar" 
                  : "inicio";

  const [userName, setUserName] = React.useState("");
  const [userRole, setUserRole] = React.useState<"Contratante" | "Profissional">("Contratante");

  React.useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) {
      try {
        const usuario = JSON.parse(stored);
        setUserName(usuario.nome || "");
        setUserRole(usuario.papel === "DIARISTA" ? "Profissional" : "Contratante");
      } catch { }
    }
  }, []);

  const title = activeTab === "inicio" ? "Painel Geral" 
              : activeTab === "clube" ? "Clube de Vantagens"
              : activeTab === "creditos" ? "Comprar Créditos"
              : activeTab === "contatos" ? "Contatos Desbloqueados"
              : activeTab === "avaliacoes" ? "Avaliações"
              : activeTab === "perfil" ? "Meu Perfil"
              : activeTab === "assinatura" ? "Minha Assinatura"
              : activeTab === "mural" ? "Mural de Vagas" 
              : "Encontrar Diaristas";

  const subtitle = activeTab === "inicio" ? "Bem-vindo(a) de volta! Aqui está o resumo do seu dia." 
                 : activeTab === "clube" ? "Cupons e benefícios das parcerias locais."
                 : activeTab === "creditos" ? "Adquira créditos extras quando precisar."
                 : activeTab === "contatos" ? "Histórico permanente dos números que você desbloqueou."
                 : activeTab === "avaliacoes" ? "Construa sua reputação avaliando atendimentos."
                 : activeTab === "perfil" ? "Telefones, endereços e dados pessoais."
                 : activeTab === "assinatura" ? "Plano atual, franquia e cobrança."
                 : activeTab === "mural" ? "Demandas e disponibilidades publicadas na sua região." 
                 : "Explore a vitrine de profissionais da Grande Vitória.";

  return (
    <div className="h-screen w-full bg-brand-light flex relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-[200px] w-[400px] h-[400px] bg-primary-100/50 rounded-full blur-[100px] pointer-events-none" />

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

      <main className="flex-1 flex flex-col mb-[72px] md:mb-0 relative z-10 overflow-hidden">
        <DashboardHeader
          title={title}
          subtitle={subtitle}
          userName={userName}
          userRole={userRole}
        />

        <div className="p-4 sm:p-8 flex-1 overflow-y-auto no-scrollbar pb-24 md:pb-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
