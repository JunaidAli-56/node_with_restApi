const express = require("express")
const path = require("path");
const hbs = require("hbs");
require('./db/conn');
const port = process.env.PORT || 3000;
const app = express();

const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

app.use(express.static(static_path));

app.set("view engine", "hbs")
app.set("views", template_path);
hbs.registerPartials(partials_path)


app.use(express.json())

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/login", (req, res) => {
    res.render("login")
})


app.listen(port, () => {
    console.log(`Server on port no:${port}`)
})