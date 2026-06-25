import AppNav from "@/components/AppNav";
import { prisma } from "@/lib/prisma";
import { calculateMatchScore } from "@/lib/match-score";

export const runtime = "nodejs";

export default async function MatchesPage() {
  const [artists, opportunities] = await Promise.all([
    prisma.artist.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.opportunity.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const generatedMatches = artists
    .flatMap((artist) =>
      opportunities.map((opportunity) => {
        const result = calculateMatchScore(artist.tags, opportunity.tags);

        return {
          artistId: artist.id,
          opportunityId: opportunity.id,
          artist: artist.name,
          artistArea: artist.area,
          opportunity: opportunity.title,
          institution: opportunity.institution,
          score: result.score,
          matchedTags: result.matchedTags,
          missingTags: result.missingTags,
        };
      }),
    )
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score);

  return (
    <main className="min-h-screen bg-[#0B0B12] text-white">
      <AppNav />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-purple-300">
            Inteligência de recomendação
          </p>

          <h2 className="mt-2 text-4xl font-bold">Matches gerados</h2>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Esta página cruza os artistas e editais cadastrados no Supabase e
            calcula automaticamente o score de compatibilidade.
          </p>
        </div>

        <section className="mb-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm text-zinc-400">Artistas no banco</p>
            <strong className="mt-3 block text-4xl font-bold">
              {artists.length}
            </strong>
            <p className="mt-2 text-sm text-zinc-500">
              Perfis culturais cadastrados
            </p>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm text-zinc-400">Editais no banco</p>
            <strong className="mt-3 block text-4xl font-bold">
              {opportunities.length}
            </strong>
            <p className="mt-2 text-sm text-zinc-500">
              Oportunidades disponíveis
            </p>
          </article>

          <article className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <p className="text-sm text-zinc-400">Matches encontrados</p>
            <strong className="mt-3 block text-4xl font-bold">
              {generatedMatches.length}
            </strong>
            <p className="mt-2 text-sm text-zinc-500">
              Recomendações com score maior que zero
            </p>
          </article>
        </section>

        {artists.length === 0 || opportunities.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-950 p-10 text-center">
            <h3 className="text-2xl font-bold">
              Cadastre artistas e editais primeiro
            </h3>

            <p className="mt-3 text-zinc-400">
              Para gerar matches reais, é necessário ter pelo menos um artista e
              um edital cadastrados no banco.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <a
                href="/artistas"
                className="rounded-xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-400"
              >
                Cadastrar artista
              </a>

              <a
                href="/editais"
                className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-400"
              >
                Cadastrar edital
              </a>
            </div>
          </div>
        ) : generatedMatches.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-950 p-10 text-center">
            <h3 className="text-2xl font-bold">Nenhum match encontrado</h3>

            <p className="mt-3 text-zinc-400">
              Os artistas e editais existem, mas nenhuma tag cadastrada bateu.
              Tente usar tags iguais, por exemplo: música, juventude, Minas
              Gerais.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {generatedMatches.map((match) => (
              <article
                key={`${match.artistId}-${match.opportunityId}`}
                className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
              >
                <div className="grid gap-6 lg:grid-cols-[1fr_170px] lg:items-center">
                  <div>
                    <p className="text-sm text-zinc-400">
                      {match.artistArea}
                    </p>

                    <h3 className="text-2xl font-bold">{match.artist}</h3>

                    <p className="mt-4 text-sm text-zinc-400">
                      Edital recomendado
                    </p>

                    <h4 className="text-xl font-semibold text-purple-200">
                      {match.opportunity}
                    </h4>

                    <p className="mt-1 text-sm text-zinc-500">
                      {match.institution}
                    </p>

                    <p className="mt-4 max-w-3xl text-zinc-400">
                      Compatibilidade calculada automaticamente com base nas
                      tags em comum entre o perfil cultural do artista e os
                      requisitos do edital.
                    </p>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-2 text-sm text-zinc-500">
                          Tags compatíveis
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {match.matchedTags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-sm text-zinc-500">
                          Requisitos não encontrados
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {match.missingTags.length > 0 ? (
                            match.missingTags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300">
                              Match completo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-green-500/10 p-6 text-center">
                    <p className="text-sm text-green-300">Score</p>

                    <strong className="text-5xl text-green-300">
                      {match.score}%
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <section className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <h3 className="text-2xl font-bold">Como o algoritmo funciona?</h3>

          <p className="mt-4 max-w-3xl text-zinc-400">
            A função recebe as tags do artista e as tags exigidas pelo edital.
            Depois, calcula quantas tags do edital aparecem no perfil do
            artista. O score final é a porcentagem de requisitos atendidos.
          </p>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Fórmula</p>

            <p className="mt-2 text-lg font-semibold text-purple-200">
              score = tags compatíveis / tags exigidas pelo edital × 100
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}