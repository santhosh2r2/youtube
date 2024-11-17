# Youtube Channel - Companion website

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Follow my channel for video tips, tricks and tutorials.

[![youtube](./public/icon/youtube.svg)](https://www.youtube.com/channel/UCR_Fuegjqal0Fvy6En2Bs3Q?sub_confirmation=1)


## How to a new project entry

1. Create an entry in the file `src/components/projects.ts` having the following fields.
    - title
    - description
    - imageUrl
    - link
    - tags

2. `imageUrl` - for the project card image, a sample image is stored in the folder `public\resource\projects` folder
3. `link` - shows the path of the project. Usually, with the github base url.
4. Sample project entry
    ```js
    {
        title: "Simple OPCUA Server and Client",
        description: "A demo project",
        imageUrl: "/youtube/resource/projects/02-simple-opcua-server-and-client.png",
        link: "/youtube/projects/simple-opcua-server-and-client/",
        tags: [".net", "python", "IoT", "OPC-UA", "docker"],
    },
    ```