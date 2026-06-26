export type ExtractedOpportunity = {
  title: string;
  institution: string;
  value: string;
  deadline: string;
  description: string;
  tags: string[];
  confidence: number;
};

const CULTURAL_TAGS = [
  "música",
  "teatro",
  "audiovisual",
  "dança",
  "literatura",
  "cultura popular",
  "artes visuais",
  "fotografia",
  "cinema",
  "periferia",
  "juventude",
  "mulheres",
  "negro",
  "indígena",
  "lgbtqia",
  "educação",
  "formação",
  "oficina",
  "circulação",
  "festival",
  "patrimônio",
  "memória",
  "território",
  "comunidade",
  "coletivo",
  "Minas Gerais",
  "Belo Horizonte",
  "interior",
  "regional",
  "nacional",
  "inovação",
  "acessibilidade",
  "inclusão",
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getCleanLines(text: string) {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 3);
}

function extractTitle(lines: string[], fileName: string) {
  const titleLine =
    lines.find((line) => {
      const normalized = normalizeText(line);

      return (
        line.length <= 130 &&
        (normalized.includes("edital") ||
          normalized.includes("chamada") ||
          normalized.includes("premio") ||
          normalized.includes("fomento") ||
          normalized.includes("cultura"))
      );
    }) ?? lines.find((line) => line.length <= 100);

  if (titleLine) {
    return titleLine;
  }

  return fileName.replace(/\.pdf$/i, "").replace(/[-_]/g, " ");
}

function extractInstitution(lines: string[]) {
  const institutionLine = lines.find((line) => {
    const normalized = normalizeText(line);

    return (
      normalized.includes("secretaria") ||
      normalized.includes("fundacao") ||
      normalized.includes("prefeitura") ||
      normalized.includes("ministerio") ||
      normalized.includes("instituto") ||
      normalized.includes("sesc") ||
      normalized.includes("senac") ||
      normalized.includes("universidade") ||
      normalized.includes("governo") ||
      normalized.includes("cultura")
    );
  });

  return institutionLine ?? "Instituição não identificada";
}

function extractValue(text: string) {
  const valueMatch = text.match(
    /R\$\s?\d{1,3}(?:\.\d{3})*(?:,\d{2})?(?:\s?(mil|milhão|milhões))?/i,
  );

  return valueMatch?.[0] ?? "Valor não identificado";
}

function toIsoDate(day: string, month: string, year: string) {
  const numericDay = Number(day);
  const numericMonth = Number(month);
  let numericYear = Number(year);

  if (numericYear < 100) {
    numericYear += 2000;
  }

  const date = new Date(numericYear, numericMonth - 1, numericDay);

  const isValid =
    date.getFullYear() === numericYear &&
    date.getMonth() === numericMonth - 1 &&
    date.getDate() === numericDay;

  if (!isValid) {
    return "";
  }

  return `${numericYear}-${String(numericMonth).padStart(2, "0")}-${String(
    numericDay,
  ).padStart(2, "0")}`;
}

function extractDeadline(text: string) {
  const dateRegex = /\b(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})\b/g;
  const matches = [...text.matchAll(dateRegex)];

  if (matches.length === 0) {
    return "";
  }

  const preferredMatch = matches.find((match) => {
    const index = match.index ?? 0;
    const context = normalizeText(text.slice(Math.max(0, index - 120), index + 120));

    return (
      context.includes("inscricao") ||
      context.includes("inscricoes") ||
      context.includes("prazo") ||
      context.includes("encerramento") ||
      context.includes("ate") ||
      context.includes("submissao")
    );
  });

  const selected = preferredMatch ?? matches[0];

  return toIsoDate(selected[1], selected[2], selected[3]);
}

function extractDescription(lines: string[]) {
  const paragraph =
    lines.find((line) => {
      const normalized = normalizeText(line);

      return (
        line.length > 120 &&
        !normalized.includes("sumario") &&
        !normalized.includes("indice") &&
        !normalized.includes("cronograma")
      );
    }) ?? lines.slice(0, 5).join(" ");

  return paragraph.slice(0, 700);
}

function extractTags(text: string) {
  const normalizedText = normalizeText(text);

  const foundTags = CULTURAL_TAGS.filter((tag) =>
    normalizedText.includes(normalizeText(tag)),
  );

  const uniqueTags = Array.from(new Set(foundTags));

  if (uniqueTags.length > 0) {
    return uniqueTags.slice(0, 10);
  }

  return ["cultura", "edital"];
}

function calculateConfidence(data: Omit<ExtractedOpportunity, "confidence">) {
  let score = 0;

  if (data.title && data.title !== "Edital importado") score += 20;
  if (data.institution !== "Instituição não identificada") score += 20;
  if (data.value !== "Valor não identificado") score += 20;
  if (data.deadline) score += 20;
  if (data.tags.length >= 2) score += 20;

  return score;
}

export function extractOpportunityFromText(
  text: string,
  fileName: string,
): ExtractedOpportunity {
  const lines = getCleanLines(text);

  const extracted = {
    title: extractTitle(lines, fileName),
    institution: extractInstitution(lines),
    value: extractValue(text),
    deadline: extractDeadline(text),
    description: extractDescription(lines),
    tags: extractTags(text),
  };

  return {
    ...extracted,
    confidence: calculateConfidence(extracted),
  };
}