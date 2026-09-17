import { ChatOpenAI } from "@langchain/openai";



const model = new ChatOpenAI({
  model: "gpt-5.5",
  apiKey: process.env.GPT_API_KEY
});



export const gptAi = async ()=>{

    console.log('🔥 gptAi')

    try{
    const response = await model.invoke('What is the capital of INDIA ?')
    console.log(response.text)

    }
    catch(err){
        console.log('No Response',err)
    }
}