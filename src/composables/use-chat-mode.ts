import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const isInChatMode = ref(false)
const queries = ref<{
  answer: string
  documentURLs: string[]
  date: Date
  id: string
  type: 'client' | 'chat'
}[]>([])
const answers = ref<{
  answer: string
  documentURLs: string[]
  date: Date
  id: string
  type: 'client' | 'chat'
}[]>([])
const resultLoading = ref(false)

export function useChatMode() {
  function setChatMode(mode: boolean) {
    isInChatMode.value = mode
  }

  function addQuery(q: string) {
    const newQ = {
      answer: q,
      documentURLs: [],
      date: new Date(),
      id: uuidv4(),
      type: 'client' as 'client' | 'chat',
    }
    queries.value = [...queries.value, newQ]
  }

  async function getResults(q: string) {
    resultLoading.value = true
    try {
      const result = await axios.get<{
        answer: string
        documentURLs: string[]
      }>(`http://localhost:3000/search?q=${q}`)
      const answer = {
        ...result.data,
        answer: result.data.answer.toString(),
        date: new Date(),
        id: uuidv4(),
        type: 'chat' as 'client' | 'chat',
      }

      answers.value = [...answers.value, answer]
      console.log(answers.value)
    }
    catch (error) {
      console.log(error)
    }

    finally {
      resultLoading.value = false
    }
  }

  return { setChatMode, isInChatMode, queries, addQuery, getResults, resultLoading, answers }
}
