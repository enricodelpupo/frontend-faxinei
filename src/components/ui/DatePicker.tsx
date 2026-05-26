"use client";

import React, { useState, useEffect, useRef } from "react";

interface DatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  minDate?: string; // YYYY-MM-DD
}

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function DatePicker({ value, onChange, minDate }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"bottom" | "top">("bottom");

  // Data atual de navegação no calendário
  const [currentDate, setCurrentDate] = useState(() => {
    if (value) return new Date(value + "T00:00:00");
    return new Date();
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Fecha ao clicar fora e calcula posição do popover
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // Se o espaço abaixo for menor que 280px (altura aproximada) e houver mais espaço acima, abre pra cima
      if (spaceBelow < 280 && spaceAbove > spaceBelow) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Sincroniza currentDate se o value mudar externamente
  useEffect(() => {
    if (value) {
      setCurrentDate(new Date(value + "T00:00:00"));
    }
  }, [value]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectDate = (date: Date) => {
    const selectYear = date.getFullYear();
    const selectMonth = date.getMonth();
    const selectDay = date.getDate();

    const pad = (n: number) => String(n).padStart(2, "0");
    const formatted = `${selectYear}-${pad(selectMonth + 1)}-${pad(selectDay)}`;
    
    onChange(formatted);
    setIsOpen(false);
  };

  // Formatação para exibição no botão/input
  const getFormattedDisplay = () => {
    if (!value) return "Selecione uma data";
    const partes = value.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  // Funções auxiliares para montagem do calendário tradicional
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const totalDays = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  const prevMonthIndex = month === 0 ? 11 : month - 1;
  const prevYearIndex = month === 0 ? year - 1 : year;
  const totalDaysPrev = getDaysInMonth(prevYearIndex, prevMonthIndex);

  // Gerar array de células do calendário (grid de 42 dias tradicional)
  const calendarCells = [];
  
  // Dias do mês anterior
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    calendarCells.push({
      day: totalDaysPrev - i,
      currentMonth: false,
      dateObj: new Date(prevYearIndex, prevMonthIndex, totalDaysPrev - i)
    });
  }

  // Dias do mês atual
  for (let i = 1; i <= totalDays; i++) {
    calendarCells.push({
      day: i,
      currentMonth: true,
      dateObj: new Date(year, month, i)
    });
  }

  // Dias do próximo mês
  const remainingCells = 42 - calendarCells.length;
  const nextMonthIndex = month === 11 ? 0 : month + 1;
  const nextYearIndex = month === 11 ? year + 1 : year;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push({
      day: i,
      currentMonth: false,
      dateObj: new Date(nextYearIndex, nextMonthIndex, i)
    });
  }

  // Verificação de data mínima
  const isDateDisabled = (date: Date) => {
    if (!minDate) return false;
    
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);

    const minDateObj = new Date(minDate + "T00:00:00");
    minDateObj.setHours(0, 0, 0, 0);

    return compareDate < minDateObj;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    if (!value) return false;
    const selected = new Date(value + "T00:00:00");
    return date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear();
  };

  return (
    <div className="relative w-full font-sans" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-slate-900 font-medium text-left cursor-pointer"
      >
        <span className={value ? "text-slate-900 font-bold" : "text-slate-400"}>
          {getFormattedDisplay()}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute left-0 right-0 sm:right-auto sm:w-80 ${position === "top" ? "bottom-full mb-2" : "top-full mt-2"} bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-900/5 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200`}>
          {/* Header do Calendário */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="font-extrabold text-slate-900 text-sm tracking-tight">
              {meses[month]} de {year}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Cabeçalho da Semana */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {diasSemana.map((d) => (
              <span key={d} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {d}
              </span>
            ))}
          </div>

          {/* Grid de Dias */}
          <div className="grid grid-cols-7 gap-1">
            {calendarCells.map((cell, index) => {
              const disabled = isDateDisabled(cell.dateObj);
              const selected = isSelected(cell.dateObj);
              const current = isToday(cell.dateObj);

              return (
                <button
                  key={index}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDate(cell.dateObj)}
                  className={`h-9 w-9 text-xs font-bold rounded-xl flex items-center justify-center transition-all ${
                    !cell.currentMonth 
                      ? "text-slate-300 hover:bg-slate-50" 
                      : disabled 
                        ? "text-slate-200 pointer-events-none" 
                        : selected 
                          ? "bg-primary-600 text-white shadow-md shadow-primary-600/20" 
                          : current
                            ? "bg-primary-50 text-primary-600 ring-1 ring-primary-100"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                  } cursor-pointer`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
