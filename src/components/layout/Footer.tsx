import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-slate-900 py-12 text-center text-slate-400 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-slate-700 bg-white flex-shrink-0">
              <Image src="/logo.png" alt="Faxinei Logo" fill className="object-cover" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">Faxinei</span>
          </div>

        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Faxinei. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
