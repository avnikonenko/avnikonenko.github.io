export const basePath = import.meta.env.BASE_URL || "/";

export function withBase(path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const cleanPath = path === "/" ? "" : path.replace(/^\/+/, "");
  const cleanBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
  return `${cleanBase}${cleanPath}`;
}

export function isPlaceholder(value?: string | null): boolean {
  return !value || value.startsWith("[ADD OR VERIFY:");
}
