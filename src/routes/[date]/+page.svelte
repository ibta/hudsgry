<script>
    // Call fetch api function from server.ts and log the result
    import { each } from "svelte/internal";
    import { TabGroup, Tab, Accordion, AccordionItem } from "@skeletonlabs/skeleton";

    import FoodList from "$lib/components/FoodList.svelte";
    import { counter } from "../../stores.ts";

    /** @type {import('./$types').PageServerLoad} */
    export let data;
    let currentDate = data.date;

    let countedValue;
    counter.subscribe(value => countedValue = value);

    let unique = {};

    let breakfastFoods = data.data.Breakfast;
    let lunchFoods = data.data.Lunch;
    let dinnerFoods = data.data.Dinner;
    // console.log(breakfastFoods)

    let breakfastEntrees = ["Bagel", "Breakfast Meats", "Breakfast Entrees", "Breakfast Bakery", "Starches and Potatoes"].join(" ")
    let breakfastSides = ["Special Bars  Board Menu", "Fresh Fruit", "Salad Bar", "Build Your Own"].join(" ")
    let breakfastCategoriesMap = {"entrees": breakfastEntrees, "yogurt, oatmeal, bagels, fruit": breakfastSides}

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

    let now = new Date();
    $: dateTime = now.toLocaleString('en-us', {
        hour12: false,
        month: 'long',
        weekday: 'long',
        day: 'numeric',
    });


    let nextDay = new Date(now);
    nextDay.setDate(nextDay.getDate() + countedValue);
    nextDay = nextDay.toLocaleString('en-us', {
        hour12: false,
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }).split(",")[0].split("/").join("-")

    let prevDay = new Date(now);
    prevDay.setDate(prevDay.getDate() - countedValue);
    prevDay = prevDay.toLocaleString('en-us', {
        hour12: false,
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    }).split(",")[0].split("/").join("-")

    console.log("NEXT DAY", nextDay)
    console.log("PREV DAY", prevDay)


    // console.log(data);
    // console.log(timeOfDay)
    // console.log(data)
    // console.log(tabSet)
    $: tabSet = 0;

    // A function to Show all of the Accordions by setting the class to "open"
    // function handleShowAll() {
    //     let acc = document.getElementsByClassName("accordion");
    //     let i;
    //     for (i = 0; i < acc.length; i++) {
    //         acc[i].classList.add("open");
    //     }
    // }
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
        {#key unique}
            <h4 class="font-bold text-warning-500">{dateTime.toLowerCase()}</h4>
        {/key}
        <br>
    </div>
    <br>
    <div class="">

<!--        <a href="/{prevDay}" class="lb btn btn-sm bg-primary-500 float-left ml-5 lg:ml-0 mb-4 p-3" data-sveltekit-prefetch="hover">-->
<!--            <svg class="mr-2 arrow-left-move" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512">&lt;!&ndash;! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. &ndash;&gt;-->
<!--                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>-->
<!--            </svg>-->
<!--            Previous Day-->
<!--        </a>-->
<!--        <a href="/{nextDay}" class="rb btn btn-sm bg-primary-500 float-right mr-5 lg:mr-0 mb-4 p-3" data-sveltekit-prefetch="hover">-->
<!--            Next Day-->
<!--            <svg class="ml-2 arrow-right-move" height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">&lt;!&ndash;! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. &ndash;&gt;-->
<!--                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>-->
<!--            </svg>-->
<!--        </a>-->

    </div>

    <!--  CONCEPT: MENU  -->
    <div class="w-full text-token">
        <!--   SUBCONCEPT: TABS     -->
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
                <Tab bind:group={tabSet} name="brainbreak" value={3}><img class="inline-flex" src="icons/crab.png">  BRAINBREAK!!</Tab>
            {/if}
            <!--            <Tab justify="justify-center" name="toggle" on:click={handleShowAll}>Show all</Tab>-->
            <!--            <Tab justify="justify-center" name="toggle">Collapse</Tab>-->

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

</div>
