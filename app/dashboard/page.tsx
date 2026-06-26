import AppNav from "@/components/AppNav";
import { prisma } from "@/lib/prisma";
import { calculateMatchScore } from "@/lib/match-score";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

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
      label: "Artistas na roda",
      value: artists.length,
      description: "Perfis culturais cadastrados",
      color: "bg-[#B85C38] text-white",
    },
    {
      label: "Editais no mapa",
      value: opportunities.length,
      description: "Oportunidades salvas no banco",
      color: "bg-[#D89B2B] text-[#241C15]",
    },
    {
      label: "Matches gerados",
      value: generatedMatches.length,
      description: "Recomendações calculadas",
      color: "bg-[#5D6B3F] text-white",
    },
    {
      label: "Score médio",
      value: `${averageScore}%`,
      description: "Compatibilidade média",
      color: "bg-[#1F4E5F] text-white",
    },
  ];

  return (
    <main className="min-h-screen text-[#241C15]">
      <AppNav />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex rotate-[-1deg] rounded-full border-2 border-[#241C15] bg-[#D89B2B] px-4 py-1 text-xs font-black uppercase tracking-[0.25em] shadow-[4px_4px_0_#241C15]">
              Painel da cultura
            </div>

            <h2 className="mt-5 max-w-3xl text-5xl font-black leading-tight md:text-6xl">
              Visão geral da roda de editais.
            </h2>

            <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#4E3B2A]">
              Acompanhe artistas, editais e recomendações calculadas em tempo
              real a partir dos dados salvos no Supabase.
            </p>
          </div>

          <a
            href="/matches"
            className="w-fit rounded-2xl border-2 border-[#241C15] bg-[#5D6B3F] px-6 py-4 text-sm font-black uppercase text-white shadow-[6px_6px_0_#241C15] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#241C15]"
          >
            Ver matches
          </a>
        </div>

        <section className="grid gap-5 md:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.label}
              className={`rounded-[2rem] border-2 border-[#241C15] p-6 shadow-[7px_7px_0_#241C15] ${item.color}`}
            >
              <p className="text-sm font-black uppercase tracking-wide">
                {item.label}
              </p>

              <strong className="mt-4 block text-5xl font-black">
                {item.value}
              </strong>

              <p className="mt-3 text-sm font-bold opacity-85">
                {item.description}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border-4 border-[#241C15] bg-[#F6EAD2] p-6 shadow-[10px_10px_0_#241C15]">
            <div className="mb-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#B85C38]">
                Recomendação cultural
              </p>

              <h3 className="mt-2 text-3xl font-black">
                Melhores matches reais
              </h3>

              <p className="mt-2 text-sm font-semibold text-[#4E3B2A]">
                Ordenados pelo maior score de compatibilidade.
              </p>
            </div>

            {recentMatches.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-[#241C15] bg-white/40 p-8 text-center">
                <h4 className="text-2xl font-black">Nenhum match ainda</h4>

                <p className="mt-3 font-semibold text-[#4E3B2A]">
                  Cadastre artistas e editais com tags parecidas para gerar
                  recomendações.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href="/artistas"
                    className="rounded-full border-2 border-[#241C15] bg-[#B85C38] px-5 py-3 text-sm font-black uppercase text-white shadow-[4px_4px_0_#241C15]"
                  >
                    Cadastrar artista
                  </a>

                  <a
                    href="/editais"
                    className="rounded-full border-2 border-[#241C15] bg-[#D89B2B] px-5 py-3 text-sm font-black uppercase shadow-[4px_4px_0_#241C15]"
                  >
                    Cadastrar edital
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {recentMatches.map((match: GeneratedMatch) => (
                  <article
                    key={`${match.artistId}-${match.opportunityId}`}
                    className="rounded-3xl border-2 border-[#241C15] bg-white/45 p-5 shadow-[5px_5px_0_#241C15]"
                  >
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wide text-[#7A2E3A]">
                          Artista
                        </p>

                        <h4 className="mt-1 text-2xl font-black">
                          {match.artist}
                        </h4>

                        <p className="mt-4 text-xs font-black uppercase tracking-wide text-[#5D6B3F]">
                          Edital recomendado
                        </p>

                        <p className="text-lg font-black text-[#1F4E5F]">
                          {match.opportunity}
                        </p>
                      </div>

                      <div className="rotate-2 rounded-3xl border-2 border-[#241C15] bg-[#5D6B3F] px-6 py-5 text-center text-white shadow-[5px_5px_0_#241C15]">
                        <p className="text-xs font-black uppercase">Score</p>

                        <strong className="text-4xl font-black">
                          {match.score}%
                        </strong>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="rounded-[2rem] border-4 border-[#241C15] bg-[#1F4E5F] p-6 text-white shadow-[10px_10px_0_#241C15]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D89B2B]">
              Por que importa?
            </p>

            <h3 className="mt-2 text-3xl font-black">Valor do produto</h3>

            <p className="mt-4 text-sm font-semibold leading-7 text-white/85">
              O Cultura Conecta reduz o tempo necessário para encontrar editais
              compatíveis com cada artista. Em vez de buscar manualmente em
              dezenas de oportunidades, o sistema cruza dados reais de perfil,
              requisitos e tags culturais.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border-2 border-[#241C15] bg-[#F6EAD2] p-5 text-[#241C15] shadow-[5px_5px_0_#241C15]">
                <p className="text-sm font-black uppercase">Banco real</p>

                <p className="mt-2 text-sm font-semibold text-[#4E3B2A]">
                  Artistas e editais são salvos no Supabase usando Prisma ORM.
                </p>
              </div>

              <div className="rounded-3xl border-2 border-[#241C15] bg-[#D89B2B] p-5 text-[#241C15] shadow-[5px_5px_0_#241C15]">
                <p className="text-sm font-black uppercase">
                  Lógica de negócio
                </p>

                <p className="mt-2 text-sm font-semibold">
                  O score é calculado automaticamente com TypeScript a partir
                  das tags cadastradas.
                </p>
              </div>

              <div className="rounded-3xl border-2 border-[#241C15] bg-[#B85C38] p-5 text-white shadow-[5px_5px_0_#241C15]">
                <p className="text-sm font-black uppercase">
                  Para a Mulatto Hub
                </p>

                <p className="mt-2 text-sm font-semibold">
                  A solução conversa diretamente com captação de recursos,
                  estruturação de projetos e triagem de editais culturais.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}