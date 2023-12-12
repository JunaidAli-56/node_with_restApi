const express = require("express")
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/register");
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
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {
            const userData = new Register({
                firstName: req.body.fname,
                lastName: req.body.lname,
                phone: req.body.phone,
                age: req.body.age,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
                gender: req.body.gender,
            })

            const registered = await userData.save();
            res.status(201).render("index");
        } else {
            res.status(400).send("password did'nt match")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})
app.get("/login", (req, res) => {
    res.render("login")
})


app.listen(port, () => {
    console.log(`Server on port no:${port}`)
})