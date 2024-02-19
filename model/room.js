const mongoose = require("mongoose")
const {Schema, model} = mongoose
const roomSchema  = new Schema ({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Dates] } }],
}, 

    {timestamps: true}

);

const Room = model("room", roomSchema)

module.exports = Room