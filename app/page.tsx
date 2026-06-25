export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B12] text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Cultura Conecta
            </h1>
            <p className="text-sm text-zinc-400">
              Matchmaking inteligente para editais culturais
            </p>
          </div>

          <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
            <a href="#problema" className="hover:text-white">
              Problema
            </a>
            <a href="#solucao" className="hover:text-white">
              Solução
            </a>
            <a href="#match" className="hover:text-white">
              Match
            </a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
              Plataforma para artistas, produtores e editais
            </div>

            <h2 className="max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
              Conecte artistas aos editais certos com inteligência.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
              O Cultura Conecta cruza perfis culturais, áreas de atuação e
              requisitos de oportunidades para recomendar os editais mais
              compatíveis com cada artista.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#match"
                className="rounded-xl bg-purple-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-purple-400"
              >
                Ver matchmaking
              </a>

              <a
                href="#solucao"
                className="rounded-xl border border-zinc-700 px-6 py-3 text-center font-semibold text-zinc-200 transition hover:border-zinc-400"
              >
                Entender solução
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Editais recomendados</h3>
                <p className="text-sm text-zinc-400">
                  Resultado baseado no perfil do artista
                </p>
              </div>

              <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-300">
                Online
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Edital Música Independente MG",
                  tags: ["música", "juventude", "Minas Gerais"],
                  score: "92%",
                },
                {
                  title: "Fomento Audiovisual Periferias",
                  tags: ["audiovisual", "periferia", "formação"],
                  score: "81%",
                },
                {
                  title: "Circuito Cultural Regional",
                  tags: ["teatro", "circulação", "coletivo"],
                  score: "74%",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl bg-green-500/10 px-3 py-2 text-sm font-bold text-green-300">
                      {item.score}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="problema"
        className="border-y border-zinc-800 bg-zinc-950 px-6 py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-2xl font-bold">Problema</h3>
            <p className="mt-3 text-zinc-400">
              Artistas perdem oportunidades porque editais são difíceis de
              encontrar, interpretar e filtrar.
            </p>
          </div>

          <div id="solucao">
            <h3 className="text-2xl font-bold">Solução</h3>
            <p className="mt-3 text-zinc-400">
              A plataforma organiza perfis, tags culturais e requisitos dos
              editais em um sistema simples.
            </p>
          </div>

          <div id="match">
            <h3 className="text-2xl font-bold">Matchmaking</h3>
            <p className="mt-3 text-zinc-400">
              O sistema calcula um score de compatibilidade entre artista e
              edital, destacando os melhores matches.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}