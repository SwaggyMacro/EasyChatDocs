import { RootProvider } from 'fumadocs-ui/provider/next';

import { i18n } from '@/lib/shared';

const locales = i18n.languages.map((locale) => ({
  locale,
  name: locale === 'zh' ? '中文' : 'English',
}));

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <RootProvider
      i18n={{ locale: i18n.defaultLanguage, locales }}
      theme={{ enabled: false }}
      search={{ options: { type: 'static', api: '/api/search' } }}
    >
      {children}
    </RootProvider>
  );
}
