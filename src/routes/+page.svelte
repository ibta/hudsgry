<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
    // Call fetch api function from server.ts and log the result
    import { each } from "svelte/internal";
    import { TabGroup, Tab, Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    import FoodList from "$lib/components/FoodList.svelte";

    $: tabSet = 0;


    /** @type {import("./$types").PageData} */
    export let data;

    // console.log(data);

</script>

<div class="container h-full mx-auto flex flex-col">
    <!--	justify-center items-center-->
    <div class="pt-6 pb-6">
        <h1 class="text-6xl font-bold">huds.wtf</h1>
        <h4 class="font-bold">because that's what it feels like to use the api.</h4>
    </div>
    <br>
    <div class="w-full text-token">
        <TabGroup active="variant-filled-primary"
                  hover="hover:variant-soft-primary"
                  flex="flex-1 lg:flex-none"
                  rounded="rounded-t-lg"
                  border=""
                  class="bg-surface-100-800-token rounded-lg w-full"
                  regionPanel="rounded-3xl">
            <Tab bind:group={tabSet} name="breakfast" value={0}>Breakfast</Tab>
            <Tab bind:group={tabSet} name="lunch" value={1}>Lunch</Tab>
            <Tab bind:group={tabSet} name="dinner" value={2}>Dinner</Tab>
            <svelte:fragment slot="panel">
                {#if tabSet === 0}
                    <Accordion>
                        <AccordionItem open>
                            <svelte:fragment slot="lead"><img src="icons/pancakes.png"
                                                              alt="a stack of pancakes (if all houses had them)"
                                                              height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">food for the people</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={1} location={"Cabot and Pforzheimer House"}/>
                            </svelte:fragment>
                        </AccordionItem>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/angry_cat.png"
                                                              alt="an upset cat because i want hot breakfast at my non-quincy non-annenberg house"
                                                              height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">annenberg/quincy exclusive (boo)</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={1} location={"Annenberg Hall"}/>
                            </svelte:fragment>
                        </AccordionItem>
                        <!-- ... -->
                    </Accordion>
                {:else if tabSet === 1}
                    <Accordion>
                        <AccordionItem open>
                            <svelte:fragment slot="lead"></svelte:fragment>
                            <svelte:fragment slot="summary">(summary)</svelte:fragment>
                            <svelte:fragment slot="content">(content)</svelte:fragment>
                        </AccordionItem>
                        <AccordionItem>
                            <svelte:fragment slot="lead">(icon)</svelte:fragment>
                            <svelte:fragment slot="summary">(summary)</svelte:fragment>
                            <svelte:fragment slot="content">(content)</svelte:fragment>
                        </AccordionItem>
                        <!-- ... -->
                    </Accordion>
                {:else if tabSet === 2}
                    <Accordion>
                        <AccordionItem open>
                            <svelte:fragment slot="lead">(icon)</svelte:fragment>
                            <svelte:fragment slot="summary">(summary)</svelte:fragment>
                            <svelte:fragment slot="content">(content)</svelte:fragment>
                        </AccordionItem>
                        <AccordionItem>
                            <svelte:fragment slot="lead">(icon)</svelte:fragment>
                            <svelte:fragment slot="summary">(summary)</svelte:fragment>
                            <svelte:fragment slot="content">(content)</svelte:fragment>
                        </AccordionItem>
                        <!-- ... -->
                    </Accordion>
                {/if}
            </svelte:fragment>
        </TabGroup>
    </div>



    <!--	<div class="space-y-5">-->
    <!--		<ul>-->
    <!--			{#each data.data as item}-->
    <!--				<li>{item.Allergens}</li>-->
    <!--			{/each }-->
    <!--		</ul>-->
    <!--		<h1>Let's get cracking bones!</h1>-->
    <!--		<p>Start by exploring:</p>-->
    <!--		<ul>-->
    <!--			<li><code>/src/routes/+layout.svelte</code> - barebones layout, the CSS import order is critical!</li>-->
    <!--			<li><code>/src/app.postcss</code> - minimal css to make the page full screen, may not be relevant for your project</li>-->
    <!--			<li><code>/src/routes/+page.svelte</code> - this page, you can replace the contents</li>-->
    <!--		</ul>-->
    <!--	</div>-->
</div>
