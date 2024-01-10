<script setup lang="ts">
import LucideSearchIcon from '~icons/lucide/search'
defineOptions({
  name: 'SearchBar',
})

const keys = useMagicKeys()
const ctrlK = keys['Ctrl+Shift+F']

const queryInputEl = ref<HTMLInputElement | null>(null);
const queryVal = ref('')

watch(ctrlK, (v) => {
  if (v) {
    queryInputEl.value?.focus()
  }
})


const { setChatMode, addQuery, getResults } = useChatMode()

async function onSearchSubmit() {
  const queryValue = queryInputEl.value?.value
  if (queryValue) {
    setChatMode(true)
    addQuery(queryVal.value)
    await getResults(queryVal.value)
  }
}

watch(queryVal, (newVal) => {
})


</script>

<template>
  <form class="relative w-[100%] lg:w-[50%] flex justify-center " @submit.prevent="onSearchSubmit">
    <input id="query" type="text" ref="queryInputEl" name="query" v-model="queryVal"
      class="h-[4rem] w-[100%] rounded-full bg-[var(--light-color)] text-[1.5rem] px-[7.5rem]">
    <LucideSearchIcon class="absolute top-1/2 left-[3rem] -translate-y-[50%] scale-[1.5] text-[var(--brand-color)] " />
    <label for="query"
      class="absolute left-[50%] top-[50%] text-[1.5rem] -translate-x-[50%] -translate-y-[50%] text-nowrap">What would you
      like to know today?</label>
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