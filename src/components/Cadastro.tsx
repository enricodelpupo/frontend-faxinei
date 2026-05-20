"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
    const router = useRouter();
    const [cpf, setCpf] = useState("");
    const [celular, setCelular] = useState("");
    const [numero, setNumero] = useState("");

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        setCpf(value);
    };

    const handleCelularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        setCelular(value);
    };

    const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        setNumero(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/dashboard");
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
            <Link href="/home" className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center text-indigo-700 hover:text-indigo-900 bg-white/50 hover:bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full transition-all shadow-sm font-medium text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Voltar para a Home
            </Link>
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 sm:p-10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Crie sua conta
                        </h1>
                        <p className="text-gray-500">
                            Preencha os dados abaixo para se cadastrar no Faxinei
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Nome Completo */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="nome"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Nome completo
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900"
                                    placeholder="João da Silva"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="tipo_usuario"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Você deseja:
                                </label>
                                <select
                                    id="tipo_usuario"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900"
                                    required
                                    defaultValue=""
                                >
                                    <option value="" disabled hidden>Selecione</option>
                                    <option value="faxinar">Quero faxinar</option>
                                    <option value="contratar">Quero contratar</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* CPF */}
                            <div>
                                <label
                                    htmlFor="cpf"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    CPF
                                </label>
                                <input
                                    type="text"
                                    id="cpf"
                                    value={cpf}
                                    onChange={handleCpfChange}
                                    maxLength={14}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900"
                                    placeholder="000.000.000-00"
                                    required
                                />
                            </div>

                            {/* Celular */}
                            <div>
                                <label
                                    htmlFor="celular"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Celular
                                </label>
                                <input
                                    type="tel"
                                    id="celular"
                                    value={celular}
                                    onChange={handleCelularChange}
                                    maxLength={15}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900"
                                    placeholder="(99) 99999-9999"
                                    required
                                />
                            </div>
                        </div>

                        {/* Endereço Detalhado */}
                        <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-3">
                                Endereço
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-2">
                                    <label htmlFor="logradouro" className="block text-xs font-medium text-gray-700 mb-1">Logradouro</label>
                                    <input type="text" id="logradouro" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900 text-sm" placeholder="Rua, Avenida, etc." required />
                                </div>
                                <div>
                                    <label htmlFor="numero" className="block text-xs font-medium text-gray-700 mb-1">Número</label>
                                    <input type="text" id="numero" value={numero} onChange={handleNumeroChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900 text-sm" placeholder="123" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="complemento" className="block text-xs font-medium text-gray-700 mb-1">Complemento</label>
                                    <input type="text" id="complemento" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900 text-sm" placeholder="Apto, Bloco (opcional)" />
                                </div>
                                <div>
                                    <label htmlFor="bairro" className="block text-xs font-medium text-gray-700 mb-1">Bairro</label>
                                    <input type="text" id="bairro" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900 text-sm" placeholder="Seu bairro" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <div className="sm:col-span-3">
                                    <label htmlFor="cidade" className="block text-xs font-medium text-gray-700 mb-1">Cidade</label>
                                    <input type="text" id="cidade" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900 text-sm" placeholder="Sua cidade" required />
                                </div>
                                <div>
                                    <label htmlFor="uf" className="block text-xs font-medium text-gray-700 mb-1">UF</label>
                                    <select id="uf" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900 text-sm" required defaultValue="">
                                        <option value="" disabled hidden>UF</option>
                                        <option value="AC">AC</option>
                                        <option value="AL">AL</option>
                                        <option value="AP">AP</option>
                                        <option value="AM">AM</option>
                                        <option value="BA">BA</option>
                                        <option value="CE">CE</option>
                                        <option value="DF">DF</option>
                                        <option value="ES">ES</option>
                                        <option value="GO">GO</option>
                                        <option value="MA">MA</option>
                                        <option value="MT">MT</option>
                                        <option value="MS">MS</option>
                                        <option value="MG">MG</option>
                                        <option value="PA">PA</option>
                                        <option value="PB">PB</option>
                                        <option value="PR">PR</option>
                                        <option value="PE">PE</option>
                                        <option value="PI">PI</option>
                                        <option value="RJ">RJ</option>
                                        <option value="RN">RN</option>
                                        <option value="RS">RS</option>
                                        <option value="RO">RO</option>
                                        <option value="RR">RR</option>
                                        <option value="SC">SC</option>
                                        <option value="SP">SP</option>
                                        <option value="SE">SE</option>
                                        <option value="TO">TO</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* E-mail */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900"
                                placeholder="seu@email.com"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Senha */}
                            <div>
                                <label
                                    htmlFor="senha"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    id="senha"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {/* Confirmar Senha */}
                            <div>
                                <label
                                    htmlFor="confirmar-senha"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Confirmar Senha
                                </label>
                                <input
                                    type="password"
                                    id="confirmar-senha"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 mt-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                        >
                            Criar conta
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Já tem uma conta?{" "}
                            <Link
                                href="/login"
                                className="text-indigo-600 hover:text-indigo-500 font-semibold"
                            >
                                Faça login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
