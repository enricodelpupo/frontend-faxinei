"use client";

import React from "react";

export default function ComprarCreditosPage() {
  const pacotes = [
    {
      id: 1,
      quantidade: 3,
      preco: "14,90",
      precoPorContato: "4,97",
      destaque: false
    },
    {
      id: 2,
      quantidade: 8,
      preco: "29,90",
      precoPorContato: "3,74",
      destaque: true
    },
    {
      id: 3,
      quantidade: 20,
      preco: "59,90",
      precoPorContato: "2,99",
      destaque: false
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Banner */}
      <div className="bg-brand-dark rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="relative z-10 flex flex-col gap-2">
          <span className="text-primary-400 text-xs font-bold uppercase tracking-wider">Sua Franquia</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white flex items-baseline gap-2">
            9 <span className="text-lg font-semibold text-slate-400">de 12 restantes este mês</span>
          </h2>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Renova em 12 dias. Saldo não usado acumula (teto: 24).
          </p>
        </div>

        <div className="relative z-10 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-0.5">Créditos extras</span>
            <span className="text-2xl font-extrabold text-white">3</span>
          </div>
        </div>
      </div>

      {/* Titulo secao */}
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
        </svg>
        <h3 className="text-lg font-extrabold text-slate-900">Pacotes avulsos</h3>
      </div>

      {/* Grid de pacotes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {pacotes.map((pacote) => (
          <div 
            key={pacote.id} 
            className={`bg-white rounded-[2rem] p-8 flex flex-col relative transition-all duration-300 hover:-translate-y-1 ${
              pacote.destaque 
                ? "border-2 border-primary-500 shadow-xl shadow-primary-500/10" 
                : "border border-slate-100 shadow-sm hover:shadow-md"
            }`}
          >
            {pacote.destaque && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap">
                Mais comprado
              </div>
            )}

            <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center mb-6">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>

            <div className="mb-8">
              <p className="text-slate-500 font-medium mb-1">Pacote de</p>
              <h4 className="text-4xl font-extrabold text-slate-900 flex items-baseline gap-1">
                +{pacote.quantidade} <span className="text-lg font-semibold text-slate-500">créditos</span>
              </h4>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-slate-500 font-bold">R$</span>
                <span className="text-4xl font-extrabold text-slate-900">{pacote.preco}</span>
              </div>
              <p className="text-xs font-medium text-slate-500 mt-1">R$ {pacote.precoPorContato} / contato</p>
            </div>

            <ul className="space-y-3 mb-10 flex-1">
              {["Sem alterar seu plano", "Aplicação imediata", "Não expira"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <svg className="w-4 h-4 text-primary-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <button className={`w-full py-4 rounded-xl font-bold text-sm transition-colors ${
              pacote.destaque 
                ? "bg-primary-500 hover:bg-primary-600 text-white shadow-md shadow-primary-500/20" 
                : "bg-slate-50 hover:bg-slate-100 text-slate-700"
            }`}>
              Comprar agora
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
