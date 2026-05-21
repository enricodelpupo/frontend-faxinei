"use client";

import React from "react";

interface CustomDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomDatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data",
  className = ""
}: CustomDatePickerProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none w-full px-4 py-3 pr-10 rounded-2xl border border-slate-200 shadow-sm bg-white text-sm outline-none transition-all cursor-pointer hover:border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${!value ? "text-transparent" : "text-slate-900"}`}
      />
      
      {/* Placeholder Customizado (O input type="date" não suporta placeholder nativamente no mobile) */}
      {!value && (
        <span className="absolute left-4 text-sm text-slate-400 pointer-events-none truncate max-w-[70%]">
          {placeholder}
        </span>
      )}
      
      {/* Ícone de Calendário Customizado (Fica por cima do input mas pointer-events-none para não bloquear o clique) */}
      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500 bg-white mr-1 my-1 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  );
}
