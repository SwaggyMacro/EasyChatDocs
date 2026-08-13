import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

function VideoPlayer({ className, ...props }: ComponentProps<'video'>) {
  return (
    <video
      controls
      playsInline
      preload="metadata"
      className={`my-6 w-full rounded-lg border bg-black ${className ?? ''}`}
      {...props}
    />
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: (props) => <ImageZoom {...(props as any)} />,
    VideoPlayer,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
