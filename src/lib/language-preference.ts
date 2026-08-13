import { languageCookieName, type SiteLanguage } from './shared';

const oneYearInSeconds = 60 * 60 * 24 * 365;

export function isSiteLanguage(value: string): value is SiteLanguage {
  return value === 'en' || value === 'zh';
}

export function setLanguagePreference(language: SiteLanguage) {
  document.cookie = `${languageCookieName}=${language}; Path=/; Max-Age=${oneYearInSeconds}; SameSite=Lax`;
  document.documentElement.lang = language;
}
