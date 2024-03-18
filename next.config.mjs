/** @type {import('next').NextConfig} */

import createWithBundleAnalyzer from '@next/bundle-analyzer';
import createWithMdx from '@next/mdx';
 import { h } from 'hastscript';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeToc from 'rehype-toc';

const withBundleAnalyzer = createWithBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: process.env.ANALYZE === 'true',
});

function rehypeWrapMainContent() {
  return (tree) => {
    let navNode;
    const nonNavNodes = tree.children?.filter((node) => {
      if (node.type === 'element' && node.tagName === 'TocNav') {
        navNode = node;
        return false;
      }
      return true;
    });

    if (navNode) {
      tree.children = [
        h('div.docs-main-contents', h('prose', nonNavNodes)),
        h('div.docs-toc', navNode),
      ];
    }

    return tree;
  };
}

const withMDX = createWithMdx({
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeToc,
        {
          headings: ['h2', 'h3'],
          customizeTOC: (toc) => {
            // change element from nav to TOCNav
            // We need this to be able to render a custom component in mdx-components
            // to replace the `a` tags with `Link` components
            toc.tagName = 'TocNav';
            return toc;
          },
        },
      ],
      rehypeWrapMainContent,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
        },
      ],
    ],
  },
});

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.gravatar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  reactStrictMode: true,
};

export default withBundleAnalyzer( (withMDX(nextConfig)));
