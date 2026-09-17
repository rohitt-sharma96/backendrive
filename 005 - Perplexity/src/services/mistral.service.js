import { ChatMistralAI } from "@langchain/mistralai"

const llm = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY,
    temperature: 0,
    maxRetries: 2,
    // other params...
})


export async function test() {

    try {

        const aiMsg = await llm.invoke('What is the capital of China ?')

        console.log(aiMsg.context)
    }
    catch (err) {
        console.log('No response', err)
    }
}