import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const GET = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const llmsBasePath = '/llms.mdx/';
  const slugPath = pathname.startsWith(llmsBasePath) ? pathname.slice(llmsBasePath.length) : '';
  const slugs = slugPath
    .split('/')
    .filter((slug) => slug.length > 0)
    .map((slug) => decodeURIComponent(slug));

  const page = source.getPage(slugs);
  if (!page) {
    return new Response('not found', { status: 404 });
  }

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
