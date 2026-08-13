'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';

import { setLanguagePreference } from '@/lib/language-preference';

export function LanguageSwitcher({ language = 'en' }: { language?: 'en' | 'zh' }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLanguage = pathname.split('/')[1] === 'zh' ? 'zh' : pathname.split('/')[1] === 'en' ? 'en' : language;

  function changeLanguage(event: MouseEvent<HTMLButtonElement>, nextLanguage: 'en' | 'zh') {
    // The Fumadocs nav title is rendered inside a home link. Keep the switcher's
    // click from activating that parent link on documentation pages.
    event.preventDefault();
    event.stopPropagation();
    setLanguagePreference(nextLanguage);
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'en' || segments[0] === 'zh') segments[0] = nextLanguage;
    else segments.unshift(nextLanguage);
    const nextPathname = `/${segments.join('/')}`;
    router.push(nextPathname);
  }

  return (
    <div
      className="inline-flex items-center rounded-full border border-fd-foreground/15 bg-fd-background/70 p-0.5 text-xs font-medium shadow-sm backdrop-blur"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={(event) => changeLanguage(event, 'en')}
        aria-pressed={currentLanguage === 'en'}
        className={`rounded-full px-2.5 py-1 transition-colors ${currentLanguage === 'en' ? 'bg-fd-foreground text-fd-background' : 'text-fd-muted-foreground hover:text-fd-foreground'}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={(event) => changeLanguage(event, 'zh')}
        aria-pressed={currentLanguage === 'zh'}
        className={`rounded-full px-2.5 py-1 transition-colors ${currentLanguage === 'zh' ? 'bg-fd-foreground text-fd-background' : 'text-fd-muted-foreground hover:text-fd-foreground'}`}
      >
        中文
      </button>
    </div>
  );
}
