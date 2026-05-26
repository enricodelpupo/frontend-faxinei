"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardClientPage() {
  return (
    <div className="space-y-8">
      {/* CARD PRINCIPAL */}
      <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200/60 shadow-sm relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary-300 to-primary-600 rounded-full blur-3xl opacity-20"></div>

        <div className="flex flex-col md:flex-row items-center gap-6 justify-between relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden relative shadow-md shadow-primary-500/10 bg-white border border-slate-200 flex-shrink-0 flex items-center justify-center">
              <Image src="/logo.png" alt="Faxinei Logo" fill className="object-cover p-2" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">Precisa de uma limpeza?</h3>
              <p className="text-slate-600 font-medium mt-1">Agende agora mesmo uma diarista de confiança para a sua residência.</p>
            </div>
          </div>

          <Link
            href="/dashboard-cliente/agendar"
            className="px-6 py-3.5 text-sm font-bold bg-primary-600 text-white rounded-2xl hover:bg-primary-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 shadow-md shadow-primary-600/10 cursor-pointer flex items-center gap-2"
          >
            Agendar Nova Faxina
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* OUTROS CARDS OPCIONAIS DE RESUMO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Últimos Serviços</p>
            <h4 className="text-lg font-extrabold text-slate-900 mt-0.5">Nenhuma faxina agendada</h4>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Formas Salvas</p>
            <h4 className="text-lg font-extrabold text-slate-900 mt-0.5">Pix cadastrado</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
