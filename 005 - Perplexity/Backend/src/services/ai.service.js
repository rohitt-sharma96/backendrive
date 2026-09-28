import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import MessageParser from "nodemailer/lib/dkim/message-parser.js";

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-3.6-flash",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-tiny",
    apiKey: process.env.MISTRAL_API_KEY,
})


export const generateResponse = async (messages) => {

    console.log("111", messages)
    const response = await geminiModel.invoke(messages.map(msg =>{
        if(msg.role == "user"){
            return new HumanMessage(msg.content)
        }
        else if(msg.role == "ai"){
            return new AIMessage(msg.content)
        }
    }))

    return response.text;
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