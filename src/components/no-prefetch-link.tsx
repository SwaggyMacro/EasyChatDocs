'use client';

import NextLink from 'next/link';
import { forwardRef, type ComponentProps } from 'react';

export type NoPrefetchLinkProps = ComponentProps<'a'> & { prefetch?: boolean };

export const NoPrefetchLink = forwardRef<HTMLAnchorElement, NoPrefetchLinkProps>(
  ({ href, prefetch: _prefetch, ...props }, ref) => {
    if (!href) return <a ref={ref} {...props} />;

    return <NextLink ref={ref} href={href} {...props} prefetch={false} />;
  },
);

NoPrefetchLink.displayName = 'NoPrefetchLink';
