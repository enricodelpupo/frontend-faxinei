"use client";

import React from "react";
import Link from "next/link";

export default function DashboardClientPage() {
  return (
    <div className="space-y-10">
      {/* CARD DO PLANO (PREMIUM) */}
      <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-xl shadow-slate-900/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col gap-1">
          <span className="text-slate-400 text-sm font-medium mb-1">Plano atual</span>
          <div className="flex items-center gap-3">
            <h2 className="text-4xl font-extrabold tracking-tight">Premium</h2>
            <span className="px-2.5 py-1 bg-primary-950/50 text-primary-400 border border-primary-800/50 rounded-full text-xs font-bold tracking-wide">
              Ativo
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-2">Sua franquia mensal renova em 12 dias.</p>
        </div>

        <div className="relative z-10 flex flex-row gap-12 md:mr-8">
          <div className="flex flex-col gap-2">
            <span className="text-slate-400 text-xs font-medium">Revelações disponíveis</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">9</span>
              <span className="text-slate-500 text-sm font-medium">/ 12</span>
            </div>
            <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-primary-500 w-[75%] rounded-full" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-slate-400 text-xs font-medium">Créditos extras</span>
            <span className="text-3xl font-extrabold">3</span>
          </div>
        </div>
      </div>

      {/* MÉTRICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Contatos Desbloqueados */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col gap-4">
          <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Contatos desbloqueados</p>
            <h3 className="text-2xl font-bold text-slate-900">14</h3>
            <p className="text-primary-500 text-xs font-medium mt-1">+3 este mês</p>
          </div>
        </div>

        {/* Reputação */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col gap-4">
          <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Reputação média</p>
            <h3 className="text-2xl font-bold text-slate-900">4.9</h3>
            <p className="text-primary-500 text-xs font-medium mt-1">32 avaliações</p>
          </div>
        </div>

        {/* Visualizações de Perfil */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col gap-4">
          <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Visualizações de perfil</p>
            <h3 className="text-2xl font-bold text-slate-900">218</h3>
            <p className="text-primary-500 text-xs font-medium mt-1">últimos 30 dias</p>
          </div>
        </div>

        {/* Posts no mural */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col gap-4">
          <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Posts ativos no mural</p>
            <h3 className="text-2xl font-bold text-slate-900">2</h3>
            <p className="text-primary-500 text-xs font-medium mt-1">2 respostas</p>
          </div>
        </div>
      </div>

      {/* ATALHOS RÁPIDOS */}
      <div>
        <h3 className="text-xl font-extrabold text-slate-900 mb-5">Atalhos rápidos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Encontrar Diaristas */}
          <Link href="/dashboard-cliente/agendar" className="bg-white group rounded-3xl border border-slate-100 p-5 flex items-center justify-between hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-500 group-hover:text-white transition-colors rounded-2xl flex items-center justify-center text-primary-500 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">Encontrar diaristas</h4>
                <p className="text-xs text-slate-500 mt-0.5">Vitrine ativa da Grande Vitória</p>
              </div>
            </div>
            <div className="text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Mural de Vagas */}
          <Link href="#" className="bg-white group rounded-3xl border border-slate-100 p-5 flex items-center justify-between hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-500 group-hover:text-white transition-colors rounded-2xl flex items-center justify-center text-primary-500 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">Mural de vagas</h4>
                <p className="text-xs text-slate-500 mt-0.5">Demandas e disponibilidades em tempo real</p>
              </div>
            </div>
            <div className="text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Comprar Créditos */}
          <Link href="#" className="bg-white group rounded-3xl border border-slate-100 p-5 flex items-center justify-between hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-500 group-hover:text-white transition-colors rounded-2xl flex items-center justify-center text-primary-500 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">Comprar créditos extras</h4>
                <p className="text-xs text-slate-500 mt-0.5">Sem trocar de plano</p>
              </div>
            </div>
            <div className="text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
