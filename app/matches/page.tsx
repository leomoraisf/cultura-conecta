import AppNav from "@/components/AppNav";
import { prisma } from "@/lib/prisma";
import { calculateMatchScore } from "@/lib/match-score";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Artist = {
  id: string;
  name: string;
  area: string;
  tags: string[];
};

type Opportunity = {
  id: string;
  title: string;
  institution: string;
  tags: string[];
};

type GeneratedMatch = {
  artistId: string;
  opportunityId: string;
  artist: string;
  artistArea: string;
  opportunity: string;
  institution: string;
  score: number;
  matchedTags: string[];
  missingTags: string[];
};

export default async function MatchesPage() {
  const artists = (await prisma.artist.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })) as Artist[];

  const opportunities = (await prisma.opportunity.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })) as Opportunity[];

  const generatedMatches: GeneratedMatch[] = artists
    .flatMap((artist: Artist) =>
      opportunities.map((opportunity: Opportunity) => {
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
    .filter((match: GeneratedMatch) => match.score > 0)
    .sort((a: GeneratedMatch, b: GeneratedMatch) => b.score - a.score);

  return (
    <main className="min-h-screen text-[#241C15]">
      <AppNav />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <div className="inline-flex rotate-[-1deg] rounded-full border-2 border-[#241C15] bg-[#5D6B3F] px-4 py-1 text-xs font-black uppercase tracking-[0.25em] text-white shadow-[4px_4px_0_#241C15]">
            Match cultural
          </div>

          <h2 className="mt-5 max-w-4xl text-5xl font-black leading-tight md:text-6xl">
            Onde o perfil do artista encontra o edital certo.
          </h2>

          <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#4E3B2A]">
            O sistema cruza artistas e editais cadastrados no Supabase e calcula
            automaticamente um score de compatibilidade com base nas tags.
          </p>
        </div>

        <section className="mb-10 grid gap-5 md:grid-cols-3">
          <article className="rounded-[2rem] border-4 border-[#241C15] bg-[#B85C38] p-6 text-white shadow-[8px_8px_0_#241C15]">
            <p className="text-sm font-black uppercase tracking-wide">
              Artistas na roda
            </p>

            <strong className="mt-4 block text-5xl font-black">
              {artists.length}
            </strong>

            <p className="mt-3 text-sm font-bold text-white/85">
              Perfis culturais cadastrados
            </p>
          </article>

          <article className="rounded-[2rem] border-4 border-[#241C15] bg-[#D89B2B] p-6 shadow-[8px_8px_0_#241C15]">
            <p className="text-sm font-black uppercase tracking-wide">
              Editais no mapa
            </p>

            <strong className="mt-4 block text-5xl font-black">
              {opportunities.length}
            </strong>

            <p className="mt-3 text-sm font-bold text-[#4E3B2A]">
              Oportunidades disponíveis
            </p>
          </article>

          <article className="rounded-[2rem] border-4 border-[#241C15] bg-[#1F4E5F] p-6 text-white shadow-[8px_8px_0_#241C15]">
            <p className="text-sm font-black uppercase tracking-wide">
              Matches encontrados
            </p>

            <strong className="mt-4 block text-5xl font-black">
              {generatedMatches.length}
            </strong>

            <p className="mt-3 text-sm font-bold text-white/85">
              Recomendações com score acima de zero
            </p>
          </article>
        </section>

        {artists.length === 0 || opportunities.length === 0 ? (
          <div className="rounded-[2rem] border-4 border-dashed border-[#241C15] bg-[#F6EAD2] p-10 text-center shadow-[8px_8px_0_#241C15]">
            <h3 className="text-3xl font-black">
              Cadastre artistas e editais primeiro
            </h3>

            <p className="mt-3 font-semibold text-[#4E3B2A]">
              Para gerar matches reais, é necessário ter pelo menos um artista e
              um edital cadastrados.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="/artistas"
                className="rounded-2xl border-2 border-[#241C15] bg-[#B85C38] px-6 py-4 text-sm font-black uppercase text-white shadow-[5px_5px_0_#241C15] transition hover:-translate-y-1"
              >
                Cadastrar artista
              </a>

              <a
                href="/editais"
                className="rounded-2xl border-2 border-[#241C15] bg-[#D89B2B] px-6 py-4 text-sm font-black uppercase shadow-[5px_5px_0_#241C15] transition hover:-translate-y-1"
              >
                Cadastrar edital
              </a>
            </div>
          </div>
        ) : generatedMatches.length === 0 ? (
          <div className="rounded-[2rem] border-4 border-dashed border-[#241C15] bg-[#F6EAD2] p-10 text-center shadow-[8px_8px_0_#241C15]">
            <h3 className="text-3xl font-black">Nenhum match encontrado</h3>

            <p className="mt-3 font-semibold text-[#4E3B2A]">
              Os artistas e editais existem, mas nenhuma tag bateu. Tente usar
              tags iguais, por exemplo: música, juventude, Minas Gerais.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {generatedMatches.map((match: GeneratedMatch) => (
              <article
                key={`${match.artistId}-${match.opportunityId}`}
                className="rounded-[2rem] border-4 border-[#241C15] bg-[#F6EAD2] p-6 shadow-[9px_9px_0_#241C15] transition hover:-translate-y-1 hover:shadow-[11px_11px_0_#241C15]"
              >
                <div className="grid gap-6 lg:grid-cols-[1fr_190px] lg:items-center">
                  <div>
                    <p className="w-fit rounded-full border-2 border-[#241C15] bg-[#B85C38] px-3 py-1 text-xs font-black uppercase text-white shadow-[3px_3px_0_#241C15]">
                      {match.artistArea}
                    </p>

                    <h3 className="mt-5 text-3xl font-black">
                      {match.artist}
                    </h3>

                    <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-[#5D6B3F]">
                      Edital recomendado
                    </p>

                    <h4 className="mt-1 text-2xl font-black text-[#1F4E5F]">
                      {match.opportunity}
                    </h4>

                    <p className="mt-1 text-sm font-bold text-[#7A2E3A]">
                      {match.institution}
                    </p>

                    <p className="mt-5 max-w-3xl text-sm font-semibold leading-7 text-[#4E3B2A]">
                      Compatibilidade calculada automaticamente com base nas
                      tags em comum entre o perfil cultural do artista e os
                      requisitos do edital.
                    </p>

                    <div className="mt-6 grid gap-5 md:grid-cols-2">
                      <div className="rounded-3xl border-2 border-[#241C15] bg-white/45 p-5 shadow-[5px_5px_0_#241C15]">
                        <p className="mb-3 text-sm font-black uppercase text-[#5D6B3F]">
                          Tags compatíveis
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {match.matchedTags.map((tag: string) => (
                            <span
                              key={tag}
                              className="rounded-full border-2 border-[#241C15] bg-[#5D6B3F] px-3 py-1 text-xs font-black uppercase text-white shadow-[2px_2px_0_#241C15]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-3xl border-2 border-[#241C15] bg-white/45 p-5 shadow-[5px_5px_0_#241C15]">
                        <p className="mb-3 text-sm font-black uppercase text-[#B85C38]">
                          Requisitos não encontrados
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {match.missingTags.length > 0 ? (
                            match.missingTags.map((tag: string) => (
                              <span
                                key={tag}
                                className="rounded-full border-2 border-[#241C15] bg-[#D89B2B] px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0_#241C15]"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span className="rounded-full border-2 border-[#241C15] bg-[#5D6B3F] px-3 py-1 text-xs font-black uppercase text-white shadow-[2px_2px_0_#241C15]">
                              Match completo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rotate-2 rounded-[2rem] border-4 border-[#241C15] bg-[#5D6B3F] p-6 text-center text-white shadow-[8px_8px_0_#241C15]">
                    <p className="text-sm font-black uppercase tracking-[0.2em]">
                      Score
                    </p>

                    <strong className="mt-2 block text-6xl font-black">
                      {match.score}%
                    </strong>

                    <p className="mt-3 text-xs font-bold text-white/80">
                      Compatibilidade cultural
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <section className="mt-10 rounded-[2rem] border-4 border-[#241C15] bg-[#1F4E5F] p-6 text-white shadow-[10px_10px_0_#241C15]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D89B2B]">
            Algoritmo
          </p>

          <h3 className="mt-2 text-3xl font-black">Como o score funciona?</h3>

          <p className="mt-4 max-w-3xl text-sm font-semibold leading-7 text-white/85">
            A função recebe as tags do artista e as tags exigidas pelo edital.
            Depois, calcula quantas tags do edital aparecem no perfil do
            artista. O score final é a porcentagem de requisitos atendidos.
          </p>

          <div className="mt-6 rounded-3xl border-2 border-[#241C15] bg-[#F6EAD2] p-5 text-[#241C15] shadow-[5px_5px_0_#241C15]">
            <p className="text-sm font-black uppercase text-[#7A2E3A]">
              Fórmula
            </p>

            <p className="mt-2 text-xl font-black">
              score = tags compatíveis / tags exigidas pelo edital × 100
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}