import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig, i18n } from './shared';
import { LanguageSwitcher } from '@/components/language-switcher';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-3">
          <span>{appName}</span>
          <LanguageSwitcher />
        </div>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    i18n,
  };
}
