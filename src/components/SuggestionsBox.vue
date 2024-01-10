<script setup lang="ts">
defineOptions({
  name: "SuggestionsBox"
})

const suggestions = [
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
].sort((a, b) => a.text.length - b.text.length)

</script>

<template>
  <div class="flex w-[100%] lg:w-[50%] flex-col justify-center items-center">
    <h2 class="text-[14px] text-[var(--text-light)]">Or you can start off with these suggesstions</h2>
    <div class="suggestions-box__gallery">
      <Suggestion v-for="suggestion in suggestions" :key="suggestion.id" :suggestion="suggestion" />
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
