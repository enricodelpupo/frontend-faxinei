import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DashboardSidebarProps {
  activeTab: string;
  items: SidebarItem[];
  userRole: 'Cliente' | 'Profissional';
  onLogout?: () => void;
  tipTitle?: string;
  tipDescription?: string;
}

export function DashboardSidebar({ 
  activeTab, 
  items, 
  userRole, 
  onLogout,
  tipTitle,
  tipDescription
}: DashboardSidebarProps) {
  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="w-72 bg-brand-dark text-slate-300 border border-slate-800 hidden md:flex flex-col z-20 m-4 rounded-3xl shadow-lg">
        <div className="h-24 flex items-center px-8">
            <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-slate-700 bg-white flex-shrink-0 mr-3 shadow-lg shadow-primary-500/30">
              <Image src="/logo.png" alt="Faxinei Logo" fill className="object-cover" />
            </div>
          <span className="font-extrabold text-2xl text-white tracking-tight">Faxinei</span>
        </div>
        
        <nav className="flex-1 p-5 space-y-3">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            const className = `w-full flex items-center px-5 py-4 rounded-2xl font-bold transition-all ${
              isActive 
                ? "bg-primary-600 text-white shadow-lg shadow-primary-600/25" 
                : "text-slate-400 hover:bg-slate-800/60 hover:text-white group"
            }`;
            
            const IconWrapper = ({ children }: { children: React.ReactNode }) => (
              <div className={`mr-3 flex items-center justify-center ${isActive ? "text-white" : "text-slate-500 group-hover:text-primary-400 group-hover:scale-110 transition-transform"}`}>
                {children}
              </div>
            );

            if (item.href) {
              return (
                <Link key={item.id} href={item.href} className={className}>
                  <IconWrapper>{item.icon}</IconWrapper>
                  {item.label}
                </Link>
              );
            }

            return (
              <button key={item.id} onClick={item.onClick} className={className}>
                <IconWrapper>{item.icon}</IconWrapper>
                {item.label}
              </button>
            );
          })}
        </nav>
        
        <div className="p-5">
          {tipTitle && tipDescription && (
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-4 mb-4 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-16 h-16 bg-primary-500/10 rounded-bl-full -mr-4 -mt-4"></div>
               <p className="text-xs font-bold text-primary-400 uppercase tracking-wider mb-1">{tipTitle}</p>
               <p className="text-sm font-medium text-slate-300">{tipDescription}</p>
            </div>
          )}
          <button 
            onClick={onLogout} 
            className="w-full flex items-center px-5 py-4 text-red-400 hover:bg-red-950/20 rounded-2xl font-bold transition-colors"
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg> 
            Sair da conta
          </button>
        </div>
      </aside>

      {/* Navegação Mobile Inferior */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-dark border-t border-slate-800 flex justify-around p-2.5 z-40 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.2)]">
        {items.map(item => {
          const isActive = activeTab === item.id;
          const className = `flex flex-col items-center p-2 rounded-2xl w-[4.5rem] transition-all ${
            isActive 
              ? "text-white bg-primary-600 shadow-md shadow-primary-600/30" 
              : "text-slate-400 hover:text-white hover:bg-slate-800/80"
          }`;

          const content = (
            <>
              <div className={`w-6 h-6 mb-1 flex items-center justify-center ${isActive ? "text-white" : "text-slate-400"}`}>
                {item.icon}
              </div>
              <span className="text-[10px] font-bold">{item.label}</span>
            </>
          );

          if (item.href) {
            return (
              <Link key={item.id} href={item.href} className={className}>
                {content}
              </Link>
            );
          }

          return (
            <button key={item.id} onClick={item.onClick} className={className}>
              {content}
            </button>
          );
        })}
      </div>
    </>
  );
}

export function DashboardHeader({ title, subtitle, userName, userRole }: { title: string, subtitle?: string, userName: string, userRole: string }) {
  return (
    <header className="h-20 sm:h-24 bg-transparent flex items-center justify-between px-4 sm:px-8 z-10">
      <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle && <p className="text-slate-500 font-medium text-sm mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        <button className="relative p-2 bg-white rounded-full shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        </button>
        <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-bold text-slate-900">{userName}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${userRole === 'Cliente' ? 'text-primary-600 bg-primary-50' : 'text-teal-600 bg-teal-50 border border-teal-100'}`}>{userRole}</span>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold border-2 border-white shadow-md cursor-pointer hover:shadow-lg transition-shadow ${userRole === 'Cliente' ? 'bg-gradient-to-r from-slate-800 to-slate-900' : 'bg-gradient-to-r from-primary-500 to-primary-700'}`}>
              {userName.charAt(0).toUpperCase()}
            </div>
        </div>
      </div>
    </header>
  );
}
