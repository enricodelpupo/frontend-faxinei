"use client";

import React, { useState } from "react";

interface Vaga {
  id: number;
  autorNome: string;
  autorIniciais: string;
  autorTipo: string;
  tempo: string;
  tipoVaga: string;
  titulo: string;
  descricao: string;
  local: string;
  data: string;
  interessadas: number;
}

const vagasMock: Vaga[] = [
  {
    id: 1,
    autorNome: "Renan M.",
    autorIniciais: "R",
    autorTipo: "Contratante Premium",
    tempo: "há 2h",
    tipoVaga: "Vaga publicada",
    titulo: "Faxina pesada para terça-feira",
    descricao: "Apartamento 2 quartos, 80m². Preciso de profissional para limpeza completa, lavar banheiros e cozinha. Material no local.",
    local: "Praia da Costa, Vila Velha",
    data: "Terça, 03/06 — manhã",
    interessadas: 4,
  },
  {
    id: 2,
    autorNome: "Família Souza",
    autorIniciais: "F",
    autorTipo: "Contratante Premium",
    tempo: "há 5h",
    tipoVaga: "Vaga publicada",
    titulo: "Diarista semanal — sextas",
    descricao: "Buscamos profissional para diária recorrente toda sexta-feira. Casa térrea com quintal.",
    local: "Jardim Camburi, Vitória",
    data: "Toda sexta a partir de 06/06",
    interessadas: 9,
  }
];

export default function MuralDeVagasPage() {
  const [activeTab, setActiveTab] = useState("Todos");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* TOOLBAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* TABS */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {["Todos", "Vagas (Contratantes)", "Disponibilidades (Diaristas)"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-slate-900 text-white"
                  : "bg-transparent text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filtros
          </button>
          <button className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 border border-primary-500 rounded-full text-sm font-bold text-white transition-colors shadow-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Publicar
          </button>
        </div>
      </div>

      {/* FEED DE VAGAS */}
      <div className="space-y-4">
        {vagasMock.map((vaga) => (
          <div key={vaga.id} className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
            {/* HEADER DA VAGA */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                  {vaga.autorIniciais}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900">{vaga.autorNome}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {vaga.autorTipo} <span className="mx-1">&middot;</span> {vaga.tempo}
                  </p>
                </div>
              </div>
              <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                {vaga.tipoVaga}
              </span>
            </div>

            {/* CONTEÚDO */}
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-slate-900">{vaga.titulo}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{vaga.descricao}</p>
            </div>

            {/* INFOS/METADADOS */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {vaga.local}
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {vaga.data}
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {vaga.interessadas} interessadas
              </div>
            </div>

            {/* AÇÕES */}
            <div className="pt-2 flex items-center gap-3">
              <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Revelar número
              </button>
              <button className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition-colors">
                Salvar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
