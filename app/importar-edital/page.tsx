"use client";

import { FormEvent, useState } from "react";
import AppNav from "@/components/AppNav";
import { createOpportunity } from "@/app/editais/actions";

type AnalysisResult = {
  fileName: string;
  textLength: number;
  rawTextPreview: string;
  opportunity: {
    title: string;
    institution: string;
    value: string;
    deadline: string;
    description: string;
    tags: string[];
    confidence: number;
  };
};

export default function ImportarEditalPage() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleAnalyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setErrorMessage("Selecione um PDF antes de analisar.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setAnalysis(null);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/analisar-edital", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorMessage(data.error ?? "Erro ao analisar PDF.");
      setIsLoading(false);
      return;
    }

    setAnalysis(data);
    setIsLoading(false);
  }

  return (
    <main className="min-h-screen text-[#21170F]">
      <AppNav />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <div className="inline-flex rotate-[-1deg] rounded-full border-2 border-[#21170F] bg-[#1F4E5F] px-4 py-1 text-xs font-black uppercase tracking-[0.25em] text-white shadow-[4px_4px_0_#21170F]">
            Análise automática
          </div>

          <h2 className="mt-5 max-w-4xl text-5xl font-black leading-tight md:text-6xl">
            Importe um edital em PDF e transforme em cadastro.
          </h2>

          <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#5F4A35]">
            Envie um PDF de edital cultural. O sistema extrai o texto, identifica
            informações importantes e sugere um cadastro editável.
          </p>
        </div>

        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border-4 border-[#21170F] bg-[#FFF4DA] p-6 shadow-[10px_10px_0_#21170F]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7A2E3A]">
              Upload
            </p>

            <h3 className="mt-2 text-3xl font-black">Arquivo PDF</h3>

            <p className="mt-3 text-sm font-bold leading-7 text-[#5F4A35]">
              Use um edital em PDF com texto selecionável. PDFs escaneados como
              imagem podem não funcionar nesta versão.
            </p>

            <form onSubmit={handleAnalyze} className="mt-6 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-black uppercase">
                  Selecione o edital
                </span>

                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(event) => {
                    setFile(event.target.files?.[0] ?? null);
                    setAnalysis(null);
                    setErrorMessage("");
                  }}
                  className="w-full rounded-2xl border-2 border-[#21170F] bg-white/70 px-4 py-3 text-sm font-bold shadow-[4px_4px_0_#21170F] file:mr-4 file:rounded-xl file:border-0 file:bg-[#D89B2B] file:px-4 file:py-2 file:font-black file:text-[#21170F]"
                />
              </label>

              {file ? (
                <div className="rounded-2xl border-2 border-[#21170F] bg-[#F7EAD2] p-4 shadow-[4px_4px_0_#21170F]">
                  <p className="text-xs font-black uppercase text-[#667247]">
                    Arquivo selecionado
                  </p>

                  <p className="mt-1 text-sm font-bold">{file.name}</p>
                </div>
              ) : null}

              {errorMessage ? (
                <div className="rounded-2xl border-2 border-[#21170F] bg-[#B85C38] p-4 text-white shadow-[4px_4px_0_#21170F]">
                  <p className="text-sm font-black">{errorMessage}</p>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl border-2 border-[#21170F] bg-[#1F4E5F] px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[6px_6px_0_#21170F] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#21170F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Analisando PDF..." : "Analisar edital"}
              </button>
            </form>

            <div className="mt-6 rounded-2xl border-2 border-[#21170F] bg-[#D89B2B] p-4 shadow-[4px_4px_0_#21170F]">
              <p className="text-sm font-black uppercase">Como funciona</p>

              <p className="mt-2 text-sm font-bold leading-7">
                O sistema extrai o texto do PDF, procura padrões como valor,
                prazo, instituição e palavras-chave culturais, depois monta uma
                sugestão de cadastro.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border-4 border-[#21170F] bg-[#FFF4DA] p-6 shadow-[10px_10px_0_#21170F]">
            {!analysis ? (
              <div className="flex min-h-[480px] items-center justify-center rounded-3xl border-4 border-dashed border-[#21170F] bg-[#F7EAD2] p-8 text-center">
                <div>
                  <p className="text-6xl">📄</p>

                  <h3 className="mt-5 text-3xl font-black">
                    A análise aparecerá aqui
                  </h3>

                  <p className="mt-3 max-w-md text-sm font-bold leading-7 text-[#5F4A35]">
                    Depois do upload, você poderá revisar os campos extraídos e
                    salvar o edital diretamente no banco.
                  </p>
                </div>
              </div>
            ) : (
              <div key={analysis.fileName}>
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7A2E3A]">
                      Resultado da análise
                    </p>

                    <h3 className="mt-2 text-3xl font-black">
                      Cadastro sugerido
                    </h3>

                    <p className="mt-2 text-sm font-bold text-[#5F4A35]">
                      Arquivo: {analysis.fileName}
                    </p>
                  </div>

                  <div className="w-fit rotate-2 rounded-2xl border-2 border-[#21170F] bg-[#667247] px-5 py-4 text-center text-white shadow-[4px_4px_0_#21170F]">
                    <p className="text-xs font-black uppercase">Confiança</p>

                    <strong className="text-3xl font-black">
                      {analysis.opportunity.confidence}%
                    </strong>
                  </div>
                </div>

                <form action={createOpportunity} className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-black uppercase">
                      Título do edital
                    </label>

                    <input
                      name="title"
                      defaultValue={analysis.opportunity.title}
                      required
                      className="w-full rounded-2xl border-2 border-[#21170F] bg-white/70 px-4 py-3 text-sm font-bold outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black uppercase">
                      Instituição
                    </label>

                    <input
                      name="institution"
                      defaultValue={analysis.opportunity.institution}
                      required
                      className="w-full rounded-2xl border-2 border-[#21170F] bg-white/70 px-4 py-3 text-sm font-bold outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black uppercase">
                      Valor
                    </label>

                    <input
                      name="value"
                      defaultValue={analysis.opportunity.value}
                      required
                      className="w-full rounded-2xl border-2 border-[#21170F] bg-white/70 px-4 py-3 text-sm font-bold outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black uppercase">
                      Prazo
                    </label>

                    <input
                      name="deadline"
                      type="date"
                      defaultValue={analysis.opportunity.deadline}
                      required
                      className="w-full rounded-2xl border-2 border-[#21170F] bg-white/70 px-4 py-3 text-sm font-bold outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-black uppercase">
                      Tags
                    </label>

                    <input
                      name="tags"
                      defaultValue={analysis.opportunity.tags.join(", ")}
                      required
                      className="w-full rounded-2xl border-2 border-[#21170F] bg-white/70 px-4 py-3 text-sm font-bold outline-none focus:bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-black uppercase">
                      Descrição
                    </label>

                    <textarea
                      name="description"
                      defaultValue={analysis.opportunity.description}
                      rows={5}
                      required
                      className="w-full rounded-2xl border-2 border-[#21170F] bg-white/70 px-4 py-3 text-sm font-bold outline-none focus:bg-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="rounded-2xl border-2 border-[#21170F] bg-[#B85C38] px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[6px_6px_0_#21170F] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#21170F]"
                    >
                      Salvar como edital
                    </button>
                  </div>
                </form>

                <details className="mt-8 rounded-3xl border-2 border-[#21170F] bg-[#F7EAD2] p-5 shadow-[5px_5px_0_#21170F]">
                  <summary className="cursor-pointer text-sm font-black uppercase">
                    Ver prévia do texto extraído
                  </summary>

                  <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap text-xs font-bold leading-6 text-[#5F4A35]">
                    {analysis.rawTextPreview}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}