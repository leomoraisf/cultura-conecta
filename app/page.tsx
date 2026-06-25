export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0B12] text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Cultura Conecta
            </h1>
            <p className="text-sm text-zinc-400">
              Matchmaking inteligente para editais culturais
            </p>
          </div>

          <nav className="flex flex-wrap gap-3 text-sm">
            <a
              href="/dashboard"
              className="rounded-xl border border-zinc-800 px-4 py-2 text-zinc-300 transition hover:border-purple-500 hover:text-white"
            >
              Dashboard
            </a>

            <a
              href="/artistas"
              className="rounded-xl border border-zinc-800 px-4 py-2 text-zinc-300 transition hover:border-purple-500 hover:text-white"
            >
              Artistas
            </a>

            <a
              href="/editais"
              className="rounded-xl border border-zinc-800 px-4 py-2 text-zinc-300 transition hover:border-purple-500 hover:text-white"
            >
              Editais
            </a>

            <a
              href="/matches"
              className="rounded-xl border border-zinc-800 px-4 py-2 text-zinc-300 transition hover:border-purple-500 hover:text-white"
            >
              Matches
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
                href="/artistas"
                className="rounded-xl bg-purple-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-purple-400"
              >
                Cadastrar artista
              </a>

              <a
                href="/editais"
                className="rounded-xl border border-zinc-700 px-6 py-3 text-center font-semibold text-zinc-200 transition hover:border-zinc-400"
              >
                Cadastrar edital
              </a>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <a
                href="/matches"
                className="rounded-xl border border-zinc-800 px-6 py-3 text-center font-semibold text-zinc-300 transition hover:border-green-500 hover:text-white"
              >
                Ver matchmaking real
              </a>

              <a
                href="/dashboard"
                className="rounded-xl border border-zinc-800 px-6 py-3 text-center font-semibold text-zinc-300 transition hover:border-purple-500 hover:text-white"
              >
                Abrir dashboard
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Fluxo da plataforma</h3>
                <p className="text-sm text-zinc-400">
                  Cadastre dados reais e gere recomendações
                </p>
              </div>

              <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-300">
                Online
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Cadastre artistas",
                  description:
                    "Informe nome, cidade, área cultural, descrição e tags do perfil.",
                  href: "/artistas",
                  action: "Cadastrar artista",
                },
                {
                  step: "2",
                  title: "Cadastre editais",
                  description:
                    "Registre oportunidades, prazos, instituições, valores e requisitos.",
                  href: "/editais",
                  action: "Cadastrar edital",
                },
                {
                  step: "3",
                  title: "Gere matches",
                  description:
                    "O sistema calcula automaticamente o score de compatibilidade.",
                  href: "/matches",
                  action: "Ver matches",
                },
              ].map((item) => (
                <article
                  key={item.step}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
                >
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 font-bold text-purple-200">
                      {item.step}
                    </div>

                    <div>
                      <h4 className="font-semibold">{item.title}</h4>

                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {item.description}
                      </p>

                      <a
                        href={item.href}
                        className="mt-4 inline-flex rounded-xl bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-purple-500 hover:text-white"
                      >
                        {item.action}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-950 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-2xl font-bold">Problema</h3>
            <p className="mt-3 text-zinc-400">
              Artistas perdem oportunidades porque editais são difíceis de
              encontrar, interpretar e filtrar.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">Solução</h3>
            <p className="mt-3 text-zinc-400">
              A plataforma organiza perfis, tags culturais e requisitos dos
              editais em um sistema simples e conectado ao banco.
            </p>
          </div>

          <div>
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