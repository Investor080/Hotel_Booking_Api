require("dotenv").config();
const mongoose = require("mongoose")
const connectionString = process.env.Connection_String


const connectDb = async () =>{
    await mongoose.connect(connectionString)
     return console.log("DB is connected")
}

module.exports = connectDb