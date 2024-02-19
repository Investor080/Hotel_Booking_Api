const mongoose = require("mongoose")
const {Schema, model} = mongoose
const hotelSchema  = new Schema ({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    distance: {
        type: [Array],
    },
    photos: {
        type: String,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    rooms: {
        type: [Array],
        
    },
    cheapestPrice: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
},  {timestamps: true}

);

const Hotel = model("hotel", hotelSchema)

module.exports = Hotel