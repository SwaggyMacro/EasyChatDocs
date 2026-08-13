import { NextRequest, NextResponse } from 'next/server';

import { i18n, languageCookieName, type SiteLanguage } from '@/lib/shared';
const languageCookieMaxAge = 60 * 60 * 24 * 365;

function getRequestLanguage(request: NextRequest): SiteLanguage {
  const savedLanguage = request.cookies.get(languageCookieName)?.value;
  if (savedLanguage === 'en' || savedLanguage === 'zh') return savedLanguage;

  const preferredLanguage = request.headers
    .get('accept-language')
    ?.split(',')
    .map((entry) => {
      const [tag, ...parameters] = entry.trim().split(';');
      const quality = parameters.find((parameter) => parameter.trim().startsWith('q='));
      return { tag: tag.toLowerCase(), quality: quality ? Number(quality.trim().slice(2)) : 1 };
    })
    .filter((entry) => entry.tag && Number.isFinite(entry.quality))
    .sort((a, b) => b.quality - a.quality)[0]?.tag;

  return preferredLanguage === 'zh' || preferredLanguage?.startsWith('zh-') ? 'zh' : 'en';
}

function redirectToPreferredLanguage(request: NextRequest) {
  const language = getRequestLanguage(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${language}${url.pathname === '/' ? '' : url.pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(languageCookieName, language, {
    maxAge: languageCookieMaxAge,
    path: '/',
    sameSite: 'lax',
  });
  return response;
}

export function proxy(request: NextRequest) {
  const firstPathSegment = request.nextUrl.pathname.split('/')[1];
  if (!i18n.languages.includes(firstPathSegment as SiteLanguage)) {
    return redirectToPreferredLanguage(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|og|llms|.*\\..*).*)'],
};
