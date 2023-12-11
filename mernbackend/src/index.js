const express = require("express")
const path = require("path");
require('./db/conn')
const router = require("./routers/mernrouter");
const port = process.env.PORT || 3000;
const app = express();

const static_path = path.join(__dirname, "../public")
app.use(express.static(static_path));

app.use(express.json())
app.use(router)


app.listen(port, () => {
    console.log(`Server on port no:${port}`)
})