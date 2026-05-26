"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface AuthModalsProps {
  isLoginOpen: boolean;
  onCloseLogin: () => void;
}

export function AuthModals({
  isLoginOpen,
  onCloseLogin,
}: AuthModalsProps) {
  const router = useRouter();

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('http://localhost:3333/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, senha: loginSenha })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Erro ao realizar login.');
      }

      // Sucesso no login
      onCloseLogin();
      
      if (data.usuario?.papel === 'DIARISTA') {
        router.push('/dashboard-faxineira');
      } else {
        router.push('/dashboard-cliente');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Falha na conexão com o servidor.');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const InputClass = "w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-slate-500 text-slate-900";

  return (
    <Modal isOpen={isLoginOpen} onClose={onCloseLogin} title="Acesse sua Conta">
      <div className="p-6 sm:p-8">
        <form onSubmit={handleLogin} className="space-y-5">
          {loginError && (
            <div className="p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-lg border border-red-100">
              {loginError}
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">E-mail</label>
            <input 
              type="email" 
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
              className={InputClass}
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Senha</label>
            <input 
              type="password" 
              value={loginSenha}
              onChange={(e) => setLoginSenha(e.target.value)}
              required
              className={InputClass}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full mt-6 py-4 text-base" isLoading={isLoginLoading}>
            Entrar
          </Button>
          <p className="text-center text-slate-500 text-sm font-medium mt-6">
            Ainda não tem conta?{' '}
            <Link href="/cadastro" onClick={onCloseLogin} className="text-primary-600 font-bold hover:underline">
              Cadastre-se agora
            </Link>
          </p>
        </form>
      </div>
    </Modal>
  );
}
