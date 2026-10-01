import fs from 'fs';
import { PDFParse } from 'pdf-parse';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from '@langchain/mistralai'
import "dotenv/config"

import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})
const index = pc.index('demo4-rag')


const dataBuffer = fs.readFileSync('./story.pdf');


const parser = new PDFParse({
    data: dataBuffer
})

const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})

const data = await parser.getText();

const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 0 })

const chunks = await splitter.splitText(data.text)

const docs = await Promise.all(chunks.map(async (chunk) => {
    const embedding = await embeddings.embedQuery(chunk)
    return {
        text: chunk,
        embedding
    }
}))
console.log(docs)

const result = await index.upsert({
    records: docs.map((doc, i) => ({
        id: `doc-${i}`,
        values: doc.embedding,
        metadata: {
            text: doc.text
        }
    }))
})

console.log(result)