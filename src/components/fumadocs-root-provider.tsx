'use client';

import NextLink from 'next/link';
import { forwardRef, type ComponentProps } from 'react';
import {
  RootProvider,
  type RootProviderProps,
} from 'fumadocs-ui/provider/next';

type FumadocsLinkProps = ComponentProps<'a'> & { prefetch?: boolean };

const NoPrefetchLink = forwardRef<HTMLAnchorElement, FumadocsLinkProps>(
  ({ href, prefetch: _prefetch, ...props }, ref) => {
    if (!href) return <a ref={ref} {...props} />;

    return <NextLink ref={ref} href={href} {...props} prefetch={false} />;
  },
);

NoPrefetchLink.displayName = 'NoPrefetchLink';

export function FumadocsRootProvider({ components, ...props }: RootProviderProps) {
  return <RootProvider {...props} components={{ ...components, Link: NoPrefetchLink }} />;
}
