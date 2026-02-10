import { source } from '@/lib/source';
import { PageProps } from 'waku/router';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { LLMCopyButton, ViewOptions } from '@/components/page-actions';
import { baseOptions } from '@/lib/layout.shared';

const githubRepoUrl = baseOptions().githubUrl?.replace(/\.git$/, '').replace(/\/$/, '');

export default function DocPage({ slugs }: PageProps<'/[...slugs]'>) {
  const page = source.getPage(slugs);

  if (!page) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The page you are looking for does not exist.
        </p>
      </div>
    );
  }

  const MDX = page.data.body;
  const markdownUrl = `${page.url}.mdx`;
  const githubFileUrl = githubRepoUrl
    ? `${githubRepoUrl}/blob/main/content/docs/${page.path}`
    : 'https://github.com/Wafler1/wafler-docs';

  return (
    <DocsPage toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="flex flex-row flex-wrap gap-2 items-center border-b pt-2 pb-6">
        <LLMCopyButton markdownUrl={markdownUrl} />
        <ViewOptions markdownUrl={markdownUrl} githubUrl={githubFileUrl} />
      </div>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function getConfig() {
  return {
    render: 'dynamic' as const,
  } as const;
}
