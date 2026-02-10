import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          <img
            src="https://wafler.one/images/logo.png"
            alt="Wafler logo"
            width={20}
            height={20}
            className="rounded-sm"
          />
          <span>Wafler Documentation</span>
        </span>
      ),
    },
    githubUrl: "https://github.com/Wafler1/wafler-docs"
  };
}
