"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthModals } from "@/components/auth/AuthModals";

export default function HomePage() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const openLogin = () => {
        setIsLoginOpen(true);
    };

    return (
        <div className="min-h-screen bg-brand-light flex flex-col font-sans relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-primary-200/30 rounded-full blur-3xl pointer-events-none" />

            <Header 
                onLoginClick={openLogin}
            />

            <AuthModals 
                isLoginOpen={isLoginOpen}
                onCloseLogin={() => setIsLoginOpen(false)}
            />

            {/* Seção Principal (Hero) */}
            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32 relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.15]">
                        Sua casa impecável <br className="hidden md:block"/>
                        com <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-cyan-500">apenas um clique</span>
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Conectamos você aos profissionais de limpeza mais bem avaliados da região. Segurança, praticidade e aquele cheirinho de limpeza garantido.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Link href="/cadastro" className="px-8 py-4 text-base font-bold rounded-2xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-xl shadow-primary-500/30 hover:shadow-primary-500/40 transform hover:-translate-y-1 transition-all duration-300 text-center flex items-center justify-center gap-2">
                            Quero Faxina
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <Link href="/cadastro" className="px-8 py-4 text-base font-bold rounded-2xl text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 text-center">
                            Sou Diarista
                        </Link>
                    </div>
                </div>
            </main>

            {/* Seção Conheça o Faxinei */}
            <section id="conheca" className="py-24 bg-brand-light px-4 sm:px-6 lg:px-8 relative z-10 border-t border-slate-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            A revolução nos serviços domésticos
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Esqueça a burocracia. O Faxinei funciona como uma vitrine desenhada para criar uma conexão perfeita e ágil entre contratantes e profissionais de limpeza.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Para Clientes */}
                        <div className="group relative bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">Para sua Casa</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Encontre a profissional ideal em poucos cliques. Entre em contato diretamente pelo WhatsApp, combine os detalhes do serviço por fora e tenha o controle total de quem você contrata.
                                </p>
                            </div>
                        </div>

                        {/* Para Profissionais */}
                        <div className="group relative bg-brand-dark p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-slate-800">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-slate-800/80 border border-slate-700/50 text-primary-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Para seu Negócio</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Seja dono(a) da sua rotina. Exponha seu perfil na nossa vitrine, receba contatos direto no seu WhatsApp, construa uma reputação de 5 estrelas e garanta sua renda com total autonomia.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Diferenciais */}
            <section id="diferenciais" className="py-24 bg-brand-light text-slate-900 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-slate-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Por que escolher o Faxinei?
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Tecnologia e segurança a serviço da sua tranquilidade.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-200 hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">Encontrar Profissionais</h4>
                            <p className="text-slate-600 leading-relaxed">Busque e encontre os profissionais ideais para a sua necessidade de forma rápida e prática.</p>
                        </div>
                        <div className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-200 hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">Revelar Número</h4>
                            <p className="text-slate-600 leading-relaxed">Libere o contato de WhatsApp do profissional apenas quando tiver real interesse no serviço.</p>
                        </div>
                        <div className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary-200 hover:-translate-y-1 transition-all duration-300">
                            <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">Avaliar Atendimentos</h4>
                            <p className="text-slate-600 leading-relaxed">Compartilhe sua experiência e avalie o serviço prestado para ajudar a comunidade.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção de Planos */}
            <section id="planos" className="py-24 bg-brand-light px-4 sm:px-6 lg:px-8 relative z-10 border-t border-slate-200/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                            Escolha o plano ideal para você
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Planos pensados para conectar você aos melhores profissionais com total transparência e controle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
                        {/* Plano Básico */}
                        <div className="group relative bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                            <div>
                                <p className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-3">Consumo Passivo</p>
                                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Básico</h3>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-sm font-medium text-slate-500">R$</span>
                                    <span className="text-5xl md:text-6xl font-extrabold text-slate-900">29,90</span>
                                    <span className="text-base font-medium text-slate-500">/mês</span>
                                </div>
                                <p className="text-sm text-slate-500 mb-8">Franquia mensal de <strong className="text-slate-700">8 números</strong> revelados</p>
                            </div>

                            <div className="flex-grow">
                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-slate-700">Visualizar catálogo de diaristas</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-slate-700">Visualizar mural de oportunidades</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-slate-700">8 revelações de WhatsApp por mês</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-slate-700">Rollover de créditos não usados</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-slate-700">Histórico permanente de contatos</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                        <span className="text-slate-400">Publicar vagas no mural</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-slate-300 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                        <span className="text-slate-400">Aparecer na vitrine de busca</span>
                                    </li>
                                </ul>
                            </div>

                            <Link href="/cadastro?plano=basico" className="block w-full py-4 px-6 text-base font-bold rounded-2xl text-slate-900 bg-white border-2 border-slate-900 hover:bg-slate-900 hover:text-white shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-center">
                                Assinar Básico
                            </Link>
                        </div>

                        {/* Plano Premium */}
                        <div className="group relative bg-brand-dark p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 border border-slate-800 flex flex-col overflow-hidden">
                            {/* Badge Mais Escolhido */}
                            <div className="absolute top-6 right-6 z-20">
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-primary-500 to-cyan-500 text-white shadow-lg shadow-primary-500/30">
                                    Mais escolhido
                                </span>
                            </div>

                            {/* Glow effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

                            <div className="relative z-10">
                                <p className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-3">Acesso Total e Ativo</p>
                                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Premium</h3>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-sm font-medium text-slate-400">R$</span>
                                    <span className="text-5xl md:text-6xl font-extrabold text-white">59,90</span>
                                    <span className="text-base font-medium text-slate-400">/mês</span>
                                </div>
                                <p className="text-sm text-slate-400 mb-8">Franquia mensal de <strong className="text-slate-200">12 números</strong> revelados</p>
                            </div>

                            <div className="flex-grow relative z-10">
                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-slate-200 font-semibold">Tudo do Básico</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-slate-200">Publicar demandas e disponibilidade no mural</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-slate-200">Perfil destacado na vitrine de busca</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-slate-200">12 revelações de WhatsApp por mês</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-slate-200">Selo Premium no perfil</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                        <span className="text-slate-200">Acesso completo ao Clube de Vantagens</span>
                                    </li>
                                </ul>
                            </div>

                            <Link href="/cadastro?plano=premium" className="relative z-10 block w-full py-4 px-6 text-base font-bold rounded-2xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-xl shadow-primary-500/30 hover:shadow-primary-500/40 transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer text-center">
                                Assinar Premium
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

