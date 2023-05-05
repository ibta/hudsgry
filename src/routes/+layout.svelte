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
    let showButton = false;
    function scrollHandler(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement; }) {
        // console.log(event.currentTarget.scrollTop);
        showButton = event.currentTarget.scrollTop > 400;
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

<style>
    /* https://codepen.io/alianmorales/pen/GyrgjO */
    @keyframes slide1 {
        0%,
        100% {
            transform: translate(0, 0);
        }

        50% {
            transform: translate(10px, 0);
        }
    }
</style>

<AppShell on:scroll={scrollHandler} class="grid">
    <div bind:this={element}></div>
    <svelte:fragment slot="header"></svelte:fragment>
    <div class="grid">
        <slot />
    </div>
    <div class="{showButton ? 'display' : 'hidden'} grid grid-cols-5 lg:grid-cols-11 bottom-0 left-0 sticky p-6">
        <button type="button" on:click={() => element.scrollIntoView({"behavior": "smooth"})} class="btn btn-sm bg-primary-500 lg:col-span-1 lg:col-start-6 col-start-3">
            <img class="inline-block" src="icons/crab.png" alt="crab because why not? click to go to the top"> UP!!
        </button>
    </div>
    <svelte:fragment slot="pageFooter">
        <br>
        <br>
        <div class="text-center p-3 text-xs">
            for attribution purposes, ALL icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>
        </div>
    </svelte:fragment>


</AppShell>
