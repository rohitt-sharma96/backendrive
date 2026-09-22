import 'dotenv/config';

import readline from 'readline/promises'

import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from 'langchain';
import { sendEmail } from './mail.service.js';
import * as z from 'zod';


const emailTool = tool(
    sendEmail, //ye string return karega
    {
        name: "emailTool",
        description: "this tool will send email",
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email")
        })
    }
)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
});

const model = new ChatMistralAI({
    model: "mistral-tiny",
    temperature: 0
});



const agent = createAgent({
    model,
    tools: [emailTool]
})


const messages = [];

while (true) {
    const user = await rl.question('YOU :')
    messages.push(new HumanMessage(user))


    const response = await agent.invoke({ messages })

    messages.push(response.messages[response.messages.length - 1]);

    console.log(response);

}
