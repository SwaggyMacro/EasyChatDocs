import { notFound } from 'next/navigation';
import { RootProvider } from 'fumadocs-ui/provider/next';

import { i18n } from '@/lib/shared';

const locales = i18n.languages.map((locale) => ({
  locale,
  name: locale === 'zh' ? '中文' : 'English',
}));

export default async function LocaleLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!i18n.languages.includes(lang as 'en' | 'zh')) notFound();

  return (
    <RootProvider
      i18n={{ locale: lang, locales }}
      theme={{ enabled: false }}
      search={{ options: { type: 'static', api: '/api/search' } }}
    >
      {children}
    </RootProvider>
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
