import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage, tool, createAgent } from "langchain";
import { searchOnInternet } from "./internet.service.js";
import * as z from 'zod'


/* AI ko jo tools provide krte h wo => Tools String/Number return krenge 
    iske alawa kuchh nahi return krenge arr/obj bhi nahi */
const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-3.6-flash",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-tiny",
    apiKey: process.env.MISTRAL_API_KEY,
})

const searchInternetTool = tool(
    searchOnInternet, //function -> pehle fn aata h
    {
        name:"searchOnInternet",
        description:"Use this tool to get the latest information from the internet.",
        schema: z.object({
            query: z.string().describe("The search query to look up on the interne.t")
        })
    }

)

const agent = createAgent({
    model: geminiModel,
    tools: [searchInternetTool]
})

export const generateResponse = async (messages) => {

    const response = await agent.invoke({
        messages: messages.map(msg =>{
        if(msg.role == "user"){
            return new HumanMessage(msg.content)
        }
        else if(msg.role == "ai"){
            return new AIMessage(msg.content)
        }
    })
    })

    return response.messages[response.messages.length - 1].text;
}


export const generateChatTitle = async (message) => {

    const response = await mistralModel.invoke([
        new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive title for chat conversations. 
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-5 words. The title should be clear, relevant, and engaging, giving users a quick understanding of that chat's topic.
            `),

        new HumanMessage(`
                Generate a title for a chat conversation based on the following first message:
                "${message}"
                `)
    ])
    return response.text
}





/*

export async function testAi() {

    console.log("🔥 testAi called");

    try {
        const response = await model.invoke(
            "What is the capital of INDIA?"
        );

        console.log(response.text);
        
    } catch (err) {
        console.log("No Response", err);
    }
}


// export async function testAi() {
//     model.invoke('What is the capital of INDIA ?')
//         .then((response) => {
//             console.log(response.text)
//         })
//         .catch((err) => {
//             console.log('No Response', err);
//         })
// }


*/