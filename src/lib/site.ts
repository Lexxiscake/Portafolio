const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

export const SITE_URL = (
  configuredUrl ||
  (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000')
).replace(/\/+$/, '');
