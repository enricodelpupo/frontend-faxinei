"use client";

import React from "react";

export default function ContatosDesbloqueadosPage() {
  const contatos = [
    {
      id: 1,
      iniciais: "A",
      nome: "Ana Carolina",
      local: "Praia da Costa",
      tipo: "Diarista Premium",
      telefone: "(27) 99812-4477",
      data: "12/05/2026",
      nota: 4.9
    },
    {
      id: 2,
      iniciais: "J",
      nome: "Juliana Pereira",
      local: "Jardim Camburi",
      tipo: "Diarista",
      telefone: "(27) 99644-2210",
      data: "28/04/2026",
      nota: 4.8
    },
    {
      id: 3,
      iniciais: "P",
      nome: "Patrícia Lima",
      local: "Itaparica",
      tipo: "Diarista Premium",
      telefone: "(27) 99701-1188",
      data: "15/04/2026",
      nota: 5.0
    },
    {
      id: 4,
      iniciais: "M",
      nome: "Maria José",
      local: "Centro / Cariacica",
      tipo: "Diarista",
      telefone: "(27) 99220-7733",
      data: "02/04/2026",
      nota: 4.7
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Banner */}
      <div className="bg-brand-dark rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="relative z-10 flex flex-col gap-2">
          <span className="text-primary-400 text-xs font-bold uppercase tracking-wider">Backup Seguro</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Sua rede de contatos local</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Cada número desbloqueado fica salvo aqui para sempre — enquanto sua assinatura estiver ativa.
          </p>
        </div>

        <div className="relative z-10 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 flex flex-col items-center justify-center shrink-0 min-w-[100px]">
          <span className="text-xs font-bold text-slate-400 mb-1">Total</span>
          <span className="text-3xl font-extrabold text-white">4</span>
        </div>
      </div>

      {/* Busca */}
      <div className="relative w-full max-w-2xl">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar nos seus contatos..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm"
        />
      </div>

      {/* Lista / Tabela */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-5 px-6 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Profissional</th>
                <th className="py-5 px-6 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Telefone</th>
                <th className="py-5 px-6 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Desbloqueado Em</th>
                <th className="py-5 px-6 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider text-center">Avaliação</th>
                <th className="py-5 px-6 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {contatos.map((contato) => (
                <tr key={contato.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center font-bold shadow-sm shrink-0">
                        {contato.iniciais}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{contato.nome}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{contato.local} &middot; {contato.tipo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {contato.telefone}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {contato.data}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 px-2 py-1 rounded-md text-xs font-bold">
                      <svg className="w-3 h-3 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      {contato.nota}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white rounded-xl font-bold text-xs transition-colors shadow-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12.002 0C5.373 0 0 5.373 0 12c0 2.123.553 4.12 1.516 5.867L.034 23.953l6.234-1.636A11.968 11.968 0 0012.002 24c6.627 0 12-5.373 12-12s-5.373-12-12-12zm0 21.996c-1.802 0-3.56-.464-5.13-1.343l-.368-.21-3.805.998.998-3.712-.229-.364a9.982 9.982 0 01-1.464-5.365c0-5.522 4.477-9.998 9.998-9.998s10 4.476 10 9.998-4.478 9.998-10 9.998z"/>
                      </svg>
                      WhatsApp
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
