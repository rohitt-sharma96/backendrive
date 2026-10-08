import { tavily } from '@tavily/core'

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY
})

export const searchOnInternet = async ({query}) => {

    const response = await tvly.search(query,{
        maxResults:5,
        searchDepth:'basic'
    });
    console.log(json.stringify(response))
    
    return json.stringify(response);
}
