import { ChatMistralAI } from "@langchain/mistralai"

const llm = new ChatMistralAI({
    model: "mistral-tiny",
    apiKey: process.env.MISTRAL_API_KEY,
    temperature: 0,
    maxRetries: 2,
    // other params...
})


export async function test() {

    try {

        const aiMsg = await llm.invoke('What is the capital of China ?')

        console.log(aiMsg.text)
    }
    catch (err) {
        console.log('No response', err)
    }
}