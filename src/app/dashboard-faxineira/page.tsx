"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DashboardSidebar, DashboardHeader, SidebarItem } from "@/components/layout/DashboardLayout";

export default function DashboardFaxineiraPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("Profissional");

  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) {
      try {
        const usuario = JSON.parse(stored);
        // Redirecionar se não validado
        if (usuario.papel === 'DIARISTA' && !usuario.validado) {
          router.push('/cadastro-confirmacao');
          return;
        }
        setUserName(usuario.nome || "");
        setUserRole(usuario.papel === "DIARISTA" ? "Profissional" : "Cliente");
      } catch { }
    }
  }, [router]);

  const sidebarItems: SidebarItem[] = [
    {
      id: "inicio",
      label: "Painel Geral",
      onClick: () => {},
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-brand-light flex relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-[200px] w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />

      <DashboardSidebar 
        activeTab="inicio" 
        items={sidebarItems} 
        userRole="Profissional" 
        onLogout={() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("usuario");
          window.location.href = "/home";
        }}
      />

      <main className="flex-1 flex flex-col mb-[72px] md:mb-0 relative z-10 h-screen overflow-hidden">
        <DashboardHeader 
          title="Painel Geral" 
          subtitle="Gerencie suas faxinas e ganhos de forma simples." 
          userName={userName} 
          userRole={userRole} 
        />
        
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto no-scrollbar">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              <div className="bg-white p-10 rounded-3xl border border-slate-200/60 shadow-sm text-center relative overflow-hidden max-w-2xl mx-auto mt-12">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary-300 to-primary-600 rounded-full blur-3xl opacity-20"></div>
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/40 text-white transform rotate-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Bom trabalho!</h3>
                <p className="text-base sm:text-lg text-slate-600 mx-auto font-medium">
                  Seu ambiente de profissional está configurado. A funcionalidade de gerenciar serviços foi movida para as opções futuras.
                </p>
              </div>

            </div>
        </div>
      </main>
    </div>
  );
}
