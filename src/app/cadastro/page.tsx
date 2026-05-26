"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

// === Máscaras de input ===
function maskCpf(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskPhone(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

function maskCep(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, '$1-$2');
}

// === Etapas ===
const STEPS = [
  { number: 1, label: 'Dados Pessoais' },
  { number: 2, label: 'Acesso' },
  { number: 3, label: 'Endereço' },
];

export default function CadastroPage() {
  const router = useRouter();

  // Etapa atual
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 - Dados pessoais
  const [regNome, setRegNome] = useState('');
  const [regCpf, setRegCpf] = useState('');
  const [regTelefone, setRegTelefone] = useState('');

  // Step 2 - Acesso
  const [regEmail, setRegEmail] = useState('');
  const [regSenha, setRegSenha] = useState('');
  const [regPapel, setRegPapel] = useState<'CLIENTE' | 'DIARISTA'>('CLIENTE');

  // Step 3 - Endereço
  const [regCep, setRegCep] = useState('');
  const [regLogradouro, setRegLogradouro] = useState('');
  const [regNumero, setRegNumero] = useState('');
  const [regComplemento, setRegComplemento] = useState('');
  const [regBairro, setRegBairro] = useState('');
  const [regCidade, setRegCidade] = useState('');
  const [regEstado, setRegEstado] = useState('');

  // Loading & errors
  const [isLoading, setIsLoading] = useState(false);
  const [isCepLoading, setIsCepLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Validação por etapa
  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!regNome || regNome.trim().length < 3) errors.nome = 'Nome deve ter pelo menos 3 caracteres';
      const cpfDigits = regCpf.replace(/\D/g, '');
      if (cpfDigits.length !== 11) errors.cpf = 'CPF deve ter 11 dígitos';
      const phoneDigits = regTelefone.replace(/\D/g, '');
      if (phoneDigits.length < 10 || phoneDigits.length > 11) errors.telefone = 'Telefone inválido';
    }

    if (step === 2) {
      if (!regEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) errors.email = 'E-mail inválido';
      if (!regSenha || regSenha.length < 6) errors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (step === 3) {
      const cepDigits = regCep.replace(/\D/g, '');
      if (cepDigits.length !== 8) errors.cep = 'CEP deve ter 8 dígitos';
      if (!regLogradouro.trim()) errors.logradouro = 'Logradouro é obrigatório';
      if (!regNumero.trim()) errors.numero = 'Número é obrigatório';
      if (!regBairro.trim()) errors.bairro = 'Bairro é obrigatório';
      if (!regCidade.trim()) errors.cidade = 'Cidade é obrigatória';
      if (!regEstado || regEstado.length !== 2) errors.estado = 'Estado deve ter 2 caracteres (sigla)';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      setErrorMsg('');
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setFieldErrors({});
    setErrorMsg('');
  };

  // Busca de CEP via ViaCEP
  const handleCepBlur = async () => {
    const cepDigits = regCep.replace(/\D/g, '');
    if (cepDigits.length !== 8) return;

    setIsCepLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setRegLogradouro(data.logradouro || '');
        setRegBairro(data.bairro || '');
        setRegCidade(data.localidade || '');
        setRegEstado(data.uf || '');
      }
    } catch {
      // Falha silenciosa na busca do CEP
    } finally {
      setIsCepLoading(false);
    }
  };

  // Submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

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
          cpf: regCpf.replace(/\D/g, ''),
          papel: regPapel,
          telefone: {
            numero: regTelefone.replace(/\D/g, ''),
            tipo: 'CELULAR',
          },
          endereco: {
            cep: regCep.replace(/\D/g, ''),
            logradouro: regLogradouro,
            numero: regNumero,
            complemento: regComplemento || undefined,
            bairro: regBairro,
            cidade: regCidade,
            estado: regEstado.toUpperCase(),
          },
        })
      });

      const data = await res.json();

      if (!res.ok) {
        let msg = data.message;
        if (Array.isArray(msg)) msg = msg.join(', ');
        throw new Error(msg || 'Erro ao realizar cadastro.');
      }

      // Salvar token e dados do usuário
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario));

      // Redirecionar baseado no papel e validação
      if (data.usuario?.papel === 'DIARISTA') {
        router.push('/cadastro-confirmacao');
      } else {
        router.push('/dashboard-cliente');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Falha na conexão com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const InputClass = "w-full px-4 py-3.5 bg-slate-50/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder-slate-400 text-slate-900 font-medium";
  const LabelClass = "block text-sm font-bold text-slate-700 mb-2";
  const ErrorClass = "text-xs font-semibold text-red-500 mt-1.5";

  const progress = ((currentStep - 1) / (STEPS.length - 1)) * 100;

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

          {/* Barra de Progresso */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              {STEPS.map((step) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => {
                    if (step.number < currentStep) setCurrentStep(step.number);
                  }}
                  className={`flex items-center gap-2 text-sm font-bold transition-all ${step.number === currentStep
                      ? 'text-primary-600'
                      : step.number < currentStep
                        ? 'text-primary-400 cursor-pointer hover:text-primary-500'
                        : 'text-slate-300'
                    }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold border-2 transition-all ${step.number === currentStep
                      ? 'bg-primary-500 text-white border-primary-500 shadow-md shadow-primary-500/30'
                      : step.number < currentStep
                        ? 'bg-primary-100 text-primary-600 border-primary-200'
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}>
                    {step.number < currentStep ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : step.number}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              ))}
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-50 text-red-600 text-sm font-semibold rounded-xl border border-red-100 mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegister}>
            {/* === STEP 1: Dados Pessoais === */}
            {currentStep === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className={LabelClass}>Nome Completo</label>
                  <input
                    type="text"
                    value={regNome}
                    onChange={(e) => setRegNome(e.target.value)}
                    className={InputClass}
                    placeholder="Como deseja ser chamado(a)"
                  />
                  {fieldErrors.nome && <p className={ErrorClass}>{fieldErrors.nome}</p>}
                </div>

                <div>
                  <label className={LabelClass}>CPF</label>
                  <input
                    type="text"
                    value={regCpf}
                    onChange={(e) => setRegCpf(maskCpf(e.target.value))}
                    className={InputClass}
                    placeholder="000.000.000-00"
                    inputMode="numeric"
                  />
                  {fieldErrors.cpf && <p className={ErrorClass}>{fieldErrors.cpf}</p>}
                </div>

                <div>
                  <label className={LabelClass}>Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={regTelefone}
                    onChange={(e) => setRegTelefone(maskPhone(e.target.value))}
                    className={InputClass}
                    placeholder="(00) 00000-0000"
                    inputMode="numeric"
                  />
                  {fieldErrors.telefone && <p className={ErrorClass}>{fieldErrors.telefone}</p>}
                </div>

                <Button type="button" className="w-full mt-6 py-4 text-base" onClick={handleNext}>
                  Próximo
                  <svg className="w-4 h-4 ml-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            )}

            {/* === STEP 2: Acesso === */}
            {currentStep === 2 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Role Selection */}
                <div>
                  <label className={LabelClass}>Tipo de Conta</label>
                  <div className="flex bg-slate-100 p-1.5 rounded-xl shadow-inner">
                    <button
                      type="button"
                      onClick={() => setRegPapel('CLIENTE')}
                      className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${regPapel === 'CLIENTE' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      🏠 Sou Cliente
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegPapel('DIARISTA')}
                      className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${regPapel === 'DIARISTA' ? 'bg-primary-500 shadow text-white' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      ✨ Sou Diarista
                    </button>
                  </div>
                </div>

                <div>
                  <label className={LabelClass}>E-mail</label>
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className={InputClass}
                    placeholder="seu@email.com"
                  />
                  {fieldErrors.email && <p className={ErrorClass}>{fieldErrors.email}</p>}
                </div>

                <div>
                  <label className={LabelClass}>Senha</label>
                  <input
                    type="password"
                    value={regSenha}
                    onChange={(e) => setRegSenha(e.target.value)}
                    className={InputClass}
                    placeholder="Mínimo 6 caracteres"
                    minLength={6}
                  />
                  {fieldErrors.senha && <p className={ErrorClass}>{fieldErrors.senha}</p>}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 py-4 text-base font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Voltar
                  </button>
                  <Button type="button" className="flex-1 py-4 text-base" onClick={handleNext}>
                    Próximo
                    <svg className="w-4 h-4 ml-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}

            {/* === STEP 3: Endereço === */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className={LabelClass}>CEP</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={regCep}
                      onChange={(e) => setRegCep(maskCep(e.target.value))}
                      onBlur={handleCepBlur}
                      className={InputClass}
                      placeholder="00000-000"
                      inputMode="numeric"
                    />
                    {isCepLoading && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  {fieldErrors.cep && <p className={ErrorClass}>{fieldErrors.cep}</p>}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className={LabelClass}>Logradouro</label>
                    <input
                      type="text"
                      value={regLogradouro}
                      onChange={(e) => setRegLogradouro(e.target.value)}
                      className={InputClass}
                      placeholder="Rua, Av..."
                    />
                    {fieldErrors.logradouro && <p className={ErrorClass}>{fieldErrors.logradouro}</p>}
                  </div>
                  <div>
                    <label className={LabelClass}>Número</label>
                    <input
                      type="text"
                      value={regNumero}
                      onChange={(e) => setRegNumero(e.target.value)}
                      className={InputClass}
                      placeholder="Nº"
                    />
                    {fieldErrors.numero && <p className={ErrorClass}>{fieldErrors.numero}</p>}
                  </div>
                </div>

                <div>
                  <label className={LabelClass}>Complemento <span className="text-slate-400 font-normal">(opcional)</span></label>
                  <input
                    type="text"
                    value={regComplemento}
                    onChange={(e) => setRegComplemento(e.target.value)}
                    className={InputClass}
                    placeholder="Apto, bloco, sala..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={LabelClass}>Bairro</label>
                    <input
                      type="text"
                      value={regBairro}
                      onChange={(e) => setRegBairro(e.target.value)}
                      className={InputClass}
                      placeholder="Bairro"
                    />
                    {fieldErrors.bairro && <p className={ErrorClass}>{fieldErrors.bairro}</p>}
                  </div>
                  <div>
                    <label className={LabelClass}>Cidade</label>
                    <input
                      type="text"
                      value={regCidade}
                      onChange={(e) => setRegCidade(e.target.value)}
                      className={InputClass}
                      placeholder="Cidade"
                    />
                    {fieldErrors.cidade && <p className={ErrorClass}>{fieldErrors.cidade}</p>}
                  </div>
                </div>

                <div className="w-24">
                  <label className={LabelClass}>Estado</label>
                  <input
                    type="text"
                    value={regEstado}
                    onChange={(e) => setRegEstado(e.target.value.toUpperCase().slice(0, 2))}
                    className={`${InputClass} uppercase text-center tracking-widest`}
                    placeholder="UF"
                    maxLength={2}
                  />
                  {fieldErrors.estado && <p className={ErrorClass}>{fieldErrors.estado}</p>}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 py-4 text-base font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    Voltar
                  </button>
                  <Button type="submit" className="flex-1 py-4 text-base" isLoading={isLoading}>
                    Criar Conta
                  </Button>
                </div>
              </div>
            )}
          </form>

          <p className="text-center text-slate-500 text-sm font-medium mt-8">
            Já possui uma conta?{' '}
            <Link href="/home" className="text-primary-600 font-bold hover:underline">
              Voltar para a Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
