import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Database, House } from 'lucide-react';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Wafler Docs',
    },
    links: [
      {
        icon: <House />,
        text: 'Main Site',
        url: 'https://wafler.one',
      },
      {
        icon: <Database />,
        text: 'Dashboard',
        url: 'https://dash.wafler.one',
      }
    ],
    githubUrl: "https://github.com/Wafler1/wafler-docs"
  };
}
