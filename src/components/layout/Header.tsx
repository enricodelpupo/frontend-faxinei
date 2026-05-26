import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface HeaderProps {
  onLoginClick?: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
  return (
    <header className="w-full sticky top-0 z-50 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-primary-500/30 transform group-hover:scale-105 transition-all duration-300 relative border border-slate-700 bg-white flex-shrink-0">
                <Image src="/logo.png" alt="Faxinei Logo" fill className="object-cover" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">Faxinei</span>
            </Link>
          </div>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/home" className="text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors">
              Início
            </Link>
            <Link href="#conheca" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Como Funciona
            </Link>
            <Link href="#diferenciais" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Diferenciais
            </Link>

            {/* Botões de Ação */}
            <div className="flex items-center gap-4 ml-2 pl-8 border-l border-slate-700">
              <button
                type="button"
                onClick={onLoginClick}
                className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg px-2 py-1"
              >
                Entrar
              </button>
              <Link
                href="/cadastro"
                className="text-sm font-bold bg-primary-600 text-white px-6 py-2.5 rounded-xl hover:bg-primary-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Criar Conta
              </Link>
            </div>
          </nav>

          {/* Navegação Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={onLoginClick}
              className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-white focus:outline-none"
            >
              Entrar
            </button>
            <Link
              href="/cadastro"
              className="text-sm font-bold bg-primary-600 text-white px-4 py-2 rounded-xl shadow-md focus:outline-none"
            >
              Criar Conta
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
