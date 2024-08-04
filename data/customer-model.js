const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    activeStatus: {
        type: Boolean
    }
})

mongoose.model("Customer", customerSchema, "customers");