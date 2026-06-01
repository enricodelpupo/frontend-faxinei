"use client";

import React from "react";

export default function AssinaturaPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* CARD PRINCIPAL - PLANO */}
      <div className="bg-brand-dark rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-primary-400 text-[11px] font-extrabold uppercase tracking-widest">Plano Atual</span>
          <h2 className="text-3xl font-black tracking-tight text-white">Premium</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Renovação automática em 12/06/2026
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-colors border border-slate-700">
            Trocar de plano
          </button>
          <button className="px-5 py-2.5 bg-transparent hover:bg-red-950/30 text-red-400 rounded-xl font-bold text-sm transition-colors border border-transparent hover:border-red-900/50">
            Cancelar
          </button>
        </div>
      </div>

      {/* MÉTRICAS / STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Franquia */}
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <span className="text-slate-400 text-[11px] font-extrabold uppercase tracking-widest mb-4">Franquia este mês</span>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-black text-slate-900">9</span>
            <span className="text-xl font-bold text-slate-400">/ 12</span>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-auto">3 acumulados do mês anterior</p>
        </div>

        {/* Créditos */}
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <span className="text-slate-400 text-[11px] font-extrabold uppercase tracking-widest mb-4">Créditos Extras</span>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-black text-slate-900">3</span>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-auto">Adquiridos avulsos</p>
        </div>

        {/* Renovação (Substituindo a parte de cobrança por detalhes da assinatura) */}
        <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <span className="text-slate-400 text-[11px] font-extrabold uppercase tracking-widest mb-4">Próxima Renovação</span>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-black text-slate-900">12/06/2026</span>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-auto">O seu plano permanecerá ativo até esta data.</p>
        </div>
      </div>

    </div>
  );
}
