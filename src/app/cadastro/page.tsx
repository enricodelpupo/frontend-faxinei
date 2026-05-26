"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export default function CadastroPage() {
  const router = useRouter();

  const [regNome, setRegNome] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regSenha, setRegSenha] = useState('');
  const [regPapel, setRegPapel] = useState<'CLIENTE' | 'DIARISTA'>('CLIENTE');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('http://localhost:3333/api/auth/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: regNome,
          email: regEmail,
          senha: regSenha,
          papel: regPapel,
        })
      });

      const data = await res.json();

      if (!res.ok) {
        let msg = data.message;
        if (Array.isArray(msg)) msg = msg.join(', ');
        throw new Error(msg || 'Erro ao realizar cadastro.');
      }

      // Sucesso
      if (regPapel === 'DIARISTA') {
        router.push('/dashboard-faxineira');
      } else {
        router.push('/dashboard-cliente');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Falha na conexão com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const InputClass = "w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-slate-500 text-slate-900";

  return (
    <div className="min-h-screen flex font-sans">

      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 text-white">
        {/* Background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <Link href="/home" className="flex items-center gap-3 w-fit hover:opacity-90 transition-opacity">
            <div className="w-12 h-12 rounded-xl overflow-hidden relative bg-white shadow-lg flex-shrink-0">
              <Image src="/logo.png" alt="Faxinei Logo" fill className="object-cover" />
            </div>
            <span className="font-extrabold text-3xl tracking-tight">Faxinei</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            Sua casa impecável com apenas um clique.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Junte-se a milhares de clientes e profissionais na plataforma mais segura, rápida e confiável de serviços domésticos do Brasil.
          </p>
        </div>

        <div className="relative z-10 text-slate-400 text-sm font-medium">
          © {new Date().getFullYear()} Faxinei. Todos os direitos reservados.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-brand-light relative">
        <Link href="/home" className="absolute top-6 right-6 lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden relative border border-slate-200">
            <Image src="/logo.png" alt="Faxinei Logo" fill className="object-cover" />
          </div>
          <span className="font-bold text-xl text-slate-900 tracking-tight">Faxinei</span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Crie sua conta</h2>
            <p className="text-slate-500 text-base">Preencha os dados abaixo para começar.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {errorMsg && (
              <div className="p-4 bg-red-50 text-red-600 text-sm font-semibold rounded-xl border border-red-100">
                {errorMsg}
              </div>
            )}

            {/* Role Selection */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl mb-6 shadow-inner">
              <button
                type="button"
                onClick={() => setRegPapel('CLIENTE')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${regPapel === 'CLIENTE' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Sou Cliente
              </button>
              <button
                type="button"
                onClick={() => setRegPapel('DIARISTA')}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${regPapel === 'DIARISTA' ? 'bg-primary-500 shadow text-white' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Sou Diarista
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nome Completo</label>
              <input
                type="text"
                value={regNome}
                onChange={(e) => setRegNome(e.target.value)}
                required
                className={InputClass}
                placeholder="Como deseja ser chamado(a)"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">E-mail</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
                className={InputClass}
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Senha</label>
              <input
                type="password"
                value={regSenha}
                onChange={(e) => setRegSenha(e.target.value)}
                required
                className={InputClass}
                placeholder="Mínimo 6 caracteres"
                minLength={6}
              />
            </div>

            <Button type="submit" className="w-full mt-8 py-4 text-base" isLoading={isLoading}>
              Criar Conta Grátis
            </Button>

            <p className="text-center text-slate-500 text-sm font-medium mt-8">
              Já possui uma conta?{' '}
              <Link href="/home" className="text-primary-600 font-bold hover:underline">
                Voltar para a Home
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
