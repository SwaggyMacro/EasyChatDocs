import { HomeExperience } from '@/components/home/home-experience';

export default async function LocaleHomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  return <HomeExperience language={lang === 'zh' ? 'zh' : 'en'} />;
}
