"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomSelect from "./CustomSelect";

export default function CadastroPage() {
    const router = useRouter();
    const [cpf, setCpf] = useState("");
    const [celular, setCelular] = useState("");
    const [numero, setNumero] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [uf, setUf] = useState("");

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
        <div className="min-h-screen flex flex-col bg-slate-50 p-4">
            <div className="w-full pt-2 md:pt-4 md:pl-4">
                <Link href="/home" className="inline-flex items-center text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 px-4 py-2 rounded-lg transition-all shadow-sm font-medium text-sm border border-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Voltar para a Home
                </Link>
            </div>
            <div className="flex-1 flex items-center justify-center py-8">
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-8 sm:p-10">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
                            Crie sua conta
                        </h1>
                        <p className="text-slate-500 text-sm">
                            Preencha os dados abaixo para se cadastrar no Faxinei
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Nome Completo */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="nome"
                                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                                >
                                    Nome completo
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400"
                                    placeholder="João da Silva"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="tipo_usuario"
                                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                                >
                                    Você deseja:
                                </label>
                                <CustomSelect
                                    id="tipo_usuario"
                                    required
                                    value={tipoUsuario}
                                    onChange={setTipoUsuario}
                                    placeholder="Selecione"
                                    options={[
                                        { value: "faxinar", label: "Quero faxinar" },
                                        { value: "contratar", label: "Quero contratar" }
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* CPF */}
                            <div>
                                <label
                                    htmlFor="cpf"
                                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                                >
                                    CPF
                                </label>
                                <input
                                    type="text"
                                    id="cpf"
                                    value={cpf}
                                    onChange={handleCpfChange}
                                    maxLength={14}
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400"
                                    placeholder="000.000.000-00"
                                    required
                                />
                            </div>

                            {/* Celular */}
                            <div>
                                <label
                                    htmlFor="celular"
                                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                                >
                                    Celular
                                </label>
                                <input
                                    type="tel"
                                    id="celular"
                                    value={celular}
                                    onChange={handleCelularChange}
                                    maxLength={15}
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400"
                                    placeholder="(99) 99999-9999"
                                    required
                                />
                            </div>
                        </div>

                        {/* Endereço Detalhado */}
                        <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-2">
                            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3">
                                Endereço
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="sm:col-span-2">
                                    <label htmlFor="logradouro" className="block text-xs font-semibold text-slate-700 mb-1">Logradouro</label>
                                    <input type="text" id="logradouro" className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400" placeholder="Rua, Avenida, etc." required />
                                </div>
                                <div>
                                    <label htmlFor="numero" className="block text-xs font-semibold text-slate-700 mb-1">Número</label>
                                    <input type="text" id="numero" value={numero} onChange={handleNumeroChange} className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400" placeholder="123" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="complemento" className="block text-xs font-semibold text-slate-700 mb-1">Complemento</label>
                                    <input type="text" id="complemento" className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400" placeholder="Apto, Bloco (opcional)" />
                                </div>
                                <div>
                                    <label htmlFor="bairro" className="block text-xs font-semibold text-slate-700 mb-1">Bairro</label>
                                    <input type="text" id="bairro" className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400" placeholder="Seu bairro" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <div className="sm:col-span-3">
                                    <label htmlFor="cidade" className="block text-xs font-semibold text-slate-700 mb-1">Cidade</label>
                                    <input type="text" id="cidade" className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400" placeholder="Sua cidade" required />
                                </div>
                                <div>
                                    <label htmlFor="uf" className="block text-xs font-semibold text-slate-700 mb-1">UF</label>
                                    <CustomSelect
                                        id="uf"
                                        required
                                        value={uf}
                                        onChange={setUf}
                                        placeholder="UF"
                                        options={["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"].map(sigla => ({ value: sigla, label: sigla }))}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* E-mail */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-slate-700 mb-1.5"
                            >
                                E-mail
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400"
                                placeholder="seu@email.com"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Senha */}
                            <div>
                                <label
                                    htmlFor="senha"
                                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                                >
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    id="senha"
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            {/* Confirmar Senha */}
                            <div>
                                <label
                                    htmlFor="confirmar-senha"
                                    className="block text-sm font-semibold text-slate-700 mb-1.5"
                                >
                                    Confirmar Senha
                                </label>
                                <input
                                    type="password"
                                    id="confirmar-senha"
                                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 mt-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer shadow-sm"
                        >
                            Criar conta
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-slate-100 pt-6">
                        <p className="text-sm text-slate-600">
                            Já tem uma conta?{" "}
                            <Link
                                href="/login"
                                className="text-sky-600 hover:text-sky-700 font-bold"
                            >
                                Faça login
                            </Link>
                        </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

