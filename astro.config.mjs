import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import starlightImageZoom from 'starlight-image-zoom';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from "./webmanifest.json";

import rehypeMermaid from "rehype-mermaid";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  vite: {
    logLevel: 'info',
    plugins: [
      VitePWA({
        mode: 'production',
        registerType: 'prompt',
        workbox: {
          navigateFallback: '/youtube',
          globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,jpg}'],
        },
        experimental: {
          directoryAndTrailingSlashHandler: true,
        },
        manifest,
        devOptions: {
          enabled: false,
        },
      }),
    ],
  },
  build: {
    outDir: "../dist/youtube",
    chunkSizeWarningLimit: 5000,
  },
  site: 'https://santhosh2r2.github.io',
  base: 'youtube',
  output: 'static',
  integrations: [
    starlight({
      head: [
        {
          tag: "link",
          attrs: {
            href: "/youtube/manifest.webmanifest",
            rel: "manifest"
          }
        },
      ],
      title: 'Home',
      logo: {
        src: "./src/assets/pic.jpg",
      },
      components: {
        SiteTitle: './src/components/overrides/SiteTitle.astro',
        TableOfContents: './src/components/overrides/TableOfContents.astro',
        MarkdownContent: "./src/components/overrides/MarkdownContent.astro",
        // Sidebar: './src/components/overrides/Sidebar.astro',
      },
      social: [
        {
          icon: 'youtube',
          label: 'YouTube',
          href: 'https://www.youtube.com/channel/UCR_Fuegjqal0Fvy6En2Bs3Q?sub_confirmation=1',
        },
        {
          icon: 'linkedin',
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/santhosh-balaji-ramesh/',
        },
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/santhosh2r2/youtube',
        },
        {
          icon: 'email',
          label: 'Email',
          href: 'mailto:santhosh.mwpa@gmail.com',
        },
      ],
      favicon: "/image/pic.jpg",
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/santhosh2r2/youtube/tree/main",
      },
      plugins: [
        starlightImageZoom(),
        starlightBlog({
          authors: {
            sramesh: {
              name: "Santhosh Balaji Ramesh",
              title: "Tech aficionado",
              url: "https://www.youtube.com/channel/UCR_Fuegjqal0Fvy6En2Bs3Q?sub_confirmation=1",
              picture: "https://github.com/santhosh2r2.png"
            }
          },

        }),
      ],
      sidebar: [
        {
          collapsed: false,
          label: 'General',
          items: [{ autogenerate: { directory: 'general', collapsed: true } }],
        },
        {
          collapsed: true,
          label: 'Tutorials',
          items: [{ autogenerate: { directory: 'tutorial' } }],
        },
        {
          collapsed: true,
          label: 'Projects',
          items: [{ autogenerate: { directory: 'projects' } }],
        },
      ],
    }),
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],
  markdown: {
    rehypePlugins: [[rehypeMermaid, { strategy: "img-svg", dark: true }]],
  },
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },

});
