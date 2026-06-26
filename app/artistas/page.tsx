import AppNav from "@/components/AppNav";
import { prisma } from "@/lib/prisma";
import { createArtist } from "./actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Artist = {
  id: string;
  name: string;
  city: string;
  area: string;
  description: string;
  tags: string[];
};

export default async function ArtistsPage() {
  const artists = (await prisma.artist.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })) as Artist[];

  return (
    <main className="min-h-screen text-[#241C15]">
      <AppNav />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="inline-flex rotate-[-1deg] rounded-full border-2 border-[#241C15] bg-[#B85C38] px-4 py-1 text-xs font-black uppercase tracking-[0.25em] text-white shadow-[4px_4px_0_#241C15]">
            Perfis culturais
          </div>

          <h2 className="mt-5 max-w-3xl text-5xl font-black leading-tight md:text-6xl">
            Artistas, coletivos e fazedores de cultura.
          </h2>

          <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#4E3B2A]">
            Cadastre trajetórias culturais para conectar cada artista aos
            editais mais compatíveis.
          </p>
        </div>

        <section className="mb-10 rounded-[2rem] border-4 border-[#241C15] bg-[#F6EAD2] p-6 shadow-[10px_10px_0_#241C15]">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7A2E3A]">
              Novo cadastro
            </p>

            <h3 className="mt-2 text-3xl font-black">Novo artista</h3>

            <p className="mt-2 text-sm font-semibold text-[#4E3B2A]">
              Informe os dados do perfil cultural. As tags serão usadas para
              calcular os matches com editais.
            </p>
          </div>

          <form action={createArtist} className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-black uppercase">
                Nome do artista ou coletivo
              </label>

              <input
                name="name"
                type="text"
                placeholder="Ex: Coletivo Vozes do Morro"
                required
                className="w-full rounded-2xl border-2 border-[#241C15] bg-white/60 px-4 py-3 text-sm font-semibold text-[#241C15] outline-none placeholder:text-[#8A745B] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black uppercase">
                Cidade / Estado
              </label>

              <input
                name="city"
                type="text"
                placeholder="Ex: Belo Horizonte - MG"
                required
                className="w-full rounded-2xl border-2 border-[#241C15] bg-white/60 px-4 py-3 text-sm font-semibold text-[#241C15] outline-none placeholder:text-[#8A745B] focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black uppercase">
                Área cultural
              </label>

              <select
                name="area"
                required
                className="w-full rounded-2xl border-2 border-[#241C15] bg-white/60 px-4 py-3 text-sm font-semibold text-[#241C15] outline-none focus:bg-white"
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
              <label className="mb-2 block text-sm font-black uppercase">
                Tags culturais
              </label>

              <input
                name="tags"
                type="text"
                placeholder="Ex: música, periferia, juventude"
                required
                className="w-full rounded-2xl border-2 border-[#241C15] bg-white/60 px-4 py-3 text-sm font-semibold text-[#241C15] outline-none placeholder:text-[#8A745B] focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-black uppercase">
                Descrição do perfil
              </label>

              <textarea
                name="description"
                placeholder="Descreva o histórico, atuação e objetivos culturais do artista."
                rows={4}
                required
                className="w-full rounded-2xl border-2 border-[#241C15] bg-white/60 px-4 py-3 text-sm font-semibold text-[#241C15] outline-none placeholder:text-[#8A745B] focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-2xl border-2 border-[#241C15] bg-[#B85C38] px-7 py-4 text-sm font-black uppercase text-white shadow-[6px_6px_0_#241C15] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#241C15]"
              >
                Cadastrar artista
              </button>
            </div>
          </form>
        </section>

        {artists.length === 0 ? (
          <div className="rounded-[2rem] border-4 border-dashed border-[#241C15] bg-[#F6EAD2] p-10 text-center shadow-[8px_8px_0_#241C15]">
            <h3 className="text-3xl font-black">Nenhum artista cadastrado</h3>

            <p className="mt-3 font-semibold text-[#4E3B2A]">
              Cadastre o primeiro artista usando o formulário acima.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {artists.map((artist: Artist) => (
              <article
                key={artist.id}
                className="rounded-[2rem] border-4 border-[#241C15] bg-[#F6EAD2] p-6 shadow-[8px_8px_0_#241C15] transition hover:-translate-y-1 hover:shadow-[10px_10px_0_#241C15]"
              >
                <p className="w-fit rounded-full border-2 border-[#241C15] bg-[#D89B2B] px-3 py-1 text-xs font-black uppercase shadow-[3px_3px_0_#241C15]">
                  {artist.city}
                </p>

                <h3 className="mt-5 text-3xl font-black">{artist.name}</h3>

                <p className="mt-2 text-sm font-black uppercase text-[#B85C38]">
                  {artist.area}
                </p>

                <p className="mt-4 text-sm font-semibold leading-7 text-[#4E3B2A]">
                  {artist.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {artist.tags.map((tag: string) => (
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