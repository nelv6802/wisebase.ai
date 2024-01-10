<script setup lang="ts">

const { setChatMode, resultLoading } = useChatMode()

function endSession() {
    setChatMode(false)
}

const {queries, answers} = useChatMode()

const allMessages = computed(() => {
    const combinedMessages = [...queries.value, ...answers.value];

    // Sort the combinedMessages array based on the date property
    return combinedMessages.sort((a, b) => b.date.getTime() - a.date.getTime())
})
</script>

<template>
    <div class=" w-[100%] lg:w-[70%] relative h-[calc(100vh-140px)]">
        <div
            class=" w-full flex gap-12 flex-col-reverse overflow-y-auto absolute top-0 bottom-[80px] left-1/2 -translate-x-1/2 p-4 pb-16 overflow-x-hidden">
            <ChatMessage :user="chat.type" :links="chat.documentURLs" :message="chat.answer" v-for="chat in allMessages" :key="chat.id" />
            <button
                class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] transition p-2 rounded-[0.25rem]"
                @click="endSession" v-if="!resultLoading">
                Stop current session
            </button>
            <p v-if="resultLoading"
                class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] transition p-2 rounded-[0.25rem]">
                Loading Results</p>
        </div>
        <BottomSearchBar class="absolute  bottom-[-1rem] h-[100px] left-1/2 -translate-x-1/2" />

    </div>
</template>

<style lang="scss" scoped></style>