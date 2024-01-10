<script setup lang="ts">
import wiseBaseLogo from '~/images/logo.svg'

defineOptions({
  name: 'LogoBar',
})

const route = useRoute()
const isInDshboard = computed(() => {
  return route.path === "/dashboard"
})

console.log(route.path)

const { isInChatMode } = useChatMode()
</script>

<template>
  <header class="relative lg:h-[160px]" :class="isInChatMode || isInDshboard ? 'in-chat-mode' : ''">
    <img :src="wiseBaseLogo" alt="Wisebase Logo" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <router-link :to="isInDshboard ? '/' : '/dashboard'">
      <button id="link-btn" class="absolute bg-[var(--brand-transparent-color)] text-[var(--brand-color)] hover:bg-[var(--brand-color)] hover:text-[#fff]">
        {{
          isInDshboard ? 'Home' : 'Dashboard' }}
      </button>
    </router-link>
  </header>
</template>


<style lang="scss" scoped>
header {
  &.in-chat-mode {

    height: 90px;

    img {
      left: 2rem;
      transform: translate(0, -50%) scale(0.7);
    }

  }



  img {
    transition: all 0.3s ease-in-out;
  }
}

#link-btn {
  right: 2rem;
  top: 50%;
  transform: translate(0, -50%);
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
}
</style>
