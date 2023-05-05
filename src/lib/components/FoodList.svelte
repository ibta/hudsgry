<script>
    export let data;
    export let mealName;
    export let categoryMap;


    // Unused function for now, but leaving in case things break
    // function splitString(stringToSplit, separator) {
    //     let arrayOfStrings = stringToSplit.split(separator);
    //
    //     // Create a new string until it is 24 characters long, and if it does not end in a comma,
    //     // keep going until a comma is found, and then add the rest of the string with a new line
    //     // and then add the rest of the string
    //     let newString = "";
    //     let i = 0;
    //     while (newString.length < 24) {
    //         newString += arrayOfStrings[i] + ", ";
    //         i++;
    //     }
    //     if (i === arrayOfStrings.length) {
    //         return [newString.slice(0, -2), "noBreak"];
    //     }
    //     let continuedString = arrayOfStrings.slice(i).join(", ");
    //     console.log(newString);
    //     return [newString, continuedString];
    //
    //
    //
    //
    //
    // }
</script>

<dl class="list-dl container flex-wrap">
    {#each data as item}
        {#if categoryMap[mealName].includes(item.Menu_Category_Name) }
            <li class="pb-2">
<!--                <span class="badge bg-secondary-500">🤯</span>-->
                <span class="flex-auto font-bold">
                    <dt class="inline-flex pb-1">
                        {item.Food_Name}
                        <span class="hidden lg:inline-flex align-middle">
                                {#if item.Vegetarian}
                                    <img class="ml-1 mr-0.5" src="icons/no-meat.png" alt="vegetarian" height="24px"
                                         width="24px">
                                {/if}
                            {#if item.Vegan}
                                    <img class="mr-0.5 ml-0.5" src="icons/vegan.png" alt="vegan" height="24px"
                                         width="24px">
                                {/if}
                            </span>
                        <!-- an attempt to make it so that icons are pushed to the right on mobile -->
                         <span class="inline-flex align-middle ml-auto lg:hidden">
                                {#if item.Vegetarian}
                                    <img class="ml-1 mr-0.5" src="icons/no-meat.png" alt="vegetarian" height="24px"
                                         width="24px">
                                {/if}
                                {#if item.Vegan}
                                    <img class="mr-0.5 ml-0.5" src="icons/vegan.png" alt="vegan" height="24px"
                                         width="24px">
                                {/if}
                         </span>
                    </dt>
                    {#if item.Allergens !== ""}
                        <dd class="text-red-500 text-sm">
                            ⚠️ Contains {item.Allergens.replaceAll(",", "").trim().replaceAll(" ", ", ")}
                        </dd>
                    {/if}
                </span>
            </li>
        {/if}

    {/each}
</dl>