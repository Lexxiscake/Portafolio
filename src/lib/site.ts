const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/+$/, '');

export const SITE_URL = (
  configuredUrl ||
  (vercelUrl ? `https://${vercelUrl}` : 'https://lexxiscake.github.io/Portafolio')
).replace(/\/+$/, '');

export function withBasePath(path: string): string {
  if (!path) return '';
  if (
    /^(?:[a-z]+:)?\/\//i.test(path) ||
    path.startsWith('data:') ||
    path.startsWith('#') ||
    path.startsWith('mailto:')
  ) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (!BASE_PATH) return cleanPath;
  if (cleanPath === BASE_PATH || cleanPath.startsWith(`${BASE_PATH}/`)) {
    return cleanPath;
  }
  return `${BASE_PATH}${cleanPath}`;
}
