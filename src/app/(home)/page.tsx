import { HomeExperience } from '@/components/home/home-experience';

export default function HomePage({ language = 'en' }: { language?: 'en' | 'zh' }) {
  return <HomeExperience language={language} />;
}
