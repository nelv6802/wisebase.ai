<script setup lang="ts">
defineOptions({
  name: 'Suggestion',
})

const props = defineProps<{
  suggestion: {
    id: number
    text: string
  }
}>()
</script>

<template> 
  <div class="transition cursor-pointer text-[var(--text-light)] hover:text-[var(--text-dark)] flex items-center justify-center py-4 px-8 border-[2px] border-[var(--text-light)] hover:border-[var(--text-dark)]  rounded-[0.5rem]">
    <p>
      {{ props.suggestion.text }}
    </p>
  </div>
</template>
