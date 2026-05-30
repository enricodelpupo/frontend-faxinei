"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

function maskCardNumber(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ');
}

function maskCardExpiry(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 4)
    .replace(/(\d{2})(\d)/, '$1/$2');
}

function maskCvv(value: string) {
  return value.replace(/\D/g, '').slice(0, 4);
}

// === Etapas ===
const STEPS = [
  { number: 1, label: 'Dados Pessoais' },
  { number: 2, label: 'Acesso' },
  { number: 3, label: 'Endereço' },
  { number: 4, label: 'Pagamento' },
];

// Dados dos planos
const PLANS = {
  basico: {
    name: 'Básico',
    price: '29,90',
    tag: 'Consumo Passivo',
    features: ['8 revelações de WhatsApp/mês', 'Catálogo de diaristas', 'Mural de oportunidades', 'Rollover de créditos'],
  },
  premium: {
    name: 'Premium',
    price: '59,90',
    tag: 'Acesso Total e Ativo',
    features: ['12 revelações de WhatsApp/mês', 'Tudo do Básico', 'Publicar no mural', 'Perfil destacado', 'Selo Premium', 'Clube de Vantagens'],
  },
};

function CadastroContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  // Step 4 - Pagamento
  const [selectedPlan, setSelectedPlan] = useState<'basico' | 'premium'>('basico');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Loading & errors
  const [isLoading, setIsLoading] = useState(false);
  const [isCepLoading, setIsCepLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Ler plano da URL
  useEffect(() => {
    const plano = searchParams.get('plano');
    if (plano === 'premium' || plano === 'basico') {
      setSelectedPlan(plano);
    }
  }, [searchParams]);

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

    if (step === 4) {
      const cardDigits = cardNumber.replace(/\D/g, '');
      if (cardDigits.length < 13 || cardDigits.length > 16) errors.cardNumber = 'Número do cartão inválido';
      const expiryDigits = cardExpiry.replace(/\D/g, '');
      if (expiryDigits.length !== 4) errors.cardExpiry = 'Data de validade inválida';
      else {
        const month = parseInt(expiryDigits.slice(0, 2));
        if (month < 1 || month > 12) errors.cardExpiry = 'Mês inválido';
      }
      if (cardCvv.length < 3) errors.cardCvv = 'CVV inválido';
      if (!cardName.trim() || cardName.trim().length < 3) errors.cardName = 'Nome do titular é obrigatório';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
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
    if (!validateStep(4)) return;

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
  const plan = PLANS[selectedPlan];

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
          <div className="mb-10">
            <div className="flex items-start justify-between relative">
              {/* Linha de conexão atrás dos circles */}
              <div className="absolute top-[14px] left-[28px] right-[28px] h-[3px] bg-slate-200 rounded-full" />
              <div
                className="absolute top-[14px] left-[28px] h-[3px] bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%`, maxWidth: 'calc(100% - 56px)' }}
              />

              {STEPS.map((step) => (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => {
                    if (step.number < currentStep) setCurrentStep(step.number);
                  }}
                  className="flex flex-col items-center gap-2 relative z-10 group"
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold border-2 transition-all ${step.number === currentStep
                      ? 'bg-primary-500 text-white border-primary-500 shadow-md shadow-primary-500/30 scale-110'
                      : step.number < currentStep
                        ? 'bg-primary-100 text-primary-600 border-primary-200 cursor-pointer group-hover:border-primary-400'
                        : 'bg-slate-100 text-slate-400 border-slate-200'
                    }`}>
                    {step.number < currentStep ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : step.number}
                  </span>
                  <span className={`text-[11px] font-bold transition-colors whitespace-nowrap ${step.number === currentStep
                      ? 'text-primary-600'
                      : step.number < currentStep
                        ? 'text-primary-400 group-hover:text-primary-500'
                        : 'text-slate-400'
                    }`}>
                    {step.label}
                  </span>
                </button>
              ))}
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
                  <Button type="button" className="flex-1 py-4 text-base" onClick={handleNext}>
                    Próximo
                    <svg className="w-4 h-4 ml-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}

            {/* === STEP 4: Pagamento === */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                {/* Seleção de Plano */}
                <div>
                  <label className={LabelClass}>Escolha seu plano</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('basico')}
                      className={`relative p-4 rounded-2xl border-2 transition-all text-left ${
                        selectedPlan === 'basico'
                          ? 'border-primary-500 bg-primary-50/50 shadow-md shadow-primary-500/10'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {selectedPlan === 'basico' && (
                        <div className="absolute top-3 right-3">
                          <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                        </div>
                      )}
                      <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">Básico</p>
                      <p className="text-2xl font-extrabold text-slate-900">R$ 29,90<span className="text-sm font-medium text-slate-500">/mês</span></p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPlan('premium')}
                      className={`relative p-4 rounded-2xl border-2 transition-all text-left ${
                        selectedPlan === 'premium'
                          ? 'border-primary-500 bg-slate-900 shadow-md shadow-primary-500/10'
                          : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                      }`}
                    >
                      {selectedPlan === 'premium' && (
                        <div className="absolute top-3 right-3">
                          <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-bold text-primary-400 uppercase tracking-wider">Premium</p>
                        <span className="text-[10px] font-bold bg-gradient-to-r from-primary-500 to-cyan-500 text-white px-2 py-0.5 rounded-full">Popular</span>
                      </div>
                      <p className="text-2xl font-extrabold text-white">R$ 59,90<span className="text-sm font-medium text-slate-400">/mês</span></p>
                    </button>
                  </div>
                </div>

                {/* Resumo do plano */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{plan.tag}</p>
                      <p className="text-base font-extrabold text-slate-900">Plano {plan.name}</p>
                    </div>
                    <p className="text-xl font-extrabold text-slate-900">R$ {plan.price}<span className="text-xs font-medium text-slate-500">/mês</span></p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {plan.features.map((feat, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1">
                        <svg className="w-3 h-3 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Dados do cartão */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    <label className="text-sm font-bold text-slate-700">Dados do Cartão</label>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={LabelClass}>Número do Cartão</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(maskCardNumber(e.target.value))}
                          className={InputClass}
                          placeholder="0000 0000 0000 0000"
                          inputMode="numeric"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                          <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-[8px] font-bold">VISA</span>
                          </div>
                          <div className="w-8 h-5 bg-red-500 rounded flex items-center justify-center">
                            <div className="flex -space-x-1">
                              <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                              <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                      {fieldErrors.cardNumber && <p className={ErrorClass}>{fieldErrors.cardNumber}</p>}
                    </div>

                    <div>
                      <label className={LabelClass}>Nome do Titular</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        className={`${InputClass} uppercase tracking-wide`}
                        placeholder="NOME IMPRESSO NO CARTÃO"
                      />
                      {fieldErrors.cardName && <p className={ErrorClass}>{fieldErrors.cardName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={LabelClass}>Validade</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(maskCardExpiry(e.target.value))}
                          className={InputClass}
                          placeholder="MM/AA"
                          inputMode="numeric"
                        />
                        {fieldErrors.cardExpiry && <p className={ErrorClass}>{fieldErrors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label className={LabelClass}>CVV</label>
                        <input
                          type="text"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(maskCvv(e.target.value))}
                          className={InputClass}
                          placeholder="000"
                          inputMode="numeric"
                        />
                        {fieldErrors.cardCvv && <p className={ErrorClass}>{fieldErrors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selo de segurança */}
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-100 rounded-xl">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-xs font-semibold text-green-700">Pagamento 100% seguro com criptografia de ponta a ponta.</p>
                </div>

                <div className="flex gap-3 mt-2">
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
                    <svg className="w-4 h-4 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Assinar e Criar Conta
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

export default function CadastroPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <CadastroContent />
    </Suspense>
  );
}

