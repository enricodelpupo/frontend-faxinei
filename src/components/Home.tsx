import React from "react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Header */}
            <header className="w-full bg-white shadow-sm sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/home" className="flex items-center gap-2 group">
                                <img src="/logo.png" alt="Faxinei Logo" className="w-10 h-10 object-contain transform group-hover:scale-105 transition-transform" />
                                <span className="font-extrabold text-2xl text-slate-900 tracking-tight">Faxinei</span>
                            </Link>
                        </div>

                        {/* Navegação Desktop */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/home" className="text-sm font-semibold text-sky-700 hover:text-sky-800 transition-colors">
                                Home
                            </Link>
                            <Link href="#conheca" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                                Conheça o Faxinei
                            </Link>
                            <Link href="#faq" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                                Central de Ajuda
                            </Link>

                            {/* Botões de Ação */}
                            <div className="flex items-center gap-4 ml-2 pl-8 border-l border-slate-200">
                                <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                                    Entrar
                                </Link>
                                <Link href="/cadastro" className="text-sm font-semibold bg-slate-900 text-white px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-all shadow-sm">
                                    Cadastre-se
                                </Link>
                            </div>
                        </nav>

                        {/* Navegação Mobile */}
                        <div className="flex md:hidden items-center gap-3">
                            <Link href="/login" className="text-sm font-medium text-slate-700">
                                Entrar
                            </Link>
                            <Link href="/cadastro" className="text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-lg shadow-sm">
                                Criar Conta
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Seção Principal (Hero) */}
            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-10 pb-20 md:pt-12 md:pb-24 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
                        Sua casa brilhando com <span className="text-sky-600">apenas um clique</span>
                    </h1>
                    <p className="mt-4 text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Conectamos você aos profissionais de limpeza mais bem avaliados da sua região. Praticidade, segurança e qualidade para o seu bem-estar.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/cadastro" className="px-8 py-3.5 text-base font-semibold rounded-lg text-white bg-sky-600 hover:bg-sky-700 shadow-sm transition-all text-center">
                            Encontrar Diarista
                        </Link>
                        <Link href="/cadastro" className="px-8 py-3.5 text-base font-semibold rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all text-center">
                            Trabalhar Já
                        </Link>
                    </div>
                </div>
            </main>

            {/* Seção Conheça o Faxinei */}
            <section id="conheca" className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
                            Por que escolher o Faxinei?
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            O Faxinei é uma plataforma digital inovadora desenvolvida para transformar e simplificar a contratação de serviços domésticos. Nossa missão é criar uma ponte ágil, segura e confiável.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Como funciona? */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-3">Como funciona?</h3>
                            <div className="space-y-4">
                                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        Para Clientes
                                    </h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Encontre profissionais qualificados e avaliados na sua região com apenas alguns cliques. Agende diárias de forma flexível e gerencie seus atendimentos com total praticidade.
                                    </p>
                                </div>
                                <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-sm">
                                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        Para Profissionais
                                    </h4>
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        Conecte-se diretamente com novas oportunidades de trabalho, gerencie sua própria agenda, aumente sua renda e tenha total autonomia sobre a sua rotina profissional.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Benefícios */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-3">Nossos diferenciais</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center border border-sky-100">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-1">Segurança e Confiança</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Perfis verificados e sistema de avaliações transparente para garantir a melhor experiência para ambos os lados.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center border border-sky-100">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-1">Plataforma Moderna</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Um sistema moderno focado na facilidade de uso, permitindo que o agendamento aconteça sem burocracia.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 w-12 h-12 bg-sky-50 text-sky-600 rounded-lg flex items-center justify-center border border-sky-100">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-1">Valorização Profissional</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">Uma ferramenta que impulsiona o mercado de serviços domésticos, conectando quem precisa com quem faz acontecer.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

