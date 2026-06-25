export default function Home() {
  return (
    <main className="min-h-screen text-[#241C15]">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <a href="/" className="w-fit">
            <div className="inline-flex rotate-[-2deg] rounded-full border-2 border-[#241C15] bg-[#D89B2B] px-4 py-1 text-xs font-black uppercase tracking-[0.25em] shadow-[4px_4px_0_#241C15]">
              Cultura viva
            </div>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Cultura Conecta
            </h1>

            <p className="text-sm font-bold text-[#5D6B3F]">
              Editais, artistas e oportunidades na mesma roda.
            </p>
          </a>

          <nav className="flex flex-wrap gap-3">
            <a
              href="/dashboard"
              className="rounded-full border-2 border-[#241C15] bg-[#F6EAD2] px-4 py-2 text-sm font-black uppercase shadow-[3px_3px_0_#241C15] transition hover:-translate-y-0.5"
            >
              Painel
            </a>

            <a
              href="/artistas"
              className="rounded-full border-2 border-[#241C15] bg-[#B85C38] px-4 py-2 text-sm font-black uppercase text-white shadow-[3px_3px_0_#241C15] transition hover:-translate-y-0.5"
            >
              Artistas
            </a>

            <a
              href="/editais"
              className="rounded-full border-2 border-[#241C15] bg-[#D89B2B] px-4 py-2 text-sm font-black uppercase shadow-[3px_3px_0_#241C15] transition hover:-translate-y-0.5"
            >
              Editais
            </a>

            <a
              href="/matches"
              className="rounded-full border-2 border-[#241C15] bg-[#5D6B3F] px-4 py-2 text-sm font-black uppercase text-white shadow-[3px_3px_0_#241C15] transition hover:-translate-y-0.5"
            >
              Matches
            </a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <section>
            <div className="mb-6 inline-flex rotate-[-1deg] rounded-2xl border-2 border-[#241C15] bg-[#7A2E3A] px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[5px_5px_0_#241C15]">
              Para artistas, coletivos e produtores culturais
            </div>

            <h2 className="max-w-4xl text-6xl font-black leading-[0.95] tracking-tight md:text-8xl">
              O edital certo para cada artista.
            </h2>

            <p className="mt-8 max-w-2xl text-xl font-semibold leading-9 text-[#4E3B2A]">
              Uma plataforma com alma de cartaz de rua: cadastra artistas,
              organiza editais e calcula automaticamente quais oportunidades
              combinam com cada trajetória cultural.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/artistas"
                className="rounded-2xl border-2 border-[#241C15] bg-[#B85C38] px-7 py-4 text-center text-base font-black uppercase text-white shadow-[6px_6px_0_#241C15] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#241C15]"
              >
                Cadastrar artista
              </a>

              <a
                href="/editais"
                className="rounded-2xl border-2 border-[#241C15] bg-[#D89B2B] px-7 py-4 text-center text-base font-black uppercase shadow-[6px_6px_0_#241C15] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#241C15]"
              >
                Cadastrar edital
              </a>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row">
              <a
                href="/matches"
                className="rounded-2xl border-2 border-[#241C15] bg-[#5D6B3F] px-7 py-4 text-center text-base font-black uppercase text-white shadow-[6px_6px_0_#241C15] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#241C15]"
              >
                Ver matchmaking
              </a>

              <a
                href="/dashboard"
                className="rounded-2xl border-2 border-[#241C15] bg-[#F6EAD2] px-7 py-4 text-center text-base font-black uppercase shadow-[6px_6px_0_#241C15] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_#241C15]"
              >
                Abrir painel
              </a>
            </div>
          </section>

          <section className="relative">
            <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full border-4 border-[#241C15] bg-[#D89B2B]" />
            <div className="absolute -bottom-6 -right-4 h-28 w-28 rounded-full border-4 border-[#241C15] bg-[#B85C38]" />

            <div className="relative rotate-[1deg] rounded-[2rem] border-4 border-[#241C15] bg-[#F6EAD2] p-6 shadow-[12px_12px_0_#241C15]">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7A2E3A]">
                    Roda de oportunidades
                  </p>

                  <h3 className="mt-1 text-3xl font-black">
                    Como funciona
                  </h3>
                </div>

                <span className="rotate-3 rounded-full border-2 border-[#241C15] bg-[#5D6B3F] px-4 py-2 text-sm font-black uppercase text-white shadow-[3px_3px_0_#241C15]">
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
                    color: "bg-[#D89B2B]",
                  },
                  {
                    number: "03",
                    title: "Match cultural",
                    text: "O algoritmo cruza tags e gera um score de compatibilidade.",
                    color: "bg-[#5D6B3F] text-white",
                  },
                ].map((item) => (
                  <article
                    key={item.number}
                    className="rounded-3xl border-2 border-[#241C15] bg-white/45 p-5 shadow-[5px_5px_0_#241C15]"
                  >
                    <div className="flex gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-[#241C15] text-lg font-black shadow-[3px_3px_0_#241C15] ${item.color}`}
                      >
                        {item.number}
                      </div>

                      <div>
                        <h4 className="text-xl font-black">{item.title}</h4>
                        <p className="mt-2 text-sm font-semibold leading-6 text-[#4E3B2A]">
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

      <section className="border-y-4 border-[#241C15] bg-[#1F4E5F] px-6 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div className="rounded-3xl border-2 border-[#241C15] bg-[#F6EAD2] p-6 text-[#241C15] shadow-[6px_6px_0_#241C15]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#B85C38]">
              Dor real
            </p>
            <h3 className="mt-2 text-3xl font-black">Problema</h3>
            <p className="mt-4 font-semibold leading-7 text-[#4E3B2A]">
              Artistas perdem oportunidades porque editais são difíceis de
              encontrar, interpretar e filtrar.
            </p>
          </div>

          <div className="rounded-3xl border-2 border-[#241C15] bg-[#D89B2B] p-6 text-[#241C15] shadow-[6px_6px_0_#241C15]">
            <p className="text-xs font-black uppercase tracking-[0.2em]">
              Produto
            </p>
            <h3 className="mt-2 text-3xl font-black">Solução</h3>
            <p className="mt-4 font-semibold leading-7">
              A plataforma organiza perfis, tags culturais e requisitos dos
              editais em um sistema simples e conectado ao banco.
            </p>
          </div>

          <div className="rounded-3xl border-2 border-[#241C15] bg-[#B85C38] p-6 text-white shadow-[6px_6px_0_#241C15]">
            <p className="text-xs font-black uppercase tracking-[0.2em]">
              Inteligência
            </p>
            <h3 className="mt-2 text-3xl font-black">Matchmaking</h3>
            <p className="mt-4 font-semibold leading-7">
              O sistema calcula um score de compatibilidade entre artista e
              edital, destacando os melhores matches.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}