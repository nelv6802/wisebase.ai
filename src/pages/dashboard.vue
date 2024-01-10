<script setup lang="ts">
defineOptions({
    name: 'DashboardPage',
})
</script>

<template>
    <LogoBar />
    <section class=" mx-[2rem] flex flex-col gap-6 min-h-[calc(100vh-90px)]">
        <Fileset />
        <Visualization />
    </section>
</template>

<style scoped lang="scss"></style>
