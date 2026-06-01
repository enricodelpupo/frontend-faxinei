"use client";

import React from "react";

interface Diarista {
  id: number;
  nome: string;
  iniciais: string;
  nota: number;
  local: string;
  servicos: number;
  experiencia: number;
  tags: string[];
  premium: boolean;
}

const diaristasMock: Diarista[] = [
  {
    id: 1,
    nome: "Ana Carolina",
    iniciais: "A",
    nota: 4.9,
    local: "Praia da Costa, Vila Velha",
    servicos: 213,
    experiencia: 7,
    tags: ["Limpeza pesada", "Passar roupa"],
    premium: true,
  },
  {
    id: 2,
    nome: "Juliana Pereira",
    iniciais: "J",
    nota: 4.8,
    local: "Jardim Camburi, Vitória",
    servicos: 156,
    experiencia: 4,
    tags: ["Faxina semanal", "Pós-obra"],
    premium: true,
  },
  {
    id: 3,
    nome: "Maria José",
    iniciais: "M",
    nota: 4.7,
    local: "Centro, Cariacica",
    servicos: 89,
    experiencia: 12,
    tags: ["Cozinha", "Idosos"],
    premium: false,
  },
];

export default function EncontrarDiaristasPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Buscar por nome ou serviço..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm font-medium text-slate-900 placeholder-slate-400"
          />
        </div>

        <div className="flex w-full md:w-auto gap-4">
          <select className="px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_12px_center] min-w-[160px]">
            <option>Todos os bairros</option>
            <option>Vitória</option>
            <option>Vila Velha</option>
            <option>Serra</option>
            <option>Cariacica</option>
          </select>

          <select className="px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%207.5L10%2012.5L15%207.5%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_12px_center] min-w-[180px]">
            <option>Avaliação: qualquer</option>
            <option>4.5 ou mais</option>
            <option>4.0 ou mais</option>
          </select>

          <button className="px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-2 whitespace-nowrap">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Mais filtros
          </button>
        </div>
      </div>

      {/* RESULT HEADER */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          <strong className="text-slate-900 font-bold">6</strong> profissionais disponíveis na Grande Vitória
        </p>
        
        <select className="px-4 py-2 bg-transparent border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none pr-8 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M4%206L8%2010L12%206%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_8px_center]">
          <option>Mais relevantes</option>
          <option>Maior avaliação</option>
          <option>Mais experientes</option>
        </select>
      </div>

      {/* GRID DE DIARISTAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diaristasMock.map((diarista) => (
          <div key={diarista.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm shadow-slate-200/50 overflow-hidden flex flex-col group hover:shadow-lg hover:shadow-slate-200 transition-all duration-300">
            {/* Top Blue Cover */}
            <div className="h-[120px] bg-primary-500 relative flex-shrink-0">
              {diarista.premium && (
                <div className="absolute top-4 right-4 bg-primary-400 text-primary-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  Premium
                </div>
              )}
              
              {/* Fake Cutout Effect & Avatar */}
              <div className="absolute -bottom-6 left-6 flex items-end">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center font-extrabold text-xl text-slate-900 shadow-sm relative z-10">
                  {diarista.iniciais}
                </div>
                {/* Visual semi-circle cut out helper blocks could go here, but a thick border on avatar works better natively */}
                <div className="absolute inset-0 rounded-full border-[6px] border-white z-20"></div>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="p-6 pt-10 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-primary-600 transition-colors">{diarista.nome}</h3>
                <div className="flex items-center gap-1 bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                  <svg className="w-3.5 h-3.5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="text-xs font-bold">{diarista.nota}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-500 mb-3">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs font-medium">{diarista.local}</span>
              </div>

              <p className="text-xs text-slate-500 font-medium mb-4">
                {diarista.servicos} serviços • {diarista.experiencia} anos de experiência
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {diarista.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[11px] font-bold">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <div className="flex items-center gap-1.5 text-primary-600 mb-4">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Identidade verificada</span>
                </div>

                <button className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-primary-500/20">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Ver perfil e revelar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
