import type { ParsedUrlQuery } from 'querystring';

export function buildRedirectUrl(
  url: string,
  asPath: string,
  query: ParsedUrlQuery
): string {
  if (!url) return '';

  // Parse the base target URL
  const target = new URL(url, window.location.origin);

  // Merge existing params from the target
  const mergedParams = new URLSearchParams(target.search);

  // Add absolute source
  const absoluteSource = `${window.location.origin}${asPath}`;
  mergedParams.set('source', absoluteSource);

  // Forward utm_* params from the current page
  for (const [key, value] of Object.entries(query)) {
    if (key.startsWith('utm_') && typeof value === 'string') {
      mergedParams.set(key, value);
    }
  }

  // Add timestamp
  mergedParams.set('ts', Date.now().toString());

  // Build final merged URL
  target.search = mergedParams.toString();

  return target.toString();
}
