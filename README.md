# Guide to get started with Express

Press Ctrl + Shift + V to view the markdown file

## Step 1: Innitialize the project

- Create your entry point (likely `index.js` or `server.js`)

- `npm init -y` to create a node project by generating a `package.json` file

- `npm i express` and `npm i nodemon --save-dev` to install our **dependencies**

- Edit the `package.json` by adding the `"type": "module",` key value pairs and specifiy a costume script by modifying the **scripts** section like this: 
```json  
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
},
```

## Step 2: Creating the express server

- We are going to need some imports:
```js
    // To be able to dynamically get the absolute path to your current directory 
    import path from 'path';
    import { fileURLToPath } from 'url';
    // FS stands for file system, we are going to need it for reading from files and writing to files
    // We need the constructor for an express server instance
    import fs from "fs/promises"
    import express from "express"
```

- We are going to need to create our server instance and our absolute path stored in a variable

```js
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const app = express()
```

- The server needs to listen to a provided port, for now 8080, 3000, 3001 etc. can all be good options
- Typically this snippet goes to the bottom of the `index.js` file.
```js
    app.listen(8080, () => {
        console.log("Server listens on port: 8080");
    })
```

## Let's start to create endpoints that will server static **HTML** pages and our other static files
```js
    // Assuming that you have a public folder with all the static files in it (css files, images etc.)
    app.use("/static", express.static(`${__dirname}/public`))

    // Create an endpoint like this that will serve a static HTML page to the client
    app.get("/", (req,res) => {
        //Send back a file as a response
        res.sendFile(`${__dirname}/frontend/home.html`)
    })
```

## Create an API endpoint that will serve a JSON response to the client
```js
    //Notice that the path is different from the previously created endpoints, it's prefixed with a "/api" signally that this is an API endpoint and "/v1" which is the API versioning, if you had 2 versions of the same endpoint then you would name the second "/v2"
    app.get("/api/v1/coffee", async (req,res) => {
        const data = JSON.parse(await fs.readFile(`${__dirname}/db/coffee.json`))
        const query = req.query
        
        if (query["search"] == '' || query["search"] == undefined) {
            return res.json(data)
        }
        
        const returnData = data.map((nextData) => {
            return nextData[query["search"]]
        })
        //Send back a JSON response
        res.json(returnData)

    })
```

## Be able to receive data from your users (clients)
- Add this snippet to the top of your `index.js` file, for your server to parse the **body** of requests where the `Content-Type` is `application/json`
```js
    app.use(express.json())
```


