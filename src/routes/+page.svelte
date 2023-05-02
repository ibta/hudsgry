<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
    // Call fetch api function from server.ts and log the result
    import { each } from "svelte/internal";
    import { TabGroup, Tab, Accordion, AccordionItem } from "@skeletonlabs/skeleton";

    import FoodList from "$lib/components/FoodList.svelte";

    /** @type {import("./$types").PageData} */
    export let data;
    export let timeOfDay

    timeOfDay = data.timeOfDay
    data = { data: data.data }


    // console.log(data);
    console.log(timeOfDay)
    console.log(data)
    console.log(tabSet)
    $: tabSet = timeOfDay;

    // A function to Show all of the Accordions by setting the class to "open"
    function handleShowAll() {
        let acc = document.getElementsByClassName("accordion");
        let i;
        for (i = 0; i < acc.length; i++) {
            acc[i].classList.add("open");
        }
    }

</script>

<div class="container h-full mx-auto flex flex-col">
    <!--	justify-center items-center-->
    <div class="p-6">
        <h1 class="text-6xl font-bold">huds.wtf</h1>
        <h4 class="font-bold">because that's what it feels like to use the api.</h4>
        <br>
        <h5 class="font-bold text-warning-500">so technically today for dinner, there is a "special menu" (not reflected here) <span class="text-xs">probably</span></h5>
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
            <Tab bind:group={tabSet} name="breakfast" value={0}><img class="inline-flex" src="icons/pancakes.png" width="32px" height="32px">  breakfast</Tab>
            <Tab bind:group={tabSet} name="lunch" value={1}><img class="inline-flex" src="icons/chicken.png" width="32px" height="32px">  lunch</Tab>
            <Tab bind:group={tabSet} name="dinner" value={2}><img class="inline-flex" src="icons/ramen.png">  dinner</Tab>
<!--            <Tab justify="justify-center" name="toggle" on:click={handleShowAll}>Show all</Tab>-->
<!--            <Tab justify="justify-center" name="toggle">Collapse</Tab>-->
            <svelte:fragment slot="panel">
                {#if tabSet === 0}
                    <Accordion>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/pancakes.png"
                                                              alt="a stack of pancakes (if all houses had them)"
                                                              height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">food for the people</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={1} location={"Cabot and Pforzheimer House"}/>
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
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
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/chicken.png" alt="chicken representing the lunch entrees" height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">entrees + regular non-speciality food</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={2} mealCategoryFilter="Entrees" location={"Cabot and Pforzheimer House"}/>
                                <FoodList data={data} mealNumber={2} mealCategoryFilter="Veg,Vegan" location={"Cabot and Pforzheimer House"}/>
                                <FoodList data={data} mealNumber={2} mealCategoryFilter="Vegetables" location={"Cabot and Pforzheimer House"}/>
                                <FoodList data={data} mealNumber={2} mealCategoryFilter="Plant Protein" location={"Cabot and Pforzheimer House"}/>
                                <FoodList data={data} mealNumber={2} mealCategoryFilter="Starch And Potatoes" location={"Cabot and Pforzheimer House"}/>
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/soup.png" alt="soup representing the soups and chilis" height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">soups + chili</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={2} mealCategoryFilter="Today's Soup" location={"Cabot and Pforzheimer House"}/>
                                <FoodList data={data} mealNumber={2} mealCategoryFilter="Chili Bar" location={"Cabot and Pforzheimer House"}/>
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/salad.png" alt="salad bowl to represent salad bar" height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">salad bar n stuff</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={2} mealCategoryFilter="Salad Bar" location={"Cabot and Pforzheimer House"}/>
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/sandwich.png" alt="a sandwich to represent the sandwich/deli section"> </svelte:fragment>
                            <svelte:fragment slot="summary">sandwich/deli</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={2} mealCategoryFilter="Sand/ Deli" location={"Cabot and Pforzheimer House"}/>
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/ice-cream.png" alt="ice cream for huds froyo"> </svelte:fragment>
                            <svelte:fragment slot="summary">dessert</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={2} mealCategoryFilter="Desserts" location={"Cabot and Pforzheimer House"}/>
                            </svelte:fragment>
                        </AccordionItem>
                        <!-- ... -->
                    </Accordion>
                {:else if tabSet === 2}
                    <Accordion>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/ramen.png" alt="ramen representing the dinner entrees" height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">entrees + regular non-speciality food</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={3} mealCategoryFilter="Entrees" location={"Cabot and Pforzheimer House"}/>
                                <FoodList data={data} mealNumber={3} mealCategoryFilter="Veg,Vegan" location={"Cabot and Pforzheimer House"}/>
                                <FoodList data={data} mealNumber={3} mealCategoryFilter="Vegetables" location={"Cabot and Pforzheimer House"}/>
                                <FoodList data={data} mealNumber={3} mealCategoryFilter="Plant Protein" location={"Cabot and Pforzheimer House"}/>
                                <FoodList data={data} mealNumber={3} mealCategoryFilter="Starch And Potatoes" location={"Cabot and Pforzheimer House"}/>
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/soup.png" alt="soup representing the soups and chilis AND pasta" height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">soups + chili + pasta</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={3} mealCategoryFilter="Today's Soup" location={"Cabot and Pforzheimer House"}/>
                                <FoodList data={data} mealNumber={3} mealCategoryFilter="Chili Bar" location={"Cabot and Pforzheimer House"}/>
                                <FoodList data={data} mealNumber={3} mealCategoryFilter="Whole Grain Pasta Bar" location={"Cabot and Pforzheimer House"}/>
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/salad.png" alt="salad bowl to represent salad bar" height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">salad bar n stuff</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={3} mealCategoryFilter="Salad Bar" location={"Cabot and Pforzheimer House"}/>
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/burger.png" alt="a burger to represent the grill section"> </svelte:fragment>
                            <svelte:fragment slot="summary">grill</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={3} mealCategoryFilter="From the Grill" location={"Cabot and Pforzheimer House"}/>
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/ice-cream.png" alt="ice cream for huds froyo"> </svelte:fragment>
                            <svelte:fragment slot="summary">dessert</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList data={data} mealNumber={3} mealCategoryFilter="Desserts" location={"Cabot and Pforzheimer House"}/>
                            </svelte:fragment>
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
