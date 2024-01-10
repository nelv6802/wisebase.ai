<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const { isInChatMode } = useChatMode()
</script>

<template>
  <LogoBar />

  <transition name="chatbox" mode="out-in">
    <section class="flex justify-center p-4 flex-col items-center gap-8" v-if="isInChatMode">
      <!-- <ReferencedDocuments /> -->
      <ChatBox />
    </section>
    <section v-else class="flex justify-center p-4 flex-col items-center gap-8">
      <SearchBar />
      <SuggestionsBox />
      <!-- <ReferencedDocuments /> -->
    </section>
  </transition>
</template>

<style scoped lang="scss">
.chatbox-enter-from,
.chatbot-leave-to {
  opacity: 0;
  transform: translateY(2rem);
}

.chatbox-enter-to,
.chatbot-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.chatbox-enter-active,
.chatboax-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>