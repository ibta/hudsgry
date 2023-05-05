<script>
    // Call fetch api function from server.ts and log the result
    import { each } from "svelte/internal";
    import { TabGroup, Tab, Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    import { invalidate, invalidateAll } from "$app/navigation";

    import FoodList from "$lib/components/FoodList.svelte";
    import { counter } from "../stores.ts";

    /** @type {{data: Awaited<Awaited<Promise<{data: any; timeOfDay: number}>>["data"]>}} */
    export let data;
    export let timeOfDay

    timeOfDay = data.timeOfDay

    let countedValue;
    counter.subscribe(value => countedValue = value)

    let breakfastFoods = data.data.Breakfast;
    let lunchFoods = data.data.Lunch;
    let dinnerFoods = data.data.Dinner;
    // console.log(breakfastFoods)

    let breakfastCategories = [];
    breakfastFoods.forEach((food) => {
        if (!breakfastCategories.includes(food.Menu_Category_Name)) {
            breakfastCategories.push(food.Menu_Category_Name);
        }
    });
    const breakfastEntrees = ["Bagel", "Breakfast Meats", "Breakfast Entrees", "Breakfast Bakery", "Starches and Potatoes"].join(" ")
    const breakfastSides = ["Special Bars  Board Menu", "Fresh Fruit", "Salad Bar", "Build Your Own"].join(" ")
    const breakfastCategoriesMap = {"entrees": breakfastEntrees, "yogurt, oatmeal, bagels, fruit": breakfastSides}

    let lunchCategories = [];
    lunchFoods.forEach((food) => {
        if (!lunchCategories.includes(food.Menu_Category_Name)) {
            lunchCategories.push(food.Menu_Category_Name);
        }
    });
    const lunchSandSoup = ["Today's Soup", "Chili Bar"].join(" ")
    const lunchEntrees = ["Entrees", "Veg,Vegan", "Starch and Potatoes", "Vegetables", "Plant Protein", "Delish"].join(" ")
    const lunchSaladBar = ["Salad Bar", "Brown Rice station"].join(" ")
    const lunchSandwichDeli = "Sand/ Deli"
    const lunchDesserts = "Desserts"
    const lunchCategoriesMap = {"soup and sandwiches": lunchSandSoup, "entrees": lunchEntrees, "salad bar": lunchSaladBar, "sandwiches and deli": lunchSandwichDeli, "desserts": lunchDesserts}

    // console.log(lunchCategories)

    let dinnerCategories = [];
    dinnerFoods.forEach((food) => {
        if (!dinnerCategories.includes(food.Menu_Category_Name)) {
            dinnerCategories.push(food.Menu_Category_Name);
        }
    });
    let brainBreak = dinnerCategories.includes("Brain Break")
    const dinnerEntrees = ["Entrees", "Veg,Vegan", "Starch and Potatoes", "Vegetables", "Plant Protein"].join(" ")
    const dinnerSaladBar = ["Salad Bar", "Brown Rice station"].join(" ")
    const dinnerSoupsAndPasta = "Today's Soup Whole Grain Pasta Bar"
    const dinnerGrill = "From the Grill"
    const dinnerDesserts = "Desserts"

    const dinnerCategoriesMap = {"entrees": dinnerEntrees, "salad bar": dinnerSaladBar, "grill": dinnerGrill, "soups and pasta": dinnerSoupsAndPasta, "desserts": dinnerDesserts}

    // console.log(dinnerCategories)
    // function nextDay() {
    //     // any of these will cause the `load` function to re-run
    //     invalidateAll();
    // }
    let now = new Date();
    $: dateTime = now.toLocaleString('en-us', {
        hour12: false,
        month: 'long',
        weekday: 'long',
        day: 'numeric',
    });

    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + countedValue);
    nextDay = nextDay.toLocaleString('en-us', {
        hour12: false,
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }).split(",")[0].split("/").join("-")

    let prevDay = new Date();
    prevDay.setDate(prevDay.getDate() - countedValue);
    prevDay = prevDay.toLocaleString('en-us', {
        hour12: false,
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }).split(",")[0].split("/").join("-")

    $: tabSet = timeOfDay;


    counter.set(countedValue + 1)

</script>

<style>
    @keyframes lr {
        0%, 100% {
            transform: translateX(-25%);
            animation-timing-function: ease-in-out;
        }
        50% {
            transform: translateX(0);
            animation-timing-function: ease-in-out;
        }
    }

    @keyframes rl {
        0%, 100% {
            transform: translateX(25%);
            animation-timing-function: ease-in-out;
        }
        50% {
            transform: translateX(0);
            animation-timing-function: ease-in-out;
        }
    }

    .arrow-left-move {
        fill: #fff;
    }

    .arrow-right-move {
        fill: #fff;
    }
    .rb:hover .arrow-right-move {
        animation: lr 1.5s infinite;
    }

    .lb:hover .arrow-left-move {
        animation: rl 1.5s infinite;
    }
