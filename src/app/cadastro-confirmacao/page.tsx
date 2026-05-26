"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CadastroConfirmacaoPage() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('usuario');
    if (stored) {
      try {
        const usuario = JSON.parse(stored);
        setUserName(usuario.nome || '');
      } catch { }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-lg relative z-10">
        {/* Card */}
        <div className="bg-slate-700 rounded-3xl border border-slate-600 shadow-2xl shadow-black/50 p-8 sm:p-12 text-center">
          
          {/* Logo Simples */}
          <div className="mx-auto mb-6 w-16 h-16 rounded-2xl overflow-hidden border border-slate-600 shadow-sm relative animate-in zoom-in duration-500">
            <Image src="/logo.png" alt="Faxinei Logo" fill className="object-cover" />
          </div>

          {/* Ícone de sucesso simplificado */}
          <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-500 delay-100">
            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Título */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Cadastro recebido! 🎉
            </h1>

            {userName && (
              <p className="text-lg font-bold text-primary-400 mb-4">
                Olá, {userName}!
              </p>
            )}

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 font-medium">
              Entraremos em contato pelo seu <span className="font-bold text-white">celular</span> ou <span className="font-bold text-white">e-mail</span> para validar seu perfil profissional.
            </p>
          </div>

          {/* Info cards (Dark Mode) */}
          <div className="space-y-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-slate-600 text-left">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-700 shadow-sm">
                <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Prazo de análise</p>
                <p className="text-sm text-slate-300 font-medium">Até 48 horas úteis</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-800 rounded-xl border border-slate-600 text-left">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-700 shadow-sm">
                <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Fique de olho</p>
                <p className="text-sm text-slate-400 font-medium">Verifique suas notificações e caixa de e-mail</p>
              </div>
            </div>
          </div>

          {/* Botão */}
          <Link 
            href="/home"
            className="inline-flex items-center justify-center w-full py-4 px-6 bg-primary-600 text-white font-bold text-base rounded-xl hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Voltar para a Home
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm font-medium mt-6">
          © {new Date().getFullYear()} Faxinei. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
