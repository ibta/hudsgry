<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
    import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
    import { AppShell } from '@skeletonlabs/skeleton';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
    let element;
    let showHeader = false;
    function scrollHandler(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement; }) {
        // console.log(event.currentTarget.scrollTop);
        showHeader = event.currentTarget.scrollTop > 400;
    }

    const scrollToTop = node => {
        const scroll = () => node.scroll({
            top: 0,
            behavior: 'smooth',
        });
        scroll();

        return { update: scroll }
    };
</script>

<AppShell on:scroll={scrollHandler}>
    <div bind:this={element}></div>
    <svelte:fragment slot="header">
        <div class="{showHeader ? 'display' : 'hidden'}">
            <a on:click={() => element.scrollIntoView({"behavior": "smooth"})}>
                <img src="icons/crab.png" alt="crab because why not? click to go to the top"> TO THE TOP!
            </a>
        </div>
    </svelte:fragment>

    <slot />
    <svelte:fragment slot="pageFooter">
        <br>
        <br>
        <div class="text-center p-3 text-xs">
            for attribution purposes, ALL icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
        </div>
    </svelte:fragment>
</AppShell>
