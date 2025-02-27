import path from 'path';
import { fileURLToPath } from 'url';
import fs from "fs/promises"
import express from "express"

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express()

app.use(express.json())
app.use("/static", express.static(`${__dirname}/public`))

app.get("/", (req,res) => {
    res.sendFile(`${__dirname}/frontend/home.html`)
})

app.get("/store", (req,res) => {
    res.sendFile(`${__dirname}/frontend/store.html`)
})

app.get("/create", (req,res) => {
    res.sendFile(`${__dirname}/frontend/create.html`)
})

app.post("/api/v1/coffee", async (req,res) => {
    const coffee = JSON.parse(await fs.readFile(`${__dirname}/db/coffee.json`))

    coffee.push({
        id: coffee[coffee.length-1].id + 1,
        name: req.body.name,
        origin: req.body.origin,
        caffeine_content_mg: req.body.caffeine_content_mg,
        description: req.body.description,
        serving_size_ml: req.body.serving_size_ml,
    })

    await fs.writeFile(`${__dirname}/db/coffee.json`, JSON.stringify(coffee))

    res.json({message: "Successfully saved a new coffee!"})
})

app.get("/api/v1/coffee", async (req,res) => {
    const data = JSON.parse(await fs.readFile(`${__dirname}/db/coffee.json`))
    const query = req.query
    
    if (query["search"] == '' || query["search"] == undefined) {
        return res.json(data)
    }
    
    const returnData = data.map((nextData) => {
        return nextData[query["search"]]
    })
    res.json(returnData)

})


app.listen(8080, () => {
    console.log("Server listens on port: 8080");
})