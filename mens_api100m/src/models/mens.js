const express = require("express");
const mongoose = require("mongoose");


const mensSchema = new mongoose.Schema({
    ranking: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: Date,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    event: {
        type: String,
        default: "100m"
    },
})

const MenModel = new mongoose.model('MensModel', mensSchema);

module.exports = MenModel;