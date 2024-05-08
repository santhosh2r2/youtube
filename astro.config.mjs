import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import starlightImageZoom from 'starlight-image-zoom';

// https://astro.build/config
export default defineConfig({
  site: 'https://santhosh2r2.github.io',
  base: 'youtube',
  integrations: [
    starlight({
      title: 'Home',
      logo: {
        src: "./src/assets/pic.jpg",
      },
      components: {
        SiteTitle: './src/components/overrides/SiteTitle.astro'
      },
      social: {
        youtube: "https://www.youtube.com/channel/UCR_Fuegjqal0Fvy6En2Bs3Q?sub_confirmation=1",
        linkedin: "https://www.linkedin.com/in/santhosh-balaji-ramesh/",
        github: 'https://github.com/santhosh2r2/youtube',
        email: "mailto:santhosh.mwpa@gmail.com"
      },
      favicon: "/image/pic.jpg",
      sidebar: [
        {
          label: 'Tutorials',
          autogenerate: {
            directory: 'tutorial', collapsed: true,
          }
        },
        {
          label: 'Tips & Tricks',
          collapsed: false,
          autogenerate: {
            directory: 'tips-and-tricks', collapsed: true,
          }
        },
        {
          label: 'Boilerplates',
          autogenerate: {
            directory: 'boilerplate', collapsed: true,
          }
        },
        {
          label: 'Installation',

          autogenerate: {
            directory: 'install', collapsed: true,
          }
        },
      ],
      editLink: {
        baseUrl: "https://github.com/santhosh2r2/youtube/tree/main",
      },
      plugins: [
        starlightImageZoom(),
        starlightBlog({
          authors: {
            sramesh: {
              name: "Santhosh Balaji Ramesh",
              title: "Tech aficiando",
              url: "https://www.youtube.com/channel/UCR_Fuegjqal0Fvy6En2Bs3Q?sub_confirmation=1",
              picture: "https://github.com/santhosh2r2.png"
            }
          },

        }),
      ]
    }),
  ]
});