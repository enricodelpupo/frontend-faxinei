"use client";

import React from "react";

export default function AvaliacoesPage() {
  const avaliacoesEnviadas = [
    {
      id: 1,
      profissional: "Patrícia Lima",
      servico: "Pós-obra",
      data: "14/05/2026",
      nota: 5,
      comentario: '"Caprichosa, pontual e organizadíssima. Recomendo!"'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900">Suas avaliações enviadas</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {avaliacoesEnviadas.map((avaliacao) => (
            <div key={avaliacao.id} className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg">{avaliacao.profissional}</h4>
                  <p className="text-sm text-slate-500 font-medium mt-0.5">
                    {avaliacao.servico} &middot; {avaliacao.data}
                  </p>
                </div>
                
                {/* Estrelas */}
                <div className="flex items-center gap-1 text-primary-500">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < avaliacao.nota ? "fill-current" : "text-slate-200 fill-current"}`} 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
              </div>

              {avaliacao.comentario && (
                <p className="text-slate-600 font-medium italic mt-2">
                  {avaliacao.comentario}
                </p>
              )}
            </div>
          ))}
          
          {avaliacoesEnviadas.length === 0 && (
            <div className="text-center py-10 text-slate-500 font-medium">
              Você ainda não enviou nenhuma avaliação.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
