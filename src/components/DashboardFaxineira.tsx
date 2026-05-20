"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Service {
  id: string;
  name: string;
  active: boolean;
  basePrice: string;
}

export default function DashboardFaxineira() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1));
  
  // Mock Data for Services
  const [services, setServices] = useState<Service[]>([
    { id: "1", name: "Faxina Padrão", active: true, basePrice: "150,00" },
    { id: "2", name: "Limpeza Pesada", active: true, basePrice: "250,00" },
    { id: "3", name: "Passadoria", active: false, basePrice: "100,00" },
    { id: "4", name: "Organização", active: true, basePrice: "200,00" },
  ]);

  const toggleService = (id: string) => {
    setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const handlePriceChange = (id: string, newPrice: string) => {
    setServices(services.map(s => s.id === id ? { ...s, basePrice: newPrice } : s));
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const renderAgenda = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === 19 && month === 4 && year === 2026; 
      // Simulate busy days
      const isBusy = (d === 12 || d === 15 || d === 19 || d === 25) && month === 4 && year === 2026;
      
      days.push(
        <div 
          key={`day-${d}`} 
          className={`min-h-[80px] sm:min-h-[100px] p-2 border flex flex-col rounded-xl transition-all hover:shadow-md cursor-pointer ${
            isToday 
              ? 'border-indigo-300 bg-indigo-50/50 shadow-sm' 
              : 'border-gray-200 bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex justify-between items-start mb-1">
            {isBusy ? (
              <span className="w-2 h-2 mt-2 ml-1 rounded-full bg-indigo-500 shadow-sm shadow-indigo-300"></span>
            ) : (
              <span></span>
            )}
            <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${
              isToday ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-700'
            }`}>
              {d}
            </span>
          </div>
          
          <div className="flex-1 flex flex-col justify-end gap-1 overflow-y-auto no-scrollbar">
            {isBusy && (
               <div className="text-[10px] sm:text-xs truncate bg-indigo-100 text-indigo-800 px-1.5 py-1 rounded font-medium text-center">
                 Trabalho Agendado
               </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm transition-all max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 capitalize">
            {monthNames[month]} {year}
          </h3>
          <div className="flex space-x-2">
            <button onClick={prevMonth} className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-600 transition-colors border border-gray-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={nextMonth} className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-600 transition-colors border border-gray-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center font-bold text-gray-500 text-xs sm:text-sm py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {days}
        </div>
      </div>
    );
  };

  const renderServicos = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Meus Serviços</h2>
          <p className="text-gray-600">Configure os serviços que você oferece e defina seus valores base.</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">
            {services.map(service => (
              <div key={service.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border transition-all ${service.active ? 'border-indigo-200 bg-indigo-50/30' : 'border-gray-200 bg-gray-50/50 opacity-70'}`}>
                <div className="flex items-center mb-4 sm:mb-0">
                  <button 
                    onClick={() => toggleService(service.id)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${service.active ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${service.active ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                  <div className="ml-4">
                    <p className="text-base font-bold text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-500">{service.active ? 'Ativo' : 'Inativo'}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 mr-3">Valor Base (R$)</label>
                  <input 
                    type="text" 
                    value={service.basePrice}
                    onChange={(e) => handlePriceChange(service.id, e.target.value)}
                    disabled={!service.active}
                    className="w-28 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 font-semibold focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 disabled:bg-gray-100 disabled:text-gray-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-100">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm w-full sm:w-auto">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPerfil = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Meu Perfil</h2>
          <p className="text-gray-600">Atualize suas informações pessoais e região de atendimento.</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-3xl shadow-inner border-4 border-white ring-2 ring-indigo-50">
                M
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Maria Profissional</h3>
                <p className="text-gray-500 mb-3">Membro desde Abril de 2026</p>
                <button className="text-sm font-medium text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors">
                  Alterar Foto
                </button>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input type="text" defaultValue="Maria Profissional" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input type="text" defaultValue="(11) 98765-4321" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-900" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio / Apresentação</label>
                <textarea rows={4} defaultValue="Sou especialista em limpezas pós-obra e faxinas detalhadas. Adoro organizar espaços!" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-900"></textarea>
                <p className="text-xs text-gray-500 mt-2">Esta mensagem aparecerá no seu perfil público para os clientes.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Regiões de Atendimento</label>
                <input type="text" defaultValue="Centro, Zona Sul, Pinheiros" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-gray-900" />
              </div>
            </form>
          </div>
          <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-100 flex justify-end">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm w-full sm:w-auto">
              Salvar Perfil
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Sidebar - Tema adaptado (Indigo mais forte para diferenciar) */}
      <aside className="w-64 bg-indigo-950 border-r border-indigo-900 hidden md:flex flex-col text-white">
        <div className="h-20 flex items-center px-8 border-b border-indigo-900/50">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center mr-3 shadow-md">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">Faxinei PRO</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("inicio")}
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "inicio" ? "bg-indigo-800 text-white shadow-sm" : "text-indigo-200 hover:bg-indigo-900/50 hover:text-white"
            }`}
          >
            <span className="mr-3 opacity-80">🏠</span> Início
          </button>
          <button 
            onClick={() => setActiveTab("agenda")}
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "agenda" ? "bg-indigo-800 text-white shadow-sm" : "text-indigo-200 hover:bg-indigo-900/50 hover:text-white"
            }`}
          >
            <span className="mr-3 opacity-80">📅</span> Minha Agenda
          </button>
          <button 
            onClick={() => setActiveTab("servicos")}
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "servicos" ? "bg-indigo-800 text-white shadow-sm" : "text-indigo-200 hover:bg-indigo-900/50 hover:text-white"
            }`}
          >
            <span className="mr-3 opacity-80">✨</span> Meus Serviços
          </button>
          <button 
            onClick={() => setActiveTab("perfil")}
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "perfil" ? "bg-indigo-800 text-white shadow-sm" : "text-indigo-200 hover:bg-indigo-900/50 hover:text-white"
            }`}
          >
            <span className="mr-3 opacity-80">👤</span> Meu Perfil
          </button>
        </nav>
        <div className="p-4 border-t border-indigo-900/50">
          <Link href="/home" className="flex items-center px-4 py-3 text-red-300 hover:bg-red-500/10 hover:text-red-200 rounded-xl font-medium transition-colors">
            <span className="mr-3">🚪</span> Sair
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab === "inicio" && "Painel do Profissional"}
            {activeTab === "agenda" && "Minha Agenda"}
            {activeTab === "servicos" && "Gerenciar Serviços"}
            {activeTab === "perfil" && "Meu Perfil"}
          </h2>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-sm text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full font-bold border border-indigo-100">
              Profissional
            </span>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm ring-2 ring-indigo-100 cursor-pointer">
              M
            </div>
          </div>
        </header>
        
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto">
          {activeTab === "inicio" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-gray-500 font-medium mb-2">Trabalhos Pendentes</h3>
                  <p className="text-3xl font-extrabold text-indigo-600">4</p>
                  <p className="text-sm text-gray-400 mt-2">Para este mês</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-gray-500 font-medium mb-2">Ganhos do Mês</h3>
                  <p className="text-3xl font-extrabold text-green-600">R$ 1.850,00</p>
                  <p className="text-sm text-gray-400 mt-2">Próximo repasse em 5 dias</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-gray-500 font-medium mb-2">Avaliação Média</h3>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-extrabold text-yellow-500">4.9</p>
                    <p className="text-lg pb-1">⭐</p>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Baseado em 42 avaliações</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
                <div className="text-5xl mb-4">💼</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bom trabalho, Maria!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Você tem faxinas agendadas para os próximos dias. Não esqueça de verificar a aba "Minha Agenda" para planejar sua semana.
                </p>
              </div>
            </>
          )}

          {activeTab === "agenda" && renderAgenda()}
          {activeTab === "servicos" && renderServicos()}
          {activeTab === "perfil" && renderPerfil()}
        </div>
      </main>
    </div>
  );
}
