/**
 * Author names carry both the maiden and married surname across the
 * publication record, so both count as "self" when highlighting.
 */
const selfSurnames = /\b(Ivanova|Nikonenko)\b/;

export interface AuthorName {
  name: string;
  isSelf: boolean;
}

export function splitAuthors(authors: string): AuthorName[] {
  return authors
    .split(";")
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => ({ name, isSelf: selfSurnames.test(name) }));
}
