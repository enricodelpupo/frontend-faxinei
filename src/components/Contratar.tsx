"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import CustomSelect from "./CustomSelect";
import CustomDatePicker from "./CustomDatePicker";

interface Diarista {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  price: string;
  priceValue: number;
  specialties: string[];
  bio: string;
  imageInitial: string;
  availableDates: string[]; // YYYY-MM-DD
}

// Data fictícia para testes de filtros
const today = new Date();
const formatDate = (date: Date) => date.toISOString().split("T")[0];
const tomorrow = formatDate(new Date(today.getTime() + 86400000));
const inTwoDays = formatDate(new Date(today.getTime() + 86400000 * 2));
const inThreeDays = formatDate(new Date(today.getTime() + 86400000 * 3));

const mockDiaristas: Diarista[] = [
  {
    id: "1",
    name: "Ana Silva",
    rating: 4.9,
    reviews: 128,
    price: "R$ 150,00",
    priceValue: 150,
    specialties: ["Faxina Padrão", "Passadoria"],
    bio: "Especialista em deixar sua casa brilhando com agilidade e perfeição.",
    imageInitial: "A",
    availableDates: [tomorrow, inThreeDays]
  },
  {
    id: "2",
    name: "Beatriz Costa",
    rating: 5.0,
    reviews: 84,
    price: "R$ 200,00",
    priceValue: 200,
    specialties: ["Limpeza Pesada", "Pós-obra"],
    bio: "Para aquelas sujeiras difíceis, pode contar comigo. Atenção aos mínimos detalhes.",
    imageInitial: "B",
    availableDates: [tomorrow, inTwoDays]
  },
  {
    id: "3",
    name: "Carla Dias",
    rating: 4.8,
    reviews: 215,
    price: "R$ 120,00",
    priceValue: 120,
    specialties: ["Organização", "Faxina Padrão"],
    bio: "Amo organizar armários e ambientes para otimizar o seu espaço.",
    imageInitial: "C",
    availableDates: [inTwoDays, inThreeDays]
  },
  {
    id: "4",
    name: "Daniela Alves",
    rating: 4.7,
    reviews: 56,
    price: "R$ 160,00",
    priceValue: 160,
    specialties: ["Passadoria", "Limpeza Pesada"],
    bio: "Suas roupas impecáveis e sua casa perfumada.",
    imageInitial: "D",
    availableDates: [tomorrow]
  },
  {
    id: "5",
    name: "Fernanda Lima",
    rating: 4.9,
    reviews: 310,
    price: "R$ 180,00",
    priceValue: 180,
    specialties: ["Faxina Padrão", "Vidros"],
    bio: "Experiência de 10 anos na área. Seu lar nas melhores mãos.",
    imageInitial: "F",
    availableDates: [inTwoDays]
  },
  {
    id: "6",
    name: "Gabriela Souza",
    rating: 4.6,
    reviews: 42,
    price: "R$ 140,00",
    priceValue: 140,
    specialties: ["Organização"],
    bio: "Organizo sua rotina através da organização da sua casa.",
    imageInitial: "G",
    availableDates: [tomorrow, inTwoDays, inThreeDays]
  }
];

export default function Contratar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortBy, setSortBy] = useState("recomendados");

  const filteredAndSortedDiaristas = useMemo(() => {
    // 1. Filtrar
    let filtered = mockDiaristas.filter((diarista) => {
      const matchSearch = diarista.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          diarista.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchDate = selectedDate ? diarista.availableDates.includes(selectedDate) : true;
      
      return matchSearch && matchDate;
    });

    // 2. Ordenar
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "maior_avaliacao":
          return b.rating - a.rating;
        case "menor_preco":
          return a.priceValue - b.priceValue;
        case "maior_preco":
          return b.priceValue - a.priceValue;
        case "recomendados":
        default:
          return 0; // Mantém a ordem original ou uma lógica específica de recomendação
      }
    });
  }, [searchTerm, selectedDate, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-auto py-4 sm:h-20 sm:py-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-4 p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">Contratar Serviço</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Buscar por diarista ou especialidade..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-3 border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 w-full sm:w-72 text-sm font-medium text-slate-700 bg-white transition-all placeholder:text-slate-400"
              />
            </div>
            
            <div className="flex w-full sm:w-auto gap-3">
              {/* Date Filter */}
              <div className="relative flex-1 sm:flex-none sm:w-48">
                <CustomDatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  placeholder="Selecione uma data"
                  className="w-full"
                />
              </div>

              {/* Sort Filter */}
              <div className="relative flex-1 sm:flex-none">
                <CustomSelect
                  value={sortBy}
                  onChange={(val) => setSortBy(val)}
                  options={[
                    { value: "recomendados", label: "Recomendados" },
                    { value: "maior_avaliacao", label: "Maior Avaliação" },
                    { value: "menor_preco", label: "Menor Preço" },
                    { value: "maior_preco", label: "Maior Preço" }
                  ]}
                  className="w-full sm:w-48"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-8 text-center sm:text-left">
          <h2 className="text-3xl font-black text-slate-900 mb-2">Diaristas Disponíveis</h2>
          <p className="text-slate-600">Encontre a diarista ideal para a sua necessidade e agende agora mesmo.</p>
        </div>

        {filteredAndSortedDiaristas.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhuma diarista encontrada</h3>
            <p className="text-slate-600">Tente remover ou alterar seus filtros de busca para encontrar mais profissionais.</p>
            <button 
              onClick={() => { setSearchTerm(""); setSelectedDate(""); setSortBy("recomendados"); }}
              className="mt-6 px-6 py-2 bg-sky-100 text-sky-700 font-bold rounded-lg hover:bg-sky-200 transition-colors"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedDiaristas.map((diarista) => (
              <div key={diarista.id} className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden group hover:border-sky-200">
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold text-2xl shadow-inner border-2 border-white ring-2 ring-sky-50 group-hover:scale-105 transition-transform">
                        {diarista.imageInitial}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-slate-900">{diarista.name}</h3>
                        <div className="flex items-center text-sm font-medium mt-0.5">
                          <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-slate-900">{diarista.rating}</span>
                          <span className="text-slate-400 ml-1">({diarista.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {diarista.specialties.map((spec, index) => (
                      <span key={index} className="px-3 py-1 bg-sky-50 text-sky-700 text-[11px] font-bold uppercase tracking-wider rounded-lg border border-sky-100">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-slate-600 flex-1 leading-relaxed">
                    "{diarista.bio}"
                  </p>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">A partir de</p>
                      <p className="text-xl font-black text-slate-900">{diarista.price}</p>
                    </div>
                    <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
                      Agendar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

