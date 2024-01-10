<script setup lang="ts">
defineOptions({
    name: 'ReferencedDocuments',
})
const referencedDocuments = [
    {
        id: 1,
        text: "File 1.pdf",
    },
    {
        id: 2,
        text: "File 2.pdf",
    },
    {
        id: 3,
        text: "File 3.pdf",
    }
    , {
        id: 4,
        text: "File 4.pdf",
    }
].sort((a, b) => a.text.length - b.text.length)
</script>

<template>
    <div class="referenced-documents flex w-[100%] lg:w-[75%] flex-col justify-center items-center">
        <h2 class="text-[24px] font-[600]">Knowledge Base</h2>
        <div class="referenced-documents__gallery">
            <ReferencedDocument v-for="document in referencedDocuments" :key="document.id" :document="document" />
        </div>
    </div>
</template>


<style scoped lang="scss">
.referenced-documents {
  &__gallery {
    margin-block: 1rem;
    display: grid;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
    gap: 1rem;
  }
}</style>
