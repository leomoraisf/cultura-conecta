import AppNav from "@/components/AppNav";
import { prisma } from "@/lib/prisma";
import { calculateMatchScore } from "@/lib/match-score";

export const runtime = "nodejs";

type Artist = {
  id: string;
  name: string;
  tags: string[];
};

type Opportunity = {
  id: string;
  title: string;
  tags: string[];
};

type GeneratedMatch = {
  artistId: string;
  opportunityId: string;
  artist: string;
  opportunity: string;
  score: number;
};

export default async function DashboardPage() {
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
          opportunity: opportunity.title,
          score: result.score,
        };
      }),
    )
    .filter((match: GeneratedMatch) => match.score > 0)
    .sort((a: GeneratedMatch, b: GeneratedMatch) => b.score - a.score);

  const averageScore =
    generatedMatches.length === 0
      ? 0
      : Math.round(
          generatedMatches.reduce(
            (sum: number, match: GeneratedMatch) => sum + match.score,
            0,
          ) / generatedMatches.length,
        );

  const recentMatches = generatedMatches.slice(0, 3);

  const stats = [
    {
      label: "Artistas cadastrados",
      value: artists.length,
      description: "Perfis culturais salvos no Supabase",
    },
    {
      label: "Editais mapeados",
      value: opportunities.length,
      description: "Oportunidades culturais cadastradas",
    },
    {
      label: "Matches gerados",
      value: generatedMatches.length,
      description: "Recomendações calculadas automaticamente",
    },
    {
      label: "Score médio",
      value: `${averageScore}%`,
      description: "Compatibilidade média dos matches reais",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0B12] text-white">
      <AppNav />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-purple-300">
              Visão executiva
            </p>

            <h2 className="mt-2 text-4xl font-bold">
              Dashboard de Matchmaking Cultural
            </h2>

            <p className="mt-3 max-w-2xl text-zinc-400">
              Painel conectado ao Supabase para acompanhar artistas, editais e
              recomendações calculadas em tempo real.
            </p>
          </div>

          <a
            href="/matches"
            className="w-fit rounded-xl bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-400"
          >
            Ver matches gerados
          </a>
        </div>

        <section className="grid gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <p className="text-sm text-zinc-400">{item.label}</p>

              <strong className="mt-3 block text-4xl font-bold">
                {item.value}
              </strong>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                {item.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold">Melhores matches reais</h3>

              <p className="mt-2 text-sm text-zinc-400">
                Recomendações ordenadas pelo maior score de compatibilidade.
              </p>
            </div>

            {recentMatches.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 p-8 text-center">
                <h4 className="text-xl font-bold">Nenhum match ainda</h4>

                <p className="mt-3 text-sm text-zinc-400">
                  Cadastre artistas e editais com tags parecidas para gerar
                  recomendações.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentMatches.map((match: GeneratedMatch) => (
                  <article
                    key={`${match.artistId}-${match.opportunityId}`}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                  >
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div>
                        <p className="text-sm text-zinc-400">Artista</p>

                        <h4 className="mt-1 text-xl font-semibold">
                          {match.artist}
                        </h4>

                        <p className="mt-3 text-sm text-zinc-400">
                          Edital recomendado
                        </p>

                        <p className="font-medium text-purple-200">
                          {match.opportunity}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-green-500/10 px-5 py-4 text-center">
                        <p className="text-xs text-green-300">Score</p>

                        <strong className="text-2xl text-green-300">
                          {match.score}%
                        </strong>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="text-2xl font-bold">Valor do produto</h3>

            <p className="mt-4 text-sm leading-6 text-zinc-400">
              O Cultura Conecta reduz o tempo necessário para encontrar editais
              compatíveis com cada artista. Em vez de buscar manualmente em
              dezenas de oportunidades, o sistema cruza dados reais de perfil,
              requisitos e tags culturais.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="text-sm font-semibold text-purple-200">
                  Banco real
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  Artistas e editais são salvos no Supabase usando Prisma ORM.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="text-sm font-semibold text-purple-200">
                  Lógica de negócio
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  O score é calculado automaticamente com TypeScript a partir
                  das tags cadastradas.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="text-sm font-semibold text-purple-200">
                  Valor para a Mulatto Hub
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  A solução conversa diretamente com captação de recursos,
                  estruturação de projetos e triagem de editais culturais.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-zinc-800 bg-gradient-to-br from-purple-500/20 to-zinc-950 p-6">
          <h3 className="text-2xl font-bold">Pitch técnico</h3>

          <p className="mt-4 max-w-4xl text-zinc-300">
            Esta plataforma foi construída com Next.js, React, TypeScript,
            Tailwind CSS, Prisma ORM e Supabase PostgreSQL. O sistema permite
            cadastrar artistas e editais em um banco real e calcula
            automaticamente um score de compatibilidade para gerar recomendações
            culturais.
          </p>
        </section>
      </section>
    </main>
  );
}