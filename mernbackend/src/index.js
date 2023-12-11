const express = require("express")
const path = require("path");
const router = require("./routers/mernrouter");
const port = process.env.PORT || 3000;

const app = express();


app.use(express.json)
app.use(router)


app.use(port, () => {
    console.log(`server on port no:${port}`)
})