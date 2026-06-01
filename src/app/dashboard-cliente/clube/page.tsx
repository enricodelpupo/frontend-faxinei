"use client";

import React from "react";

export default function ClubeVantagensPage() {
  const cupons = [
    {
      id: 1,
      empresa: "Limpeza Total ES",
      categoria: "Produtos de limpeza",
      oferta: "20% off em todo o site + frete grátis acima de R$ 100",
      local: "Loja física: Praia do Canto",
      codigo: "FAXINEI20"
    },
    {
      id: 2,
      empresa: "Casa & Brilho",
      categoria: "Material de limpeza atacado",
      oferta: "15% off em compras acima de R$ 200",
      local: "",
      codigo: "BRILHO15"
    },
    {
      id: 3,
      empresa: "Lava Tudo Express",
      categoria: "Lavanderia",
      oferta: "10kg por R$ 49 (válido para diaristas Faxinei)",
      local: "",
      codigo: "LAVAEXPRESS"
    },
    {
      id: 4,
      empresa: "Uniformes Pro",
      categoria: "Uniformes e EPI",
      oferta: "Kit diarista (avental + luvas + touca) por R$ 39,90",
      local: "",
      codigo: "EPIPRO"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Banner */}
      <div className="bg-brand-dark rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-2">
          <span className="text-primary-400 text-xs font-bold uppercase tracking-wider">Clube de Vantagens</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Economia local da Grande Vitória</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Cupons exclusivos das nossas parcerias B2B. Disponíveis enquanto sua assinatura estiver ativa.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cupons.map((cupom) => (
          <div key={cupom.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{cupom.empresa}</h3>
                <p className="text-sm font-medium text-slate-500">{cupom.categoria}</p>
              </div>
            </div>

            <div className="space-y-2 mb-8">
              <p className="text-slate-700 font-semibold">{cupom.oferta}</p>
              {cupom.local && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {cupom.local}
                </div>
              )}
            </div>

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
              <div>
                <span className="text-xs font-medium text-slate-500 block mb-0.5">Código</span>
                <span className="font-mono font-bold text-slate-900 tracking-wider">{cupom.codigo}</span>
              </div>
              <button className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
