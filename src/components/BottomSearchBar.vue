<script setup lang="ts">
import LucideSearchIcon from '~icons/lucide/search'
defineOptions({
    name: 'SearchBar',
})

const keys = useMagicKeys()
const ctrlK = keys['Ctrl+Shift+F']

const queryInputEl = ref<HTMLInputElement | null>(null);
const {  addQuery, getResults } = useChatMode()
const queryVal = ref('')


watch(ctrlK, (v) => {
    if (v) {
        queryInputEl.value?.focus()
    }
})




async function onSearchSubmit() {
    addQuery(queryVal.value)
    const val = queryVal.value
    queryVal.value = ''
    await getResults(val)

}
</script>

<template>
    <form class="w-full flex items-center gap-4" @submit.prevent="onSearchSubmit">
        <div class="w-full flex justify-center ">

            <textarea id="query" type="text" ref="queryInputEl" name="query" v-model="queryVal"
                class="h-[4rem] w-[100%] rounded-[0.5rem] bg-[#e8e8e8] text-[1.5rem] px-[1.5rem]" placeholder="Enter new query" />
        </div>
        <button
            class="transition flex items-center justify-center bg-[var(--brand-color)] hover:bg-[var(--brand-color-darker)] h-[64px] rounded-full aspect-square">
            <LucideSearchIcon class="scale-[1.5] text-[#fff] " />
        </button>
    </form>
</template>


<style lang="scss" scoped>
#query {
    box-shadow: 0.5rem 1rem 2rem rgba($color: #000000, $alpha: 0);
    transition: all 0.2s ease-in-out;

    &:focus {
        box-shadow: 0.5rem 1rem 2rem rgba($color: #000000, $alpha: 0.05);
        outline: none;
        border: none;
    }
}

label {
    transition: all 0.2s ease-in-out;
}


#query:focus~label {
    opacity: 0;
}
</style>