"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Appointment {
  id: string;
  day: number;
  month: number;
  year: number;
  time: string;
  title: string;
  professional: string;
  location: string;
  service: string;
  duration: string;
  price: string;
  status: string;
  color: string;
}

interface Service {
  id: string;
  name: string;
  active: boolean;
  basePrice: string;
}

const mockAppointments: Appointment[] = [
  { id: '1', day: 12, month: 4, year: 2026, time: '09:00', title: 'Faxina Padrão', professional: 'Maria Silva', location: 'Rua das Flores, 123 - Centro', service: 'Faxina Padrão', duration: '4 horas', price: 'R$ 150,00', status: 'Confirmado', color: 'blue' },
  { id: '2', day: 19, month: 4, year: 2026, time: '08:00', title: 'Limpeza Pesada', professional: 'Maria Silva', location: 'Av. Paulista, 1000 - Apto 45', service: 'Limpeza Pesada (Pós-obra)', duration: '8 horas', price: 'R$ 300,00', status: 'Em andamento', color: 'green' },
  { id: '3', day: 19, month: 4, year: 2026, time: '14:00', title: 'Passar Roupas', professional: 'Maria Silva', location: 'Av. Paulista, 1000 - Apto 45', service: 'Passadoria', duration: '4 horas', price: 'R$ 120,00', status: 'Confirmado', color: 'purple' },
  { id: '4', day: 25, month: 4, year: 2026, time: '13:00', title: 'Organização', professional: 'Maria Silva', location: 'Rua Augusta, 500', service: 'Organização de Armários', duration: '6 horas', price: 'R$ 200,00', status: 'Pendente', color: 'orange' },
];

