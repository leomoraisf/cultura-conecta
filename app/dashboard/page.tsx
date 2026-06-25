import AppNav from "@/components/AppNav";

const stats = [
  {
    label: "Artistas cadastrados",
    value: "128",
    description: "Perfis culturais ativos na plataforma",
  },
  {
    label: "Editais mapeados",
    value: "42",
    description: "Oportunidades culturais disponíveis",
  },
  {
    label: "Matches gerados",
    value: "386",
    description: "Recomendações criadas automaticamente",
  },
  {
    label: "Score médio",
    value: "78%",
    description: "Compatibilidade média dos matches",
  },
];

const recentMatches = [
  {
    artist: "Coletivo Vozes do Morro",
    opportunity: "Edital Música Independente MG",
    score: 92,
    status: "Alta prioridade",
  },
  {
    artist: "Frame Favela",
    opportunity: "Fomento Audiovisual Periferias",
    score: 81,
    status: "Bom encaixe",
  },
  {
    artist: "Cena Livre Teatro",
    opportunity: "Circuito Cultural Regional",
    score: 74,
    status: "Revisar requisitos",
  },
];

export default function DashboardPage() {
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
              Painel para acompanhar artistas cadastrados, editais disponíveis
              e recomendações geradas pela plataforma.
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
              <h3 className="text-2xl font-bold">Matches recentes</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Recomendações ordenadas por score de compatibilidade.
              </p>
            </div>

            <div className="space-y-4">
              {recentMatches.map((match) => (
                <article
                  key={`${match.artist}-${match.opportunity}`}
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

                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                        {match.status}
                      </span>

                      <div className="rounded-2xl bg-green-500/10 px-5 py-4 text-center">
                        <p className="text-xs text-green-300">Score</p>
                        <strong className="text-2xl text-green-300">
                          {match.score}%
                        </strong>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
            <h3 className="text-2xl font-bold">Valor do produto</h3>

            <p className="mt-4 text-sm leading-6 text-zinc-400">
              O Cultura Conecta reduz o tempo necessário para encontrar editais
              compatíveis com cada artista. Em vez de buscar manualmente em
              dezenas de oportunidades, o sistema cruza dados de perfil,
              requisitos e tags culturais.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="text-sm font-semibold text-purple-200">
                  Para artistas
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  Ajuda a encontrar editais mais alinhados ao perfil, área
                  cultural e território de atuação.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="text-sm font-semibold text-purple-200">
                  Para consultorias culturais
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  Facilita triagem, organização e recomendação de oportunidades
                  para múltiplos clientes.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <p className="text-sm font-semibold text-purple-200">
                  Para a Mulatto Hub
                </p>

                <p className="mt-2 text-sm text-zinc-400">
                  Mostra uma solução diretamente conectada com captação de
                  recursos, estruturação de projetos e inteligência para editais
                  culturais.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-zinc-800 bg-gradient-to-br from-purple-500/20 to-zinc-950 p-6">
          <h3 className="text-2xl font-bold">Pitch técnico</h3>

          <p className="mt-4 max-w-4xl text-zinc-300">
            Esta plataforma foi construída com Next.js, React, TypeScript e
            Tailwind CSS. A lógica principal do sistema calcula automaticamente
            um score de compatibilidade entre artistas e editais usando tags
            culturais. A próxima evolução natural é conectar esses dados a um
            banco PostgreSQL no Supabase usando Prisma ORM.
          </p>
        </section>
      </section>
    </main>
  );
}