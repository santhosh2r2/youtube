import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog'

// https://astro.build/config
export default defineConfig({
  site: 'https://santhosh2r2.github.io',
  base: 'youtube',
  integrations: [
    starlight({
      title: 'Home',
      logo: {
        src: "./src/assets/pic.jpg",
        // replacesTitle: true,
      },
      social: {
        // github: 'https://github.com/santhosh2r2/youtube',
        youtube: "https://www.youtube.com/channel/UCR_Fuegjqal0Fvy6En2Bs3Q",
      },
      favicon:"./src/assets/pic.jpg",
      sidebar: [
        {
          label: 'Installation',
          autogenerate: {
            directory: 'install'
          }
        },
        {
          label: 'Blog',
          autogenerate: {
            directory: 'blog'
          }
        },
      ],
      plugins: [
        starlightBlog({
          authors: {
            sramesh: {
              name: "Santhosh Balaji Ramesh",
              title: "Software Engineer",
              url: "https://www.youtube.com/channel/UCR_Fuegjqal0Fvy6En2Bs3Q",
              picture: "https://github.com/santhosh2r2.png"
            }
          }
        })
      ]
    }),
  ]
});