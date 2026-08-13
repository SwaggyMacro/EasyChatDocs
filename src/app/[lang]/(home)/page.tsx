import HomePage from '@/app/(home)/page';

export default async function LocaleHomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  return <HomePage language={lang === 'zh' ? 'zh' : 'en'} />;
}
