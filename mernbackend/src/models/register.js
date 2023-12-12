const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    }
})

registerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // const hashPassword = await bcrypt.hash(password, 10)
        
        // console.log(`your password: ${this.password}`)
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(`your password after hash: ${this.password}`)

        // it will not store the confirm password filed in database;
        this.confirmpassword = undefined;
    }
    next();
})


// define model /

const Register = new mongoose.model("Register", registerSchema);

module.exports = Register;