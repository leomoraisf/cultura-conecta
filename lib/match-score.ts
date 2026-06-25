export type MatchResult = {
  score: number;
  matchedTags: string[];
  missingTags: string[];
};

function normalizeTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function calculateMatchScore(
  artistTags: string[],
  opportunityTags: string[],
): MatchResult {
  const normalizedArtistTags = artistTags.map(normalizeTag);

  const matchedTags = opportunityTags.filter((tag) =>
    normalizedArtistTags.includes(normalizeTag(tag)),
  );

  const missingTags = opportunityTags.filter(
    (tag) => !normalizedArtistTags.includes(normalizeTag(tag)),
  );

  const score =
    opportunityTags.length === 0
      ? 0
      : Math.round((matchedTags.length / opportunityTags.length) * 100);

  return {
    score,
    matchedTags,
    missingTags,
  };
}