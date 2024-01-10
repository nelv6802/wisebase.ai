<script setup lang="ts">
import axios from 'axios';

defineOptions({
  name: "SuggestionsBox"
})

const {addQuery, setChatMode} = useChatMode()

const suggestions = ref([
  {
    id: 1,
    text: "What is the revenue this year",
  },
  {
    id: 2,
    text: "What is the revenue this year",
  },
  {
    id: 3,
    text: "What is the revenue this year",
  }
  , {
    id: 4,
    text: "What is the revenue this year",
  }
].sort((a, b) => a.text.length - b.text.length))


async function loadSuggestions() {
  try {
    const response = await axios.get<string[]>("http://localhost:3000/suggested-searches")
    console.log(response.data)
    const results = response.data.map((s, i) => {
      return {
        id: i,
        text: s
      }
    }).sort((a, b) => a.text.length - b.text.length)
    suggestions.value = results
  } catch (error) {
    console.log(error)
  }
}


function onClickOnSuggestion(text: string) {
  addQuery(text)
  setChatMode(true)
}


onMounted(async () => {
  await loadSuggestions()
})

</script>

<template>
  <div class="flex w-[100%] lg:w-[50%] flex-col justify-center items-center">
    <h2 class="text-[14px] text-[var(--text-light)]">Or you can start off with these suggesstions</h2>
    <div class="suggestions-box__gallery">
      <Suggestion @click="onClickOnSuggestion(suggestion.text)"  v-for="suggestion in suggestions" :key="suggestion.id" :suggestion="suggestion" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.suggestions-box {
  &__gallery {
    margin-block: 1rem;
    display: grid;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    gap: 1rem;
  }
}
</style>
