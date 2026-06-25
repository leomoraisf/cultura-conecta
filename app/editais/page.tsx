import AppNav from "@/components/AppNav";

const opportunities = [
  {
    title: "Edital Música Independente MG",
    institution: "Secretaria Estadual de Cultura",
    value: "R$ 80.000",
    deadline: "15/07/2026",
    description:
      "Apoio a projetos musicais independentes com foco em juventude, diversidade regional e circulação cultural.",
    tags: ["música", "juventude", "Minas Gerais"],
  },
  {
    title: "Fomento Audiovisual Periferias",
    institution: "Fundo Cultural Nacional",
    value: "R$ 120.000",
    deadline: "30/07/2026",
    description:
      "Financiamento para obras audiovisuais produzidas por coletivos periféricos e novos realizadores.",
    tags: ["audiovisual", "periferia", "formação"],
  },
  {
    title: "Circuito Cultural Regional",
    institution: "Programa Cultura Viva",
    value: "R$ 60.000",
    deadline: "05/08/2026",
    description:
      "Edital para circulação de espetáculos, oficinas e ações culturais em cidades do interior.",
    tags: ["teatro", "circulação", "coletivo"],
  },
];

export default function EditaisPage() {
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
              Formulário visual para cadastro de oportunidades culturais.
            </p>
          </div>

          <form className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Título do edital
              </label>
              <input
                type="text"
                placeholder="Ex: Edital Música Independente MG"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Instituição responsável
              </label>
              <input
                type="text"
                placeholder="Ex: Secretaria Estadual de Cultura"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Valor disponível
              </label>
              <input
                type="text"
                placeholder="Ex: R$ 80.000"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Prazo de inscrição
              </label>
              <input
                type="date"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Área principal
              </label>
              <select className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500">
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
                type="text"
                placeholder="Ex: música, juventude, Minas Gerais"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-400">
                Descrição do edital
              </label>
              <textarea
                placeholder="Descreva o objetivo, público-alvo e critérios da oportunidade."
                rows={4}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="button"
                className="rounded-xl bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-400"
              >
                Cadastrar edital
              </button>
            </div>
          </form>
        </section>

        <div className="grid gap-5 md:grid-cols-3">
          {opportunities.map((opportunity) => (
            <article
              key={opportunity.title}
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
                  <strong>{opportunity.deadline}</strong>
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
      </section>
    </main>
  );
}