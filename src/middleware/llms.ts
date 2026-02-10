import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import type { MiddlewareHandler } from 'hono';

const { rewrite: rewriteMdx } = rewritePath('/{*path}.mdx', '/llms.mdx/{*path}');
const { rewrite: rewritePreferred } = rewritePath('/{*path}', '/llms.mdx/{*path}');

const excludedPrefixes = ['/llms.mdx', '/llms-full.txt', '/assets', '/RSC', '/_'];

function shouldIgnore(pathname: string): boolean {
  return excludedPrefixes.some((prefix) => pathname.startsWith(prefix));
}

function redirectTo(pathname: string, url: URL): Response {
  const destination = new URL(pathname, url);
  destination.search = url.search;

  return new Response(`Temporary redirect to ${destination.pathname}`, {
    status: 307,
    headers: {
      Location: destination.toString(),
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

export default function llmsMiddleware(): MiddlewareHandler {
  return async (c, next) => {
    const request = c.req.raw;
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (shouldIgnore(pathname)) {
      return next();
    }

    const mdxPath = rewriteMdx(pathname);
    if (mdxPath) {
      c.res = redirectTo(mdxPath, url);
      return;
    }

    const markdownPreferred = isMarkdownPreferred(request);
    if (markdownPreferred) {
      const preferredPath = rewritePreferred(pathname);
      if (preferredPath) {
        c.res = redirectTo(preferredPath, url);
        return;
      }
    }

    return next();
  };
}
