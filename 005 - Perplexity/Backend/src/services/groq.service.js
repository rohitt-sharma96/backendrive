import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
    model: "openai/gpt-oss-120b",
    apiKey: process.env.GROQ_API_KEY,
    temperature: 0
});



const aiDemo = async () => {

    try {
        const response = await model.invoke("What is the capital of INDIA ?")
        console.log(response.content)
    }
    catch (err) {
        console.log('No Response', err)
    }
}

export default aiDemo;