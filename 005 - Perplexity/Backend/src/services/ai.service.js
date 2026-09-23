import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.7-flash",
    apiKey: process.env.GEMINI_API_KEY
});



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




/*
// export async function testAi() {
//     model.invoke('What is the capital of INDIA ?')
//         .then((response) => {
//             console.log(response.text)
//         })
//         .catch((err) => {
//             console.log('No Response', err);
//         })
// }



// export const testAI =  () =>{
//     model.invoke("What is the capital of INDIA ?")
//     .then((response)=>{
//         console.log(response.text)
//     })
//     .catch((err)=>{
//         console.log("something went wrong AI",err)
//     })
// }
*/