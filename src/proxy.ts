import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';

import {
  docsContentRoute,
  docsRoute,
  i18n,
  languageCookieName,
  type SiteLanguage,
} from '@/lib/shared';

const handleI18n = createI18nMiddleware({ ...i18n, cookieName: languageCookieName });
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

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const firstPathSegment = request.nextUrl.pathname.split('/')[1];
  if (!i18n.languages.includes(firstPathSegment as SiteLanguage)) {
    return redirectToPreferredLanguage(request);
  }

  const i18nResponse = await handleI18n(request, event);
  if (
    i18nResponse &&
    (i18nResponse.headers.has('location') || i18nResponse.headers.has('x-middleware-rewrite'))
  ) {
    return i18nResponse;
  }

  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl), {
        headers: { Vary: 'Accept' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|og|llms|.*\\..*).*)'],
};
