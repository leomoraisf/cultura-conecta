import AppNav from "@/components/AppNav";
import { prisma } from "@/lib/prisma";
import { createOpportunity } from "./actions";

export const runtime = "nodejs";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export default async function EditaisPage() {
  const opportunities = await prisma.opportunity.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#0B0B12] text-white">
      <AppNav />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-purple-300">
            Oportunidades culturais
          </p>

          <h2 className="mt-2 text-4xl font-bold">Editais cadastrados</h2>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Cadastre editais, chamadas públicas e oportunidades culturais para
            gerar recomendações compatíveis com os perfis dos artistas.
          </p>
        </div>

        <section className="mb-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold">Novo edital</h3>

            <p className="mt-2 text-sm text-zinc-400">
              Agora este formulário salva oportunidades reais no Supabase usando
              Prisma.
            </p>
          </div>

          <form action={createOpportunity} className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Título do edital
              </label>

              <input
                name="title"
                type="text"
                placeholder="Ex: Edital Música Independente MG"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Instituição responsável
              </label>

              <input
                name="institution"
                type="text"
                placeholder="Ex: Secretaria Estadual de Cultura"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Valor disponível
              </label>

              <input
                name="value"
                type="text"
                placeholder="Ex: R$ 80.000"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Prazo de inscrição
              </label>

              <input
                name="deadline"
                type="date"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Área principal
              </label>

              <select
                name="area"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
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
              <label className="mb-2 block text-sm text-zinc-400">
                Tags/requisitos do edital
              </label>

              <input
                name="tags"
                type="text"
                placeholder="Ex: música, juventude, Minas Gerais"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-400">
                Descrição do edital
              </label>

              <textarea
                name="description"
                placeholder="Descreva o objetivo, público-alvo e critérios da oportunidade."
                rows={4}
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-xl bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-400"
              >
                Cadastrar edital
              </button>
            </div>
          </form>
        </section>

        {opportunities.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-950 p-10 text-center">
            <h3 className="text-2xl font-bold">Nenhum edital cadastrado</h3>

            <p className="mt-3 text-zinc-400">
              Cadastre o primeiro edital usando o formulário acima.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {opportunities.map((opportunity) => (
              <article
                key={opportunity.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-zinc-400">
                      {opportunity.institution}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      {opportunity.title}
                    </h3>
                  </div>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-300">
                    Aberto
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-400">
                  {opportunity.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-sm">
                  <div>
                    <p className="text-zinc-500">Valor</p>
                    <strong>{opportunity.value}</strong>
                  </div>

                  <div>
                    <p className="text-zinc-500">Prazo</p>
                    <strong>{formatDate(opportunity.deadline)}</strong>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {opportunity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-200"
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