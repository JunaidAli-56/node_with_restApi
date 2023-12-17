require('dotenv').config()
const express = require("express")
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const cookieParser= require("cookie-parser")
//db
require('./db/conn');
// Schema
const Register = require("./models/register");
// middleware
const auth = require("./middleware/auth");

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
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/secret",auth, (req, res) => {
    console.log(`getting the cookie value: ${req.cookie.jwt}`)
    res.render("secret")
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

            const oneHour = 60 * 60 * 1000;
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + oneHour),
                httpOnly: true
            })
            console.log(cookie);
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

        res.cookie("jwt1", token, {
            expires: new Date(Date.now() + 3000),
            httpOnly: true,
            secure:true
        })

        

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