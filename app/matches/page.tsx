import AppNav from "@/components/AppNav";
import { calculateMatchScore } from "@/lib/match-score";

const artists = [
  {
    name: "Coletivo Vozes do Morro",
    area: "Música independente",
    tags: ["música", "periferia", "juventude", "formação", "Minas Gerais"],
  },
  {
    name: "Cena Livre Teatro",
    area: "Teatro comunitário",
    tags: ["teatro", "coletivo", "educação", "circulação"],
  },
  {
    name: "Frame Favela",
    area: "Audiovisual periférico",
    tags: ["audiovisual", "periferia", "documentário", "formação"],
  },
];

const opportunities = [
  {
    title: "Edital Música Independente MG",
    institution: "Secretaria Estadual de Cultura",
    tags: ["música", "juventude", "Minas Gerais"],
  },
  {
    title: "Fomento Audiovisual Periferias",
    institution: "Fundo Cultural Nacional",
    tags: ["audiovisual", "periferia", "formação"],
  },
  {
    title: "Circuito Cultural Regional",
    institution: "Programa Cultura Viva",
    tags: ["teatro", "circulação", "coletivo"],
  },
  {
    title: "Festival de Cultura Digital",
    institution: "Instituto Criativo Brasil",
    tags: ["tecnologia", "audiovisual", "formação"],
  },
];

const generatedMatches = artists
  .flatMap((artist) =>
    opportunities.map((opportunity) => {
      const result = calculateMatchScore(artist.tags, opportunity.tags);

      return {
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

export default function MatchesPage() {
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
            Agora os scores são calculados automaticamente comparando as tags
            dos artistas com os requisitos dos editais.
          </p>
        </div>

        <div className="space-y-5">
          {generatedMatches.map((match) => (
            <article
              key={`${match.artist}-${match.opportunity}`}
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
                    Compatibilidade calculada com base nas tags em comum entre
                    o perfil cultural do artista e os requisitos do edital.
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