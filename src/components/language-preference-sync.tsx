'use client';

import { useEffect } from 'react';

import { setLanguagePreference } from '@/lib/language-preference';
import type { SiteLanguage } from '@/lib/shared';

export function LanguagePreferenceSync({ language }: { language: SiteLanguage }) {
  useEffect(() => {
    setLanguagePreference(language);
  }, [language]);

  return null;
}
