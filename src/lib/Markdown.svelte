<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";
    import AboutMe from "../docs/02_About_Me.md?raw";
</script>

<SvelteMarkdown source={AboutMe} options={{ gfs: true }}></SvelteMarkdown>
