import React from "react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            {/* Header */}
            <header className="w-full bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/home" className="flex items-center gap-2 group">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-md">
                                    <span className="text-white font-bold text-xl">F</span>
                                </div>
                                <span className="font-extrabold text-2xl text-gray-900 tracking-tight">Faxinei</span>
                            </Link>
                        </div>

                        {/* Navegação Desktop */}
                        <nav className="hidden md:flex items-center gap-8">
                            <Link
                                href="/home"
                                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="#conheca"
                                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                            >
                                Conheça o Faxinei
                            </Link>

                            <Link
                                href="#faq"
                                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                            >
                                Central de Ajuda
                            </Link>

                            {/* Botões de Ação */}
                            <div className="flex items-center gap-4 ml-2 pl-8 border-l border-gray-200">
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                                >
                                    Entrar
                                </Link>
                                <Link
                                    href="/cadastro"
                                    className="text-sm font-semibold bg-indigo-600 text-white px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    Cadastre-se
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Seção Principal (Hero) para a página não ficar vazia */}
            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50/50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
                        ✨ O melhor aplicativo de limpeza
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                        Sua casa brilhando com <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">apenas um clique</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Conectamos você aos profissionais de limpeza mais bem avaliados da sua região. Praticidade, segurança e qualidade garantida.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/cadastro"
                            className="px-8 py-4 text-lg font-bold rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
                        >
                            Encontrar Diarista
                        </Link>
                        <Link
                            href="/cadastro"
                            className="px-8 py-4 text-lg font-bold rounded-full text-indigo-700 bg-white border-2 border-indigo-100 hover:border-indigo-600 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                        >
                            Quero Faxinar
                        </Link>
                    </div>
                </div>
            </main>

            {/* Seção Conheça o Faxinei */}
            <section id="conheca" className="py-24 bg-white px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 flex items-center justify-center gap-3">
                            🏠 Conheça o Faxinei
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            O Faxinei é uma plataforma digital inovadora desenvolvida para transformar e simplificar a contratação de serviços domésticos. Nossa missão é criar uma ponte ágil, segura e confiável entre profissionais autônomos e clientes que buscam por cuidados para o seu lar ou escritório.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Como funciona? */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Como funciona?</h3>
                            <div className="space-y-6">
                                <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 hover:shadow-md transition-shadow">
                                    <h4 className="text-xl font-bold text-indigo-700 mb-3 flex items-center gap-2">
                                        <span className="text-2xl">👤</span> Para Clientes
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed">
                                        Encontre profissionais qualificados e avaliados na sua região com apenas alguns cliques. Agende diárias de forma flexível e gerencie seus atendimentos com total praticidade.
                                    </p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 hover:shadow-md transition-shadow">
                                    <h4 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                                        <span className="text-2xl">✨</span> Para Profissionais
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed">
                                        Conecte-se diretamente com novas oportunidades de trabalho, gerencie sua própria agenda, aumente sua renda e tenha total autonomia sobre a sua rotina profissional.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Por que o Faxinei? */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Por que o Faxinei?</h3>
                            <div className="space-y-8">
                                <div className="flex gap-5">
                                    <div className="flex-shrink-0 w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm">
                                        🛡️
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">Segurança e Confiança</h4>
                                        <p className="text-gray-600 leading-relaxed">Perfis verificados e sistema de avaliações transparente para garantir a melhor experiência para ambos os lados.</p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="flex-shrink-0 w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm">
                                        📱
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">Interface Intuitiva</h4>
                                        <p className="text-gray-600 leading-relaxed">Um sistema moderno focado na facilidade de uso, permitindo que o agendamento e a comunicação aconteçam sem burocracia.</p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="flex-shrink-0 w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm">
                                        🌟
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">Valorização Profissional</h4>
                                        <p className="text-gray-600 leading-relaxed">Uma ferramenta que impulsiona o mercado de serviços domésticos, conectando quem precisa de ajuda com quem faz acontecer.</p>
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
