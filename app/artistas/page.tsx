import AppNav from "@/components/AppNav";

const artists = [
  {
    name: "Coletivo Vozes do Morro",
    city: "Belo Horizonte - MG",
    area: "Música independente",
    description:
      "Coletivo cultural voltado à produção musical periférica e formação de jovens artistas.",
    tags: ["música", "periferia", "juventude", "formação"],
  },
  {
    name: "Cena Livre Teatro",
    city: "Viçosa - MG",
    area: "Teatro comunitário",
    description:
      "Grupo de teatro com foco em circulação regional, oficinas e ações educativas.",
    tags: ["teatro", "coletivo", "educação", "circulação"],
  },
  {
    name: "Frame Favela",
    city: "Contagem - MG",
    area: "Audiovisual",
    description:
      "Produtora independente de audiovisual com narrativas periféricas e documentais.",
    tags: ["audiovisual", "periferia", "documentário", "formação"],
  },
];

export default function ArtistsPage() {
  return (
    <main className="min-h-screen bg-[#0B0B12] text-white">
      <AppNav />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-purple-300">
            Perfis culturais
          </p>

          <h2 className="mt-2 text-4xl font-bold">Artistas cadastrados</h2>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Cadastre artistas, coletivos e produtores culturais para encontrar
            editais compatíveis com seus perfis.
          </p>
        </div>

        <section className="mb-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-bold">Novo artista</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Formulário visual para cadastro de perfis culturais.
            </p>
          </div>

          <form className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Nome do artista ou coletivo
              </label>
              <input
                type="text"
                placeholder="Ex: Coletivo Vozes do Morro"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Cidade / Estado
              </label>
              <input
                type="text"
                placeholder="Ex: Belo Horizonte - MG"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Área cultural
              </label>
              <select className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500">
                <option>Música</option>
                <option>Teatro</option>
                <option>Audiovisual</option>
                <option>Dança</option>
                <option>Literatura</option>
                <option>Cultura popular</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Tags culturais
              </label>
              <input
                type="text"
                placeholder="Ex: música, periferia, juventude"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-400">
                Descrição do perfil
              </label>
              <textarea
                placeholder="Descreva o histórico, atuação e objetivos culturais do artista."
                rows={4}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="button"
                className="rounded-xl bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-400"
              >
                Cadastrar artista
              </button>
            </div>
          </form>
        </section>

        <div className="grid gap-5 md:grid-cols-3">
          {artists.map((artist) => (
            <article
              key={artist.name}
              className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <p className="text-sm text-zinc-400">{artist.city}</p>

              <h3 className="mt-2 text-2xl font-bold">{artist.name}</h3>

              <p className="mt-1 text-purple-300">{artist.area}</p>

              <p className="mt-4 text-sm leading-6 text-zinc-400">
                {artist.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {artist.tags.map((tag) => (
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