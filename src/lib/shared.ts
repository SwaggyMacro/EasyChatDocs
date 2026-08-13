export const appName = 'EasyChat';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';
import type { I18nConfig } from 'fumadocs-core/i18n';

export const i18n: I18nConfig<'en' | 'zh'> = {
  languages: ['en', 'zh'],
  defaultLanguage: 'en',
  parser: 'dir' as const,
  fallbackLanguage: 'en' as const,
  hideLocale: 'never' as const,
};

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: 'SwaggyMacro',
  repo: 'EasyChatDocs',
  branch: 'main',
};
