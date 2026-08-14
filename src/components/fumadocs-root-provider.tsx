'use client';

import {
  RootProvider,
  type RootProviderProps,
} from 'fumadocs-ui/provider/next';
import { NoPrefetchLink } from './no-prefetch-link';

export function FumadocsRootProvider({ components, ...props }: RootProviderProps) {
  return <RootProvider {...props} components={{ ...components, Link: NoPrefetchLink }} />;
}
