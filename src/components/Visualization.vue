<script setup lang="ts">
import axios from 'axios';
defineOptions({
    name: "Visualization"
})


async function loadVisualization() {
    try {
        const response = await axios.get("http://localhost:3000/knowledge-graph")
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}
onMounted(async () => {
    await loadVisualization()
})

</script>

<template>
    <div id="visualisation" class="w-full h-[400px] p-4">
        <h2 class="text-3xl font-bold">Graph at a glance</h2>
        <div class="h-[300px] w-full mt-4"></div>
    </div>
</template>