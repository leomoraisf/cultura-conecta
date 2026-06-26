import AppNav from "@/components/AppNav";
import { prisma } from "@/lib/prisma";
import { createOpportunity } from "./actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Opportunity = {
  id: string;
  title: string;
  institution: string;
  value: string;
  deadline: Date;
  description: string;
  tags: string[];
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export default async function EditaisPage() {
  const opportunities = (await prisma.opportunity.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })) as Opportunity[];

  return (
    <main className="min-h-screen text-[#241C15]">
      <AppNav />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="inline-flex rotate-[-1deg] rounded-full border-2 border-[#241C15] bg-[#D89B2B] px-4 py-1 text-xs font-black uppercase tracking-[0.25em] shadow-[4px_4px_0_#241C15]">
            Mapa de oportunidades
          </div>

          <h2 className="mt-5 max-w-4xl text-5xl font-black leading-tight md:text-6xl">
            Editais, chamadas e caminhos para financiar cultura.
          </h2>

          <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#4E3B2A]">
            Cadastre oportunidades culturais com seus requisitos, prazos e tags.
            Esses dados serão cruzados com os perfis dos artistas.
          </p>
        </div>

        <section className="mb-10 rounded-[2rem] border-4 border-[#241C15] bg-[#F6EAD2] p-6 shadow-[10px_10px_0_#241C15]">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7A2E3A]">
              Nova oportunidade
            </p>

            <h3 className="mt-2 text-3xl font-black">Novo edital</h3>

            <p className="mt-2 text-sm font-semibold text-[#4E3B2A]">
              Informe os dados do edital. As tags serão usadas para calcular a
              compatibilidade com artistas e coletivos.
            </p>
          </div>

          <form action={createOpportunity} className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-black uppercase">
                Título do edital
              </label>

              <input
                name="title"
                type="text"
                placeholder="Ex: Edital Música Independente MG"
                required
                className="w-full rounded-2xl border-2 border-[#241C15] bg-white/60 px-4 py-3 text-sm font-semibold text-[#241C15] outline-none placeholder:text-[#8A745B] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black uppercase">
                Instituição responsável
              </label>

              <input
                name="institution"
                type="text"
                placeholder="Ex: Secretaria Estadual de Cultura"
                required
                className="w-full rounded-2xl border-2 border-[#241C15] bg-white/60 px-4 py-3 text-sm font-semibold text-[#241C15] outline-none placeholder:text-[#8A745B] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black uppercase">
                Valor disponível
              </label>

              <input
                name="value"
                type="text"
                placeholder="Ex: R$ 80.000"
                required
                className="w-full rounded-2xl border-2 border-[#241C15] bg-white/60 px-4 py-3 text-sm font-semibold text-[#241C15] outline-none placeholder:text-[#8A745B] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black uppercase">
                Prazo de inscrição
              </label>

              <input
                name="deadline"
                type="date"
                required
                className="w-full rounded-2xl border-2 border-[#241C15] bg-white/60 px-4 py-3 text-sm font-semibold text-[#241C15] outline-none focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black uppercase">
                Área principal
              </label>

              <select
                name="area"
                className="w-full rounded-2xl border-2 border-[#241C15] bg-white/60 px-4 py-3 text-sm font-semibold text-[#241C15] outline-none focus:bg-white"
              >
                <option>Música</option>
                <option>Teatro</option>
                <option>Audiovisual</option>
                <option>Dança</option>
                <option>Literatura</option>
                <option>Cultura popular</option>
                <option>Multilinguagem</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black uppercase">
                Tags/requisitos do edital
              </label>

              <input
                name="tags"
                type="text"
                placeholder="Ex: música, juventude, Minas Gerais"
                required
                className="w-full rounded-2xl border-2 border-[#241C15] bg-white/60 px-4 py-3 text-sm font-semibold text-[#241C15] outline-none placeholder:text-[#8A745B] focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-black uppercase">
                Descrição do edital
              </label>

              <textarea
                name="description"
                placeholder="Descreva o objetivo, público-alvo e critérios da oportunidade."
                rows={4}
                required
                className="w-full rounded-2xl border-2 border-[#241C15] bg-white/60 px-4 py-3 text-sm font-semibold text-[#241C15] outline-none placeholder:text-[#8A745B] focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-2xl border-2 border-[#241C15] bg-[#D89B2B] px-7 py-4 text-sm font-black uppercase shadow-[6px_6px_0_#241C15] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#241C15]"
              >
                Cadastrar edital
              </button>
            </div>
          </form>
        </section>

        {opportunities.length === 0 ? (
          <div className="rounded-[2rem] border-4 border-dashed border-[#241C15] bg-[#F6EAD2] p-10 text-center shadow-[8px_8px_0_#241C15]">
            <h3 className="text-3xl font-black">Nenhum edital cadastrado</h3>

            <p className="mt-3 font-semibold text-[#4E3B2A]">
              Cadastre o primeiro edital usando o formulário acima.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {opportunities.map((opportunity: Opportunity) => (
              <article
                key={opportunity.id}
                className="rounded-[2rem] border-4 border-[#241C15] bg-[#F6EAD2] p-6 shadow-[8px_8px_0_#241C15] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_#241C15]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="w-fit rounded-full border-2 border-[#241C15] bg-[#1F4E5F] px-3 py-1 text-xs font-black uppercase text-white shadow-[3px_3px_0_#241C15]">
                      {opportunity.institution}
                    </p>

                    <h3 className="mt-5 text-3xl font-black">
                      {opportunity.title}
                    </h3>
                  </div>

                  <span className="rotate-3 rounded-full border-2 border-[#241C15] bg-[#5D6B3F] px-3 py-1 text-xs font-black uppercase text-white shadow-[3px_3px_0_#241C15]">
                    Aberto
                  </span>
                </div>

                <p className="mt-4 text-sm font-semibold leading-7 text-[#4E3B2A]">
                  {opportunity.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border-2 border-[#241C15] bg-[#D89B2B] p-4 shadow-[4px_4px_0_#241C15]">
                    <p className="text-xs font-black uppercase">Valor</p>
                    <strong className="mt-1 block text-lg font-black">
                      {opportunity.value}
                    </strong>
                  </div>

                  <div className="rounded-2xl border-2 border-[#241C15] bg-[#B85C38] p-4 text-white shadow-[4px_4px_0_#241C15]">
                    <p className="text-xs font-black uppercase">Prazo</p>
                    <strong className="mt-1 block text-lg font-black">
                      {formatDate(opportunity.deadline)}
                    </strong>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {opportunity.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border-2 border-[#241C15] bg-[#5D6B3F] px-3 py-1 text-xs font-black uppercase text-white shadow-[2px_2px_0_#241C15]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}