"use client";

import React from "react";

export default function MeuPerfilPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. PERFIL PÚBLICO (Foto e Experiência) - Pedido do usuário */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm">
        <h3 className="text-xl font-extrabold text-slate-900">Perfil Público</h3>
        <p className="text-sm text-slate-500 font-medium mt-1 mb-6">
          Adicione uma foto e conte um pouco sobre sua experiência para atrair mais oportunidades.
        </p>

        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="w-28 h-28 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 relative overflow-hidden group cursor-pointer hover:border-primary-500 hover:text-primary-500 transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-bold">Alterar foto</span>
              </div>
            </div>
            <button className="text-xs font-bold text-primary-500 hover:text-primary-700 transition-colors">
              Fazer upload
            </button>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                Sua Experiência / Sobre você
              </label>
              <textarea 
                rows={4}
                placeholder="Ex: Trabalho como diarista há 5 anos, sou especialista em faxina pesada e pós-obra. Sou caprichosa e pontual..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm font-medium text-slate-900 resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DADOS PESSOAIS */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm">
        <h3 className="text-xl font-extrabold text-slate-900 mb-6">Dados pessoais</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              Nome Completo
            </label>
            <input 
              type="text" 
              defaultValue="Maria Silva Souza"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm font-medium text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              CPF
            </label>
            <input 
              type="text" 
              defaultValue="123.456.789-00"
              disabled
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-500 cursor-not-allowed opacity-70"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              E-mail
            </label>
            <input 
              type="email" 
              defaultValue="maria@email.com"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm font-medium text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
              Data de Nascimento
            </label>
            <input 
              type="text" 
              defaultValue="14/03/1989"
              disabled
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-500 cursor-not-allowed opacity-70"
            />
          </div>
        </div>
      </div>

      {/* 3. TELEFONES / WHATSAPP */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Telefones / WhatsApp</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Marque o principal — é o número retornado quando alguém usa "Revelar Número" no seu perfil.
            </p>
          </div>
          <button className="shrink-0 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Adicionar
          </button>
        </div>

        <div className="space-y-4">
          {/* Item 1 - Principal */}
          <div className="flex items-center justify-between p-4 sm:p-5 border border-slate-100 rounded-2xl bg-white shadow-sm hover:border-slate-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-500 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-extrabold text-slate-900">(27) 99812-4477</p>
                <p className="text-xs text-slate-500 font-medium">WhatsApp pessoal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1 bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-xs font-bold border border-primary-100">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Principal
              </span>
              
              <div className="flex items-center gap-1 sm:border-l sm:border-slate-200 sm:pl-3">
                <button className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors" title="Editar">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between p-4 sm:p-5 border border-slate-100 rounded-2xl bg-white shadow-sm hover:border-slate-200 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-extrabold text-slate-900">(27) 3322-1144</p>
                <p className="text-xs text-slate-500 font-medium">Recado fixo</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 sm:border-l sm:border-slate-200 sm:pl-3">
                <button className="p-2 text-slate-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors" title="Editar">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
