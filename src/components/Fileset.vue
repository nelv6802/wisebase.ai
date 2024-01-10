<script setup lang="ts">
import axios from 'axios'

const documents = ref<{name: string;url: string}[]>([])

const uploadedPdf = ref<File | null>(null)


const pdfFileInput = ref<HTMLInputElement>()

const loading = ref(false)
const loadingFiles = ref(false)
const uploadError = ref<string | null>(null)

async function onFileUpload(e: Event) {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (files && files.length > 0) {
        uploadedPdf.value = files.item(0)
        await uploadFile(uploadedPdf.value as File)
    } else {
        uploadedPdf.value = null
    }
}

async function uploadFile(file: File) {
    loading.value = true
    uploadError.value = null
    try {
        const formData = new FormData()
        formData.append('file', file)
        await axios.post('http://localhost:3000/upload-document', formData)
        loading.value = false
        uploadedPdf.value = null
        documents.value = await loadFiles()
    } catch (error) {
        console.log(error)
        uploadError.value = (error as Error).message
    } finally {
        loading.value = false
    }
}



async function loadFiles() {
    loadingFiles.value = true
    try {
        const response = await axios.get<string[]>("http://localhost:3000/uploaded-documents")
        const fileLinks = response.data.map(link => {
            return {
                name: link.replace("https://veracitycompetition.blob.core.windows.net/veracity/uploads/", "").replace("https://veracitycompetition.blob.core.windows.net/veracity/uploads%5C", ""),
                url: link
            }
        })
        return fileLinks
    } catch (error) {
        console.log(error)
        return []
    } finally {
        loadingFiles.value = false
    }
}


onMounted(async () => {
    documents.value = await loadFiles()
})


</script>

<template>
    <div id="fileset" class="w-full p-4">
        <h2 class="text-3xl font-bold">Your files</h2>
        <div class="w-full mt-4 file-gallery relative">
            <div v-if="loadingFiles" class="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" v-if="loading">
                    <path fill="currentColor"
                        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate"
                            values="0 12 12;360 12 12" />
                    </path>
                </svg>
                <p>Loading fies</p>
            </div>
            <UploadedFile v-for="d, index in documents" :document="{ text: d.name, id: index, url: d.url }" :key="index" />
        </div>
        <div class="flex items-center gap-4">
            <button @click="pdfFileInput?.click"
                class="flex items-center gap-4 py-4 px-8 rounded-[0.5rem] bg-[var(--brand-transparent-color)] text-[var(--brand-color)] hover:bg-[var(--brand-color)] hover:text-[#fff]">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" v-if="loading">
                    <path fill="currentColor"
                        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate"
                            values="0 12 12;360 12 12" />
                    </path>
                </svg>
                Upload new file
                <input @change="onFileUpload" type="file" accept="application/pdf" id="pdf-input" name="pdf-input"
                    ref="pdfFileInput" class="hidden">
            </button>
            <p v-if="uploadedPdf">
                {{
                    uploadedPdf.name }}
            </p>
            <p v-if="uploadError">
                {{
                    uploadError }}</p>
        </div>
    </div>
</template>


<style scoped lang="scss">
.file-gallery {
    margin-block: 1rem;
    display: grid;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
</style>