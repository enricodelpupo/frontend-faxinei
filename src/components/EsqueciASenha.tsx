"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function EsqueciASenhaPage() {
    const [metodo, setMetodo] = useState<"email" | "celular">("email");

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
                <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
                                Recuperar Senha
                            </h1>
                            <p className="text-slate-500 text-sm">
                                Como deseja receber o link de recuperação?
                            </p>
                        </div>

                        <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                            <button
                                type="button"
                                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${metodo === "email"
                                    ? "bg-white text-sky-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                                    }`}
                                onClick={() => setMetodo("email")}
                            >
                                Usar e-mail
                            </button>
                            <button
                                type="button"
                                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${metodo === "celular"
                                    ? "bg-white text-sky-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                                    }`}
                                onClick={() => setMetodo("celular")}
                            >
                                Usar celular
                            </button>
                        </div>

                        <form className="space-y-5">
                            {metodo === "email" ? (
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-slate-700 mb-1.5"
                                    >
                                        E-mail cadastrado
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400"
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-semibold text-slate-700 mb-1.5"
                                    >
                                        Celular cadastrado
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 hover:border-slate-300 transition-all bg-white text-slate-900 text-sm outline-none placeholder:text-slate-400"
                                        placeholder="(99) 99999-9999"
                                        required
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 cursor-pointer mt-2 shadow-sm"
                            >
                                {metodo === "email" ? "Enviar e-mail de recuperação" : "Enviar SMS de recuperação"}
                            </button>
                        </form>

                        <div className="mt-8 text-center border-t border-slate-100 pt-6">
                            <p className="text-sm text-slate-600">
                                Lembrou sua senha?{" "}
                                <Link
                                    href="/login"
                                    className="text-sky-600 hover:text-sky-700 font-bold"
                                >
                                    Voltar para o login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

