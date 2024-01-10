<script setup lang="ts">
defineOptions({
    name: "ChatMessage"
})

const props = defineProps<{
    user: "chat" | "client",
    message: string
    links: string[]
}>()

</script>

<template>
    <div class="flex gap-4 items-start" :class="user === 'chat' ? 'from-chat' : 'from-client'">
        <div class="h-[60px] w-[60px] bg-gray-700 rounded-full"></div>
        <div class="rounded-[0.5rem] p-4 w-[80%] bg-gray-200">
            <p>
                {{
                    props.message }}
            </p>
            <h3 class="text-sm font-bold" v-if="props.user === 'chat'">Relevant links</h3>
            <ul class="flex flex-wrap gap-2 p-4">
                <li v-for="link in props.links">
                    <a :href="link" :download="link" target="_blank" class="flex bg-blue-600 p-2 px-4 rounded-full text-white">
                        {{
                            link.replace("https://veracitycompetition.blob.core.windows.net/veracity/uploads/",
                                "").replace("https://veracitycompetition.blob.core.windows.net/veracity/uploads%5C", "") }}
                    </a>
                </li>
            </ul>

        </div>
    </div>
</template>

<style scoped lang="scss">
.from {
    &-chat {}

    &-client {
        flex-direction: row-reverse;
    }
}
</style>

