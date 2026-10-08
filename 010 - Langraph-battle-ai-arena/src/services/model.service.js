import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";

import config from '../config/config.js'

const geminiModel = new ChatGoogle({
    model:"gemini-3.1-flash-lite",
    apiKey: config.GEMINI_API_KEY, 
});



const mistralModel = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: config.MISTRAL_API_KEY
})

const cohereModel = new ChatCohere({
    model:"command-a-03-2025",
    apiKey: config.COHERE_API_KEY,
})
// model:"command-r-08-2024",
// model: "mistral-3b-latest",