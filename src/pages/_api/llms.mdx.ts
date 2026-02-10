import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const GET = async (): Promise<Response> => {
  const page = source.getPage([]);
  if (!page) {
    return new Response('not found', { status: 404 });
  }

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
