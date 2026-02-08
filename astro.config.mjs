import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import starlightImageZoom from 'starlight-image-zoom';
import AstroPWA from "@vite-pwa/astro";
import manifest from "./webmanifest.json";

import rehypeMermaid from "rehype-mermaid";
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
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
      social: {
        youtube: "https://www.youtube.com/channel/UCR_Fuegjqal0Fvy6En2Bs3Q?sub_confirmation=1",
        linkedin: "https://www.linkedin.com/in/santhosh-balaji-ramesh/",
        github: 'https://github.com/santhosh2r2/youtube',
        email: "mailto:santhosh.mwpa@gmail.com"
      },
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
        { collapsed: false, label: 'General', autogenerate: { directory: 'general', collapsed: true } },
        { collapsed: true, label: 'Tutorials', autogenerate: { directory: 'tutorial', } },
        { collapsed: true, label: 'Projects', autogenerate: { directory: 'projects', } },
      ],
    }),
    // registerType: "prompt",
    // mainfest.json > id -- this field needs to be changed (or versioned)
    //                       in order to generate the prompt
    AstroPWA({
      mode: "production",
      registerType: "prompt",
      workbox: {
        navigateFallback: "/youtube",
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,jpg}"],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
      manifest: manifest,
      devOptions: {
        enabled: true,
      },
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
