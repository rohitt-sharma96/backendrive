import express from 'express'
import graph from './ai/graph.ai.js'

const app = express()


//Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        message: "OK"
    })
})

app.get("/use-graph", async (req, res) => {

    const result = await graph.invoke({problem: "Write the code for factorial in js"})
    console.log(result)

    res.status(200).json({
        message: result
    })
})


export default app;