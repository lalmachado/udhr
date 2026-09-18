/**
 * The source text keeps each article as a single string, with numbered
 * clauses written inline ("1. … 2. …"). These helpers turn that into
 * structure the components can render semantically.
 */

/** Split "1. Foo. 2. Bar." into ["Foo.", "Bar."]. Unnumbered text stays whole. */
export function splitClauses(text: string): string[] {
  const trimmed = text.trim();
  if (!/^\d+\.\s/.test(trimmed)) return [trimmed];
  return trimmed
    .split(/\s+(?=\d+\.\s)/)
    .map((clause) => clause.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);
}

export interface ParsedPreamble {
  /** The seven "Whereas …" recitals, each kept verbatim. */
  whereas: string[];
  /** "Now, therefore," */
  lead: string;
  /** "The General Assembly" */
  subject: string;
  /** "Proclaims this Universal Declaration …" */
  proclamation: string;
}

export function parsePreamble(raw: string): ParsedPreamble {
  const [recitals = "", resolution = ""] = raw.split(/\s*(?=Now, therefore,)/);
  const whereas = recitals
    .split(/\s*(?=Whereas\s)/)
    .map((clause) => clause.trim())
    .filter(Boolean);

  const match = resolution.match(
    /^(Now, therefore,)\s+(The General Assembly),?\s+(Proclaims[\s\S]*)$/,
  );

  return {
    whereas,
    lead: match?.[1] ?? "Now, therefore,",
    subject: match?.[2] ?? "The General Assembly",
    proclamation: match?.[3] ?? resolution.trim(),
  };
}
