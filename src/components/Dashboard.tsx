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

const mockAppointments: Appointment[] = [
  { id: '1', day: 12, month: 4, year: 2026, time: '09:00', title: 'Faxina Padrão', professional: 'Maria Silva', location: 'Rua das Flores, 123 - Centro', service: 'Faxina Padrão', duration: '4 horas', price: 'R$ 150,00', status: 'Confirmado', color: 'blue' },
  { id: '2', day: 19, month: 4, year: 2026, time: '08:00', title: 'Limpeza Pesada', professional: 'João Souza', location: 'Av. Paulista, 1000 - Apto 45', service: 'Limpeza Pesada (Pós-obra)', duration: '8 horas', price: 'R$ 300,00', status: 'Em andamento', color: 'green' },
  { id: '3', day: 19, month: 4, year: 2026, time: '14:00', title: 'Passar Roupas', professional: 'Ana Costa', location: 'Av. Paulista, 1000 - Apto 45', service: 'Passadoria', duration: '4 horas', price: 'R$ 120,00', status: 'Confirmado', color: 'purple' },
  { id: '4', day: 25, month: 4, year: 2026, time: '13:00', title: 'Organização', professional: 'Carla Dias', location: 'Rua Augusta, 500', service: 'Organização de Armários', duration: '6 horas', price: 'R$ 200,00', status: 'Pendente', color: 'orange' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1));
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

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

  const renderCalendar = () => {
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
              ? 'border-indigo-300 bg-indigo-50/50 shadow-sm' 
              : 'border-gray-200 bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex justify-end mb-1">
            <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${
              isToday ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-700'
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
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm transition-all max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 capitalize">
            {monthNames[month]} {year}
          </h3>
          <div className="flex space-x-2">
            <button 
              onClick={prevMonth} 
              className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-600 transition-colors border border-gray-200 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextMonth} 
              className="p-2 rounded-lg bg-white hover:bg-gray-100 text-gray-600 transition-colors border border-gray-200 shadow-sm"
            >
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

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 shadow-md shadow-indigo-200">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="font-extrabold text-xl text-gray-900 tracking-tight">Faxinei</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab("inicio")}
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "inicio" ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="mr-3">🏠</span> Início
          </button>
          <button 
            onClick={() => setActiveTab("agendamentos")}
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "agendamentos" ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="mr-3">📅</span> Meus Agendamentos
          </button>
          <button 
            onClick={() => setActiveTab("configuracoes")}
            className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "configuracoes" ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="mr-3">⚙️</span> Configurações
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link href="/home" className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors">
            <span className="mr-3">🚪</span> Sair
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab === "inicio" && "Painel de Controle"}
            {activeTab === "agendamentos" && "Meus Agendamentos"}
            {activeTab === "configuracoes" && "Configurações"}
          </h2>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-sm text-gray-500 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium border border-yellow-200">
              Modo Desenvolvedor
            </span>
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm ring-2 ring-gray-50 cursor-pointer">
              U
            </div>
          </div>
        </header>
        
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto relative">
          {activeTab === "inicio" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-gray-500 font-medium mb-2">Próxima Faxina</h3>
                  <p className="text-2xl font-bold text-gray-900">Nenhuma agendada</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-gray-500 font-medium mb-2">Saldo Atual</h3>
                  <p className="text-2xl font-bold text-gray-900">R$ 0,00</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-gray-500 font-medium mb-2">Avaliação</h3>
                  <p className="text-2xl font-bold text-gray-900">⭐ 0.0</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Bem-vindo(a) ao Faxinei</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Navegue pelo menu lateral para acessar seus agendamentos e ver o seu calendário atualizado.
                </p>
              </div>
            </>
          )}

          {activeTab === "agendamentos" && renderCalendar()}

          {activeTab === "configuracoes" && (
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center">
              <div className="text-5xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Configurações</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Área em desenvolvimento. Em breve você poderá alterar as configurações do seu perfil.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Detalhes do Agendamento */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
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
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">Profissional Responsável</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 mr-3">
                    {selectedAppointment.professional.charAt(0)}
                  </div>
                  <p className="font-semibold text-gray-900">{selectedAppointment.professional}</p>
                </div>
              </div>
              
              <div>
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1.5">Localização</p>
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-700">{selectedAppointment.location}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-gray-100 pt-5 mt-2">
                <div>
                  <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">Valor do Serviço</p>
                  <p className="font-bold text-2xl text-gray-900">{selectedAppointment.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">Status</p>
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
            
            <div className="p-5 bg-gray-50 border-t border-gray-100 flex gap-3">
              <button 
                onClick={() => setSelectedAppointment(null)}
                className="flex-1 bg-white border border-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
              >
                Fechar
              </button>
              <button 
                className="flex-1 bg-indigo-600 text-white font-semibold py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
              >
                Gerenciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
