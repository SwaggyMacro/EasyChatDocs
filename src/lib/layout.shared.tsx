import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { appName, gitConfig, i18n, type SiteLanguage } from './shared';
import { LanguageSwitcher } from '@/components/language-switcher';

export function baseOptions(language: SiteLanguage): BaseLayoutProps {
  return {
    nav: {
      url: `/${language}`,
      title: (
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <Image
              src="/easychat-logo.png"
              alt="EasyChat logo"
              width={24}
              height={24}
              className="size-6 shrink-0"
              priority
            />
            <span>{appName}</span>
          </span>
          <LanguageSwitcher />
        </div>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    i18n,
  };
}