</style>

<div class="container h-full mx-auto flex flex-col">
    <!--	justify-center items-center-->
    <div class="pt-6 pl-2 lg:pl-0">
        <h1 class="text-6xl font-bold">huds.wtf</h1>
        <h4 class="font-bold">because that's what it feels like to use the api.</h4>
        <h4 class="font-bold text-warning-500">{dateTime.toLowerCase()}</h4>
        <br>
    </div>
    <br>

    <!--  CONCEPT: MENU  -->
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
            {#if brainBreak }
                <Tab bind:group={tabSet} name="brainbreak" value={3}><img class="inline-flex" src="icons/crab.png">  ~brain break~</Tab>
            {/if}

            <svelte:fragment slot="panel">
                <hr>
                {#if tabSet === 0}
                    <Accordion>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/pancakes.png"
                                                              alt="a stack of pancakes (if all houses had them)"
                                                              height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">entrees/main meal</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList bind:data={breakfastFoods} categoryMap={breakfastCategoriesMap} mealName="entrees"/>
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/angry_cat.png"
                                                              alt="an upset cat because i want hot breakfast at my non-quincy non-annenberg house"
                                                              height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">yogurt, oatmeal, bagels, fruits</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList bind:data={breakfastFoods} categoryMap={breakfastCategoriesMap} mealName="yogurt, oatmeal, bagels, fruit"/>
                            </svelte:fragment>
                        </AccordionItem>
                    </Accordion>
                    
                {:else if tabSet === 1}
                    <Accordion>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/chicken.png" alt="chicken representing the lunch entrees" height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">entrees + regular non-speciality food</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList bind:data={lunchFoods} categoryMap={lunchCategoriesMap} mealName="entrees" />
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/soup.png" alt="soup representing the soups and chilis and sandwiches" height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">soups + chili + sandwiches</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList bind:data={lunchFoods} categoryMap={lunchCategoriesMap} mealName="soup and sandwiches" />
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/salad.png" alt="salad bowl to represent salad bar" height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">salad bar</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList bind:data={lunchFoods} categoryMap={lunchCategoriesMap} mealName="salad bar" />
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/sandwich.png" alt="a sandwich to represent the sandwich/deli section"> </svelte:fragment>
                            <svelte:fragment slot="summary">sandwich/deli</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList bind:data={lunchFoods} categoryMap={lunchCategoriesMap} mealName="sandwiches and deli" />
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/ice-cream.png" alt="ice cream for huds froyo"> </svelte:fragment>
                            <svelte:fragment slot="summary">dessert</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList bind:data={lunchFoods} categoryMap={lunchCategoriesMap} mealName="desserts" />
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
                                <FoodList bind:data={dinnerFoods} categoryMap={dinnerCategoriesMap} mealName="entrees" />
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/soup.png" alt="soup representing the soups and chilis AND pasta" height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">soups + pasta</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList bind:data={dinnerFoods} categoryMap={dinnerCategoriesMap} mealName="soups and pasta" />
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/salad.png" alt="salad bowl to represent salad bar" height="32px" width="32px"></svelte:fragment>
                            <svelte:fragment slot="summary">salad bar</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList bind:data={dinnerFoods} categoryMap={dinnerCategoriesMap} mealName="salad bar" />
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/burger.png" alt="a burger to represent the grill section"> </svelte:fragment>
                            <svelte:fragment slot="summary">grill</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList bind:data={dinnerFoods} categoryMap={dinnerCategoriesMap} mealName="grill" />
                            </svelte:fragment>
                        </AccordionItem>
                        <hr>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/ice-cream.png" alt="ice cream for huds froyo"> </svelte:fragment>
                            <svelte:fragment slot="summary">dessert</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList bind:data={dinnerFoods} categoryMap={dinnerCategoriesMap} mealName="desserts" />
                            </svelte:fragment>
                        </AccordionItem>
                        <!-- ... -->
                    </Accordion>
                {:else if tabSet === 3}
                    <Accordion>
                        <AccordionItem>
                            <svelte:fragment slot="lead"><img src="icons/crab.png" alt="ice cream for huds froyo"> </svelte:fragment>
                            <svelte:fragment slot="summary">brain break</svelte:fragment>
                            <svelte:fragment slot="content">
                                <FoodList bind:data={dinnerFoods} categoryMap={{"brain break": "Brain Break"}} mealName="brain break" />
                            </svelte:fragment>
                        </AccordionItem>
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
