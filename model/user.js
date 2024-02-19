const mongoose = require("mongoose")
const {Schema, model} = mongoose
const userSchema  = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    phone_Number: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},  {timestamps: true}

);

const User = model("user", userSchema)

module.exports = User