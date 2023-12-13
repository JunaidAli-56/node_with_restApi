const express = require("express")
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
//db
require('./db/conn');
// Schema
const Register = require("./models/register");

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

            const token = await userData.generateAuthToken();
            // console.log(`token from index:${token}`)

            const registered = await userData.save();
            // console.log(`registered from index:${registered}`)
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
// check login validation
app.post("/login", async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        const userData = await Register.findOne({ email: userEmail });

        const matchPassword = await bcrypt.compare(userPassword, userData.password);
        // console.log(matchPassword);

        const token = await userData.generateAuthToken();
        console.log(`token from from ligin post:${token}`)


        if (matchPassword) {
            res.status(201).render("index")
        } else {
            res.status(400).send('invalid infromation')
        }
    } catch (error) {
        res.status(400).send("invalid information")
    }
})


app.listen(port, () => {
    console.log(`Server on port no:${port}`)
})