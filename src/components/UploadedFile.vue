<script setup lang="ts">
import LucideFileTextIcon from '~icons/lucide/file-pie-chart'
defineOptions({
    name: 'UploadedFile',
})

const props = defineProps<{
    document: {
        id: number,
        text: string,
        url: string
    }
}>()
</script>

<template>
    <a :download="props.document.url" :href="props.document.url" target="_blank"
        class="transition cursor-pointer text-[var(--text-light)] hover:text-[var(--text-dark)] flex items-center justify-center p-2 border-[2px] border-[var(--text-light)] hover:border-[var(--text-dark)] gap-4  rounded-[0.5rem]">
        <LucideFileTextIcon class="scale-[1.2] text-[var(--brand-color)]" />
        <p>
            {{ props.document.text }}
        </p>
    </a>
</template>
