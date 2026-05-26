"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker } from "@/components/ui/DatePicker";

interface Diarista {
  id: number;
  nome: string;
  nota: number;
  faxinas: number;
  precoBase: number;
  iniciais: string;
  gradient: string;
}

const diaristasMock: Diarista[] = [
  { id: 1, nome: "Cleide Silva", nota: 4.9, faxinas: 124, precoBase: 120, iniciais: "CS", gradient: "from-blue-500 to-indigo-600" },
  { id: 2, nome: "Lúcia Santos", nota: 4.8, faxinas: 98, precoBase: 110, iniciais: "LS", gradient: "from-teal-500 to-emerald-600" },
  { id: 3, nome: "Maria Oliveira", nota: 4.9, faxinas: 210, precoBase: 135, iniciais: "MO", gradient: "from-purple-500 to-pink-600" },
  { id: 4, nome: "Ana Paula Souza", nota: 4.7, faxinas: 75, precoBase: 100, iniciais: "AS", gradient: "from-amber-500 to-orange-600" }
];

const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export default function AgendarFaxinaPage() {
  const router = useRouter();

  // Estados do fluxo de agendamento
  const [step, setStep] = useState(1);
  const [tipoFaxina, setTipoFaxina] = useState<"expressa" | "completa" | "pesada">("completa");
  const [dataFaxina, setDataFaxina] = useState("");
  const [periodo, setPeriodo] = useState<"manha" | "tarde">("manha");
  const [diaristaSelecionada, setDiaristaSelecionada] = useState<Diarista | null>(null);
  const [pagamento, setPagamento] = useState<"pix" | "cartao">("pix");
  const [descricao, setDescricao] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [isOpenUf, setIsOpenUf] = useState(false);
  const [descImovel, setDescImovel] = useState("");
  const [usarCadastrado, setUsarCadastrado] = useState(false);

  const handleToggleEnderecoCadastrado = () => {
    const newVal = !usarCadastrado;
    setUsarCadastrado(newVal);
    if (newVal) {
      setCep("01311-200");
      setLogradouro("Avenida Paulista");
      setNumero("1000");
      setComplemento("Apto 152");
      setBairro("Bela Vista");
      setCidade("São Paulo");
      setUf("SP");
    } else {
      setCep("");
      setLogradouro("");
      setNumero("");
      setComplemento("");
      setBairro("");
      setCidade("");
      setUf("");
    }
  };

  const calcularPrecoTotal = (diarista: Diarista) => {
    let base = diarista.precoBase;
    if (tipoFaxina === "expressa") base += 10;
    if (tipoFaxina === "pesada") base += 50;

    return base;
  };

  const formatarData = (dataStr: string) => {
    if (!dataStr) return "";
    const partes = dataStr.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  const getTipoFaxinaNome = (tipo: string) => {
    switch (tipo) {
      case "expressa": return "Faxina Expressa";
      case "pesada": return "Faxina Pesada";
      default: return "Faxina Completa";
    }
  };

  const resetarFluxo = () => {
    setStep(1);
    setTipoFaxina("completa");
    setDataFaxina("");
    setPeriodo("manha");
    setDiaristaSelecionada(null);
    setPagamento("pix");
    setDescricao("");
    setCep("");
    setLogradouro("");
    setNumero("");
    setComplemento("");
    setBairro("");
    setCidade("");
    setUf("");
    setDescImovel("");
    setUsarCadastrado(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 sm:p-8">
      {/* Step indicators */}
      <div className="mb-8 max-w-md mx-auto relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-slate-100 z-0"></div>
        <div className="absolute top-5 left-5 right-5 h-0.5 z-0">
          <div
            className="h-full bg-primary-500 transition-all duration-300"
            style={{ width: `${((Math.min(step, 4) - 1) / 3) * 100}%` }}
          ></div>
        </div>

        {/* Step Items */}
        <div className="flex items-center justify-between relative z-10">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center gap-1.5 w-20">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step > s
                ? "bg-primary-600 text-white shadow-md shadow-primary-600/10"
                : step === s
                  ? "bg-primary-500 text-white ring-4 ring-primary-50 shadow-md shadow-primary-500/10"
                  : "bg-white border-2 border-slate-200 text-slate-400"
                }`}>
                {step > s ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : s}
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider text-center ${step === s ? "text-primary-600" : "text-slate-400"}`}>
                {s === 1 ? "Serviço" : s === 2 ? "Profissional" : s === 3 ? "Endereço" : "Agendar"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PASSO 1: CONFIGURAÇÃO DO SERVIÇO */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-extrabold text-slate-900 mb-3">1. Selecione o tipo de faxina</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "expressa", nome: "Expressa", desc: "Perfeita para manutenção semanal rápida (até 3 horas)." },
                { id: "completa", nome: "Completa", desc: "Faxina completa e detalhada para todos os cômodos do imóvel (até 4 horas)." },
                { id: "pesada", nome: "Pesada", desc: "Limpeza profunda. Ideal para pós-obra ou faxina de mudança (até 6 horas)." }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTipoFaxina(t.id as any)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-start min-h-[7rem] ${tipoFaxina === t.id
                    ? "border-primary-500 bg-primary-50/30 ring-2 ring-primary-100"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                >
                  <h5 className={`font-bold text-base ${tipoFaxina === t.id ? "text-primary-700" : "text-slate-900"}`}>{t.nome}</h5>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <h4 className="text-lg font-extrabold text-slate-900 mb-4">2. Data e Período</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Data do Serviço</label>
                <DatePicker
                  value={dataFaxina}
                  onChange={setDataFaxina}
                  minDate={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Período</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPeriodo("manha")}
                    className={`py-3 rounded-xl border font-bold text-sm cursor-pointer transition-all ${periodo === "manha"
                      ? "border-primary-500 bg-primary-50/20 text-primary-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                  >
                    Manhã (8h - 12h)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriodo("tarde")}
                    className={`py-3 rounded-xl border font-bold text-sm cursor-pointer transition-all ${periodo === "tarde"
                      ? "border-primary-500 bg-primary-50/20 text-primary-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                  >
                    Tarde (13h - 17h)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!dataFaxina}
              className="px-8 py-4 font-bold bg-primary-600 text-white rounded-2xl hover:bg-primary-500 shadow-md shadow-primary-600/10 disabled:opacity-50 transition-all cursor-pointer"
            >
              Encontrar Profissionais
            </button>
          </div>
        </div>
      )}

      {/* PASSO 2: SELEÇÃO DA DIARISTA */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-extrabold text-slate-900">Profissionais disponíveis para {formatarData(dataFaxina)}</h4>
            <span className="text-xs font-bold bg-primary-50 text-primary-700 px-3 py-1 rounded-full">{getTipoFaxinaNome(tipoFaxina)}</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {diaristasMock.map((diarista) => {
              const valorTotal = calcularPrecoTotal(diarista);
              return (
                <div
                  key={diarista.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-primary-300 transition-all flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${diarista.gradient} text-white flex items-center justify-center font-extrabold text-lg shadow-md`}>
                      {diarista.iniciais}
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-900 text-base">{diarista.nome}</h5>
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        <span className="text-sm font-bold text-slate-800">{diarista.nota}</span>
                        <span className="text-xs text-slate-400 font-medium">({diarista.faxinas} faxinas)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between sm:justify-end w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <div className="text-right">
                      <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Valor total</span>
                      <span className="text-xl font-extrabold text-slate-900">R$ {valorTotal}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setDiaristaSelecionada(diarista);
                        setStep(3);
                      }}
                      className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-500 font-bold text-sm transition-all cursor-pointer"
                    >
                      Selecionar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-sm transition-all border border-slate-200 cursor-pointer"
            >
              Voltar
            </button>
          </div>
        </div>
      )}

      {/* PASSO 3: ENDEREÇO */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h4 className="text-lg font-extrabold text-slate-900 mb-2">3. Endereço</h4>
            <p className="text-sm text-slate-500 font-medium mb-4">Insira o endereço e especificações para a profissional se preparar melhor.</p>
          </div>

          {/* Toggle Endereço Cadastrado */}
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200/60 rounded-2xl mb-4">
            <div>
              <h5 className="text-sm font-bold text-slate-800">Usar endereço já cadastrado?</h5>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Preencher automaticamente com o seu endereço residencial padrão.</p>
            </div>
            <button
              type="button"
              onClick={handleToggleEnderecoCadastrado}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${usarCadastrado ? "bg-primary-600" : "bg-slate-200"
                }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${usarCadastrado ? "translate-x-5" : "translate-x-0"
                  }`}
              />
            </button>
          </div>

          {/* Form de Endereço */}
          <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200/50 space-y-4">
            <h5 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider pb-1 border-b border-slate-200/40">Endereço da faxina</h5>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="cep" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">CEP *</label>
                <input
                  id="cep"
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="00000-000"
                  disabled={usarCadastrado}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-slate-900 font-semibold text-sm disabled:bg-slate-100 disabled:text-slate-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="logradouro" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Logradouro (Rua/Av.) *</label>
                <input
                  id="logradouro"
                  type="text"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                  placeholder="Rua das Flores"
                  disabled={usarCadastrado}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-slate-900 font-semibold text-sm disabled:bg-slate-100 disabled:text-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="numero" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Número *</label>
                <input
                  id="numero"
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="123"
                  disabled={usarCadastrado}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-slate-900 font-semibold text-sm disabled:bg-slate-100 disabled:text-slate-500"
                />
              </div>
              <div>
                <label htmlFor="complemento" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Complemento</label>
                <input
                  id="complemento"
                  type="text"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  placeholder="Apto 12"
                  disabled={usarCadastrado}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-slate-900 font-semibold text-sm disabled:bg-slate-100 disabled:text-slate-500"
                />
              </div>
              <div>
                <label htmlFor="bairro" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Bairro *</label>
                <input
                  id="bairro"
                  type="text"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Centro"
                  disabled={usarCadastrado}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-slate-900 font-semibold text-sm disabled:bg-slate-100 disabled:text-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="cidade" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Cidade *</label>
                <input
                  id="cidade"
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Ex: São Paulo"
                  disabled={usarCadastrado}
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-slate-900 font-semibold text-sm disabled:bg-slate-100 disabled:text-slate-500"
                />
              </div>

              <div className="relative">
                <label htmlFor="uf" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">UF *</label>
                <div className="relative">
                  <button
                    id="uf"
                    type="button"
                    disabled={usarCadastrado}
                    onClick={() => setIsOpenUf(!isOpenUf)}
                    className={`w-full p-3 pr-10 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all font-semibold text-sm disabled:bg-slate-100 disabled:text-slate-500 bg-white text-left cursor-pointer min-h-[46px] relative ${uf ? "text-slate-900" : "text-slate-400"}`}
                  >
                    <span>{uf || "UF"}</span>
                    <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${isOpenUf ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {isOpenUf && !usarCadastrado && (
                    <>
                      <div className="fixed inset-0 z-20" onClick={() => setIsOpenUf(false)} />
                      <div className="absolute right-0 mt-1.5 w-full max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1.5 no-scrollbar animate-in fade-in slide-in-from-top-2 duration-150">
                        {UFS.map((state) => (
                          <button
                            key={state}
                            type="button"
                            onClick={() => {
                              setUf(state);
                              setIsOpenUf(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm font-semibold transition-all ${uf === state
                              ? "bg-primary-500 text-white"
                              : "text-slate-700 hover:bg-slate-50"
                              }`}
                          >
                            {state}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Descrições e Observações */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="descImovel" className="block text-xs font-bold text-slate-500 uppercase mb-1.5 font-sans">Descrição do Imóvel *</label>
                <textarea
                  id="descImovel"
                  rows={3}
                  value={descImovel}
                  onChange={(e) => setDescImovel(e.target.value)}
                  placeholder="Ex: Apartamento de 2 quartos, com varanda."
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-slate-900 font-medium text-sm resize-none"
                />
              </div>
              <div>
                <label htmlFor="descricao" className="block text-xs font-bold text-slate-500 uppercase mb-1.5 font-sans">Observações para a diarista (opcional)</label>
                <textarea
                  id="descricao"
                  rows={3}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Ex: Focar na cozinha; chave na portaria; cuidado com pet."
                  className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-slate-900 font-medium text-sm resize-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-sm transition-all border border-slate-200 cursor-pointer"
            >
              Voltar
            </button>

            <button
              type="button"
              onClick={() => setStep(4)}
              disabled={!cep || !logradouro || !numero || !bairro || !cidade || !uf || !descImovel}
              className="px-8 py-4 font-bold bg-primary-600 text-white rounded-2xl hover:bg-primary-500 shadow-md shadow-primary-600/10 disabled:opacity-50 transition-all cursor-pointer"
            >
              Ir para Agendamento
            </button>
          </div>
        </div>
      )}

      {/* PASSO 4: CONFIRMAÇÃO & PAGAMENTO */}
      {step === 4 && diaristaSelecionada && (
        <div className="space-y-6">
          <h4 className="text-lg font-extrabold text-slate-900 mb-2">Confirme os dados do agendamento</h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Resumo do Serviço */}
            <div className="md:col-span-2 flex flex-col">
              <div className="p-6 bg-brand-light rounded-2xl border border-slate-200/50 space-y-4 flex-1">
                <h5 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-200/50">Resumo da faxina</h5>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Tipo</span>
                    <span className="font-bold text-slate-800 text-sm">{getTipoFaxinaNome(tipoFaxina)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Data & Horário</span>
                    <span className="font-bold text-slate-800 text-sm">{formatarData(dataFaxina)} ({periodo === "manha" ? "Manhã" : "Tarde"})</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Endereço</span>
                    <span className="font-bold text-slate-800 text-sm block">
                      {logradouro}, {numero} {complemento ? `- ${complemento}` : ""} - {bairro} - {cidade}/{uf} (CEP: {cep})
                    </span>
                  </div>
                  {descImovel && (
                    <div className="col-span-2 pt-2 border-t border-slate-200/50">
                      <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Descrição do imóvel</span>
                      <span className="font-bold text-slate-800 text-sm">{descImovel}</span>
                    </div>
                  )}
                  {descricao && (
                    <div className="col-span-2 pt-2 border-t border-slate-200/50">
                      <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Observações do serviço</span>
                      <p className="text-slate-600 text-sm font-semibold mt-0.5">{descricao}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profissional e Preço */}
            <div className="flex flex-col">
              <div className="p-6 bg-brand-light rounded-2xl border border-slate-200/50 text-center space-y-4 flex-1">
                <h5 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider pb-2 border-b border-slate-200/50">Profissional selecionada</h5>

                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${diaristaSelecionada.gradient} text-white flex items-center justify-center font-extrabold text-lg shadow-md mb-3`}>
                    {diaristaSelecionada.iniciais}
                  </div>
                  <h6 className="font-bold text-slate-900 text-base">{diaristaSelecionada.nome}</h6>
                  <div className="flex items-center gap-1 mt-1 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span className="text-sm font-bold text-slate-800">{diaristaSelecionada.nota}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/50">
                  <span className="text-xs text-slate-500 font-bold block uppercase tracking-wider">Valor total do serviço</span>
                  <span className="text-3xl font-black text-slate-900 block mt-1">R$ {calcularPrecoTotal(diaristaSelecionada)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-sm transition-all border border-slate-200 cursor-pointer"
            >
              Voltar
            </button>

            <button
              type="button"
              onClick={() => setStep(5)}
              className="px-8 py-4 font-bold bg-primary-600 text-white rounded-2xl hover:bg-primary-500 shadow-md shadow-primary-600/10 transition-all cursor-pointer"
            >
              Solicitar Agendamento
            </button>
          </div>
        </div>
      )}

      {/* PASSO 5: CONFIRMAÇÃO DE SUCESSO */}
      {step === 5 && (
        <div className="text-center py-10 max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div>
            <h4 className="text-3xl font-black text-slate-900 tracking-tight">Solicitação Enviada!</h4>
            <p className="text-slate-600 font-medium mt-3 leading-relaxed">
              Sua faxina foi solicitada com sucesso! O agendamento com a profissional <strong className="text-slate-900 font-bold">{diaristaSelecionada?.nome}</strong> para o dia <strong className="text-slate-900 font-bold">{formatarData(dataFaxina)}</strong> ({periodo === "manha" ? "manhã" : "tarde"}) ainda precisa ser confirmado.
            </p>
            <p className="text-slate-500 font-medium mt-3 leading-relaxed text-sm">
              Você receberá uma notificação para efetuar o pagamento assim que a profissional confirmar o serviço.
            </p>
          </div>

          <div className="p-4 bg-brand-light rounded-2xl border border-slate-200 text-left">
            <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Código do Agendamento</span>
            <span className="font-extrabold text-slate-700 text-sm">#FAX-{Math.floor(1000 + Math.random() * 9000)}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              resetarFluxo();
              router.push("/dashboard-cliente");
            }}
            className="w-full py-4 font-bold bg-primary-600 text-white rounded-2xl hover:bg-primary-500 shadow-md shadow-primary-600/10 transition-all cursor-pointer"
          >
            Voltar para o Painel Geral
          </button>
        </div>
      )}
    </div>
  );
}
