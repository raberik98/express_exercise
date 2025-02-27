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
    import path from 'path';
    import { fileURLToPath } from 'url';
    // To be able to 
    import fs from "fs/promises"
    import express from "express"
```