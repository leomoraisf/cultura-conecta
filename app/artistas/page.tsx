import AppNav from "@/components/AppNav";
import { prisma } from "@/lib/prisma";
import { createArtist } from "./actions";

export const runtime = "nodejs";

export default async function ArtistsPage() {
  const artists = await prisma.artist.findMany({
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
              Agora este formulário salva os dados reais no Supabase usando
              Prisma.
            </p>
          </div>

          <form action={createArtist} className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Nome do artista ou coletivo
              </label>

              <input
                name="name"
                type="text"
                placeholder="Ex: Coletivo Vozes do Morro"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Cidade / Estado
              </label>

              <input
                name="city"
                type="text"
                placeholder="Ex: Belo Horizonte - MG"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Área cultural
              </label>

              <select
                name="area"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500"
              >
                <option value="Música">Música</option>
                <option value="Teatro">Teatro</option>
                <option value="Audiovisual">Audiovisual</option>
                <option value="Dança">Dança</option>
                <option value="Literatura">Literatura</option>
                <option value="Cultura popular">Cultura popular</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Tags culturais
              </label>

              <input
                name="tags"
                type="text"
                placeholder="Ex: música, periferia, juventude"
                required
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-400">
                Descrição do perfil
              </label>

              <textarea
                name="description"
                placeholder="Descreva o histórico, atuação e objetivos culturais do artista."
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
                Cadastrar artista
              </button>
            </div>
          </form>
        </section>

        {artists.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-950 p-10 text-center">
            <h3 className="text-2xl font-bold">Nenhum artista cadastrado</h3>

            <p className="mt-3 text-zinc-400">
              Cadastre o primeiro artista usando o formulário acima.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {artists.map((artist) => (
              <article
                key={artist.id}
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
        )}
      </section>
    </main>
  );
}