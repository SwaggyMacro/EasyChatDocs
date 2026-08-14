export const appName = 'EasyChat';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';
export const qqGroupUrl = 'https://qm.qq.com/q/rXrrefKXNQ';
// Keep this separate from Fumadocs' legacy FD_LOCALE cookie so an old default
// does not override the user's browser language on their first visit.
export const languageCookieName = 'easychat_locale';
import type { I18nConfig } from 'fumadocs-core/i18n';

export type SiteLanguage = 'en' | 'zh';

export const i18n: I18nConfig<SiteLanguage> = {
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
