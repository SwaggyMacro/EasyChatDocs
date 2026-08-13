'use client';

import { useEffect } from 'react';

export function LanguageRedirect() {
  useEffect(() => {
    const languages = navigator.languages.length > 0 ? navigator.languages : [navigator.language];
    const isChinese = languages.some((language) =>
      language.toLowerCase().startsWith('zh'),
    );
    const language = isChinese ? 'zh' : 'en';
    window.location.replace(`/${language}${window.location.search}${window.location.hash}`);
  }, []);

  return null;
}
