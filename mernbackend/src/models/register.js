const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// define Schema

const registerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    confirmpassword: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
})

// generating token
registerSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this._id)
        const mytoken = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
        // console.log(`token from schema:${token}`)
        this.tokens = this.tokens.concat({ token: mytoken })
        await this.save();
        return mytoken;
    } catch (error) {
        res.send("there is an error in generate token")
        console.log(error)
    }
}

registerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // const hashPassword = await bcrypt.hash(password, 10)

        // console.log(`your password: ${this.password}`)
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.password, 10);
        // console.log(`your password after hash: ${this.password}`)

        // it will not store the confirm password filed in database;
        // this.confirmpassword = undefined;
    }
    next();
})


// define model /

const Register = new mongoose.model("Register", registerSchema);

module.exports = Register;