export default function DashboardFaxineira() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1));
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
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

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

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
      
      const dayAppointments = mockAppointments.filter(app => app.day === d && app.month === month && app.year === year);
      
      days.push(
        <div 
          key={`day-${d}`} 
          className={`min-h-[80px] sm:min-h-[100px] p-2 border flex flex-col rounded-xl transition-all ${
            isToday 
              ? 'border-sky-300 bg-sky-50 shadow-sm' 
              : 'border-slate-200 bg-white hover:bg-slate-50'
          }`}
        >
          <div className="flex justify-end mb-1">
            <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${
              isToday ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-700'
            }`}>
              {d}
            </span>
          </div>
          
          <div className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar">
            {dayAppointments.map(app => (
              <div 
                key={app.id} 
                onClick={() => setSelectedAppointment(app)}
                className={`text-[10px] sm:text-xs truncate px-1.5 py-1 rounded font-medium cursor-pointer transition-colors hover:opacity-80
                  ${app.color === 'blue' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : ''}
                  ${app.color === 'green' ? 'bg-green-100 text-green-800 hover:bg-green-200' : ''}
                  ${app.color === 'purple' ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : ''}
                  ${app.color === 'orange' ? 'bg-orange-100 text-orange-800 hover:bg-orange-200' : ''}
                `}
                title={`${app.time} - ${app.title}`}
              >
                {app.time} - {app.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm transition-all max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 capitalize">
            {monthNames[month]} {year}
          </h3>
          <div className="flex space-x-2">
            <button 
              onClick={prevMonth} 
              className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-600 transition-colors border border-slate-200 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextMonth} 
              className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-600 transition-colors border border-slate-200 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center font-bold text-slate-500 text-xs sm:text-sm py-2">
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Meus Serviços</h2>
          <p className="text-slate-600">Configure os serviços que você oferece e defina seus valores base.</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">
            {services.map(service => (
              <div key={service.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border transition-all ${service.active ? 'border-sky-200 bg-sky-50/30' : 'border-slate-200 bg-slate-50/50 opacity-70'}`}>
                <div className="flex items-center mb-4 sm:mb-0">
                  <button 
                    onClick={() => toggleService(service.id)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 ${service.active ? 'bg-sky-600' : 'bg-slate-200'}`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${service.active ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                  <div className="ml-4">
                    <p className="text-base font-bold text-slate-900">{service.name}</p>
                    <p className="text-sm text-slate-500">{service.active ? 'Ativo' : 'Inativo'}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <label className="text-sm font-medium text-slate-700 mr-3">Valor Base (R$)</label>
                  <input 
                    type="text" 
                    value={service.basePrice}
                    onChange={(e) => handlePriceChange(service.id, e.target.value)}
                    disabled={!service.active}
                    className="w-28 px-3 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all text-slate-900 font-semibold disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 p-6 sm:p-8 border-t border-slate-100">
            <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm w-full sm:w-auto">
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
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Meu Perfil</h2>
          <p className="text-slate-600">Atualize suas informações pessoais e região de atendimento.</p>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
              <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold text-3xl shadow-inner border-4 border-white ring-2 ring-sky-50">
                M
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Maria Profissional</h3>
                <p className="text-slate-500 mb-3">Membro desde Abril de 2026</p>
                <button className="text-sm font-medium text-sky-600 bg-sky-50 px-4 py-2 rounded-lg hover:bg-sky-100 transition-colors">
                  Alterar Foto
                </button>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nome Completo</label>
                  <input type="text" defaultValue="Maria Profissional" className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm placeholder:text-slate-400" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
                  <input type="text" defaultValue="(11) 98765-4321" className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm placeholder:text-slate-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Bio / Apresentação</label>
                <textarea rows={4} defaultValue="Sou especialista em limpezas pós-obra e faxinas detalhadas. Adoro organizar espaços!" className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm placeholder:text-slate-400"></textarea>
                <p className="text-xs text-slate-500 mt-2">Esta mensagem aparecerá no seu perfil público para os clientes.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Regiões de Atendimento</label>
                <input type="text" defaultValue="Centro, Zona Sul, Pinheiros" className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm placeholder:text-slate-400" />
              </div>
            </form>
          </div>
          <div className="bg-slate-50 p-6 sm:p-8 border-t border-slate-100 flex justify-end">
            <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm w-full sm:w-auto">
              Salvar Perfil
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex relative">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <img src="/logo.png" alt="Faxinei Logo" className="w-8 h-8 object-contain mr-3" />
          <span className="font-extrabold text-xl text-slate-900 tracking-tight">Faxinei PRO</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("inicio")}
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "inicio" ? "bg-sky-50 text-sky-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> Início
          </button>
          <button 
            onClick={() => setActiveTab("agenda")}
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "agenda" ? "bg-sky-50 text-sky-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> Minha Agenda
          </button>
          <button 
            onClick={() => setActiveTab("servicos")}
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "servicos" ? "bg-sky-50 text-sky-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> Meus Serviços
          </button>
          <button 
            onClick={() => setActiveTab("perfil")}
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "perfil" ? "bg-sky-50 text-sky-700 shadow-sm" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> Meu Perfil
          </button>
        </nav>
        <div className="p-4 border-t border-slate-100">
          <Link href="/home" className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors">
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg> Sair
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col mb-[72px] md:mb-0">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-slate-800">
            {activeTab === "inicio" && "Painel do Profissional"}
            {activeTab === "agenda" && "Minha Agenda"}
            {activeTab === "servicos" && "Gerenciar Serviços"}
            {activeTab === "perfil" && "Meu Perfil"}
          </h2>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-sm text-sky-700 bg-sky-50 px-3 py-1 rounded-full font-bold border border-sky-100">
              Profissional
            </span>
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold border-2 border-white shadow-sm ring-2 ring-slate-100 cursor-pointer">
              M
            </div>
          </div>
        </header>
        
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto">
          {activeTab === "inicio" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-slate-500 font-medium mb-2">Trabalhos Pendentes</h3>
                  <p className="text-3xl font-extrabold text-sky-600">4</p>
                  <p className="text-sm text-slate-400 mt-2">Para este mês</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-slate-500 font-medium mb-2">Ganhos do Mês</h3>
                  <p className="text-3xl font-extrabold text-green-600">R$ 1.850,00</p>
                  <p className="text-sm text-slate-400 mt-2">Próximo repasse em 5 dias</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-slate-500 font-medium mb-2">Avaliação Média</h3>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-extrabold text-yellow-500">4.9</p>
                    <p className="text-lg pb-1">⭐</p>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">Baseado em 42 avaliações</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center">
                <svg className="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Bom trabalho, Maria!</h3>
                <p className="text-slate-600 max-w-md mx-auto">
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

      {/* Modal de Detalhes do Agendamento */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className={`p-6 text-white flex justify-between items-start ${
              selectedAppointment.color === 'blue' ? 'bg-blue-600' :
              selectedAppointment.color === 'green' ? 'bg-green-600' :
              selectedAppointment.color === 'purple' ? 'bg-purple-600' :
              'bg-orange-500'
            }`}>
              <div>
                <h3 className="text-2xl font-bold">{selectedAppointment.title}</h3>
                <p className="opacity-90 mt-1 flex items-center text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {selectedAppointment.day} de {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][selectedAppointment.month]} • {selectedAppointment.time} ({selectedAppointment.duration})
                </p>
              </div>
              <button 
                onClick={() => setSelectedAppointment(null)} 
                className="text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full p-1.5 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Cliente</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 mr-3">
                    {selectedAppointment.professional.charAt(0)}
                  </div>
                  <p className="font-semibold text-slate-900">{selectedAppointment.professional}</p>
                </div>
              </div>
              
              <div>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">Localização</p>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-slate-700">{selectedAppointment.location}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-slate-100 pt-5 mt-2">
                <div>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-1">Valor do Serviço</p>
                  <p className="font-bold text-2xl text-slate-900">{selectedAppointment.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-1">Status</p>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block border ${
                    selectedAppointment.status === 'Confirmado' ? 'bg-green-50 text-green-700 border-green-200' :
                    selectedAppointment.status === 'Em andamento' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-orange-50 text-orange-700 border-orange-200'
                  }`}>
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button 
                onClick={() => setSelectedAppointment(null)}
                className="flex-1 bg-white border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl hover:bg-slate-100 transition-colors shadow-sm"
              >
                Fechar
              </button>
              <button 
                className="flex-1 bg-sky-600 text-white font-semibold py-2.5 rounded-xl hover:bg-sky-700 transition-colors shadow-sm shadow-sky-200"
              >
                Gerenciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navegação Mobile Inferior (Apenas em telas pequenas) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setActiveTab("inicio")} 
          className={`flex flex-col items-center p-2 rounded-lg w-16 transition-colors ${activeTab === "inicio" ? "text-sky-600 bg-sky-50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="text-[10px] font-medium">Início</span>
        </button>
        <button 
          onClick={() => setActiveTab("agenda")} 
          className={`flex flex-col items-center p-2 rounded-lg w-16 transition-colors ${activeTab === "agenda" ? "text-sky-600 bg-sky-50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span className="text-[10px] font-medium">Agenda</span>
        </button>
        <button 
          onClick={() => setActiveTab("servicos")} 
          className={`flex flex-col items-center p-2 rounded-lg w-16 transition-colors ${activeTab === "servicos" ? "text-sky-600 bg-sky-50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
          <span className="text-[10px] font-medium">Serviços</span>
        </button>
        <button 
          onClick={() => setActiveTab("perfil")} 
          className={`flex flex-col items-center p-2 rounded-lg w-16 transition-colors ${activeTab === "perfil" ? "text-sky-600 bg-sky-50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}
        >
          <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>
    </div>
  );
}

