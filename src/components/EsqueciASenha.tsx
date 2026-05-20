"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function EsqueciASenhaPage() {
    const [metodo, setMetodo] = useState<"email" | "celular">("email");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Recuperar Senha
                        </h1>
                        <p className="text-gray-500">
                            Como deseja receber o link de recuperação?
                        </p>
                    </div>

                    <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                        <button
                            type="button"
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${metodo === "email"
                                ? "bg-white text-indigo-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setMetodo("email")}
                        >
                            Usar e-mail
                        </button>
                        <button
                            type="button"
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${metodo === "celular"
                                ? "bg-white text-indigo-600 shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                            onClick={() => setMetodo("celular")}
                        >
                            Usar celular
                        </button>
                    </div>

                    <form className="space-y-6">
                        {metodo === "email" ? (
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    E-mail cadastrado
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900"
                                    placeholder="seu@email.com"
                                    required
                                />
                            </div>
                        ) : (
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Celular cadastrado
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-colors bg-white text-gray-900"
                                    placeholder="(99) 99999-9999"
                                    required
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
                        >
                            {metodo === "email" ? "Enviar e-mail de recuperação" : "Enviar SMS de recuperação"}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Lembrou sua senha?{" "}
                            <Link
                                href="/login"
                                className="text-indigo-600 hover:text-indigo-500 font-semibold"
                            >
                                Voltar para o login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
