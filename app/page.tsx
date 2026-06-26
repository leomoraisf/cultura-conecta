export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7EAD2] text-[#21170F]">
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <div className="pointer-events-none absolute -left-24 top-28 h-64 w-64 rounded-full border-[28px] border-[#D89B2B]/80" />
        <div className="pointer-events-none absolute -right-20 bottom-20 h-72 w-72 rounded-full border-[32px] border-[#B85C38]/70" />

        <header className="relative z-10 flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <a href="/" className="group w-fit">
            <div className="inline-flex rotate-[-2deg] rounded-full border-2 border-[#21170F] bg-[#D89B2B] px-5 py-2 text-xs font-black uppercase tracking-[0.35em] shadow-[4px_4px_0_#21170F]">
              Cultura viva
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-[-0.06em] md:text-6xl">
              Cultura Conecta
            </h1>

            <p className="mt-1 max-w-md text-base font-bold text-[#667247]">
              Editais, artistas e oportunidades na mesma roda.
            </p>
          </a>

          <nav className="flex flex-wrap gap-3 md:justify-end">
            <a
              href="/dashboard"
              className="rounded-full border-2 border-[#21170F] bg-[#F7EAD2] px-5 py-3 text-sm font-black uppercase tracking-wide shadow-[4px_4px_0_#21170F] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#21170F]"
            >
              Painel
            </a>

            <a
              href="/artistas"
              className="rounded-full border-2 border-[#21170F] bg-[#B85C38] px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0_#21170F] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#21170F]"
            >
              Artistas
            </a>

            <a
              href="/editais"
              className="rounded-full border-2 border-[#21170F] bg-[#D89B2B] px-5 py-3 text-sm font-black uppercase tracking-wide shadow-[4px_4px_0_#21170F] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#21170F]"
            >
              Editais
            </a>

            <a
              href="/matches"
              className="rounded-full border-2 border-[#21170F] bg-[#667247] px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[4px_4px_0_#21170F] transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#21170F]"
            >
              Matches
            </a>
          </nav>
        </header>

        <div className="relative z-10 grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.02fr_0.98fr]">
          <section>
            <div className="mb-7 inline-flex rotate-[-1deg] rounded-2xl border-2 border-[#21170F] bg-[#7A2E3A] px-5 py-3 text-sm font-black uppercase tracking-[0.22em] text-white shadow-[5px_5px_0_#21170F]">
              Para artistas, coletivos e produtores culturais
            </div>

            <h2 className="max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.08em] md:text-8xl">
              O edital certo para cada artista.
            </h2>

            <p className="mt-8 max-w-2xl text-xl font-bold leading-9 text-[#5F4A35]">
              Uma plataforma com alma de cartaz de rua: cadastre artistas,
              organize editais e descubra automaticamente quais oportunidades
              combinam com cada trajetória cultural.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/artistas"
                className="rounded-2xl border-2 border-[#21170F] bg-[#B85C38] px-7 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-[6px_6px_0_#21170F] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#21170F]"
              >
                Cadastrar artista
              </a>

              <a
                href="/editais"
                className="rounded-2xl border-2 border-[#21170F] bg-[#D89B2B] px-7 py-4 text-center text-sm font-black uppercase tracking-wide shadow-[6px_6px_0_#21170F] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#21170F]"
              >
                Cadastrar edital
              </a>

              <a
                href="/matches"
                className="rounded-2xl border-2 border-[#21170F] bg-[#667247] px-7 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-[6px_6px_0_#21170F] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#21170F]"
              >
                Ver matches
              </a>
            </div>
          </section>

          <section className="relative">
            <div className="absolute -left-7 -top-7 h-28 w-28 rounded-full border-4 border-[#21170F] bg-[#D89B2B]" />
            <div className="absolute -bottom-8 -right-6 h-32 w-32 rounded-full border-4 border-[#21170F] bg-[#B85C38]" />

            <div className="relative rotate-[1deg] rounded-[2.2rem] border-4 border-[#21170F] bg-[#FFF4DA] p-7 shadow-[14px_14px_0_#21170F]">
              <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#7A2E3A]">
                    Roda de oportunidades
                  </p>

                  <h3 className="mt-2 text-4xl font-black tracking-[-0.04em]">
                    Como funciona
                  </h3>
                </div>

                <span className="w-fit rotate-3 rounded-full border-2 border-[#21170F] bg-[#667247] px-4 py-2 text-sm font-black uppercase text-white shadow-[4px_4px_0_#21170F]">
                  Online
                </span>
              </div>

              <div className="space-y-5">
                {[
                  {
                    number: "01",
                    title: "Perfil do artista",
                    text: "Nome, território, área cultural, descrição e tags de atuação.",
                    color: "bg-[#B85C38] text-white",
                  },
                  {
                    number: "02",
                    title: "Mapa de editais",
                    text: "Oportunidades com prazos, valores, instituições e requisitos.",
                    color: "bg-[#D89B2B] text-[#21170F]",
                  },
                  {
                    number: "03",
                    title: "Match cultural",
                    text: "O algoritmo cruza tags e gera um score de compatibilidade.",
                    color: "bg-[#667247] text-white",
                  },
                ].map((item) => (
                  <article
                    key={item.number}
                    className="rounded-3xl border-2 border-[#21170F] bg-[#F7EAD2] p-5 shadow-[5px_5px_0_#21170F]"
                  >
                    <div className="flex gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[#21170F] text-lg font-black shadow-[3px_3px_0_#21170F] ${item.color}`}
                      >
                        {item.number}
                      </div>

                      <div>
                        <h4 className="text-2xl font-black tracking-[-0.03em]">
                          {item.title}
                        </h4>

                        <p className="mt-2 text-base font-bold leading-7 text-[#5F4A35]">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="border-y-4 border-[#21170F] bg-[#1F4E5F] px-6 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-[#21170F] bg-[#FFF4DA] p-7 text-[#21170F] shadow-[7px_7px_0_#21170F]">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#B85C38]">
              Dor real
            </p>

            <h3 className="mt-3 text-4xl font-black tracking-[-0.04em]">
              Problema
            </h3>

            <p className="mt-4 text-base font-bold leading-8 text-[#5F4A35]">
              Artistas perdem oportunidades porque editais são difíceis de
              encontrar, interpretar e filtrar.
            </p>
          </article>

          <article className="rounded-3xl border-2 border-[#21170F] bg-[#D89B2B] p-7 text-[#21170F] shadow-[7px_7px_0_#21170F]">
            <p className="text-xs font-black uppercase tracking-[0.25em]">
              Produto
            </p>

            <h3 className="mt-3 text-4xl font-black tracking-[-0.04em]">
              Solução
            </h3>

            <p className="mt-4 text-base font-bold leading-8">
              A plataforma organiza perfis, tags culturais e requisitos dos
              editais em um sistema simples e conectado ao banco.
            </p>
          </article>

          <article className="rounded-3xl border-2 border-[#21170F] bg-[#B85C38] p-7 text-white shadow-[7px_7px_0_#21170F]">
            <p className="text-xs font-black uppercase tracking-[0.25em]">
              Inteligência
            </p>

            <h3 className="mt-3 text-4xl font-black tracking-[-0.04em]">
              Matchmaking
            </h3>

            <p className="mt-4 text-base font-bold leading-8">
              O sistema calcula um score de compatibilidade entre artista e
              edital, destacando os melhores matches.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}