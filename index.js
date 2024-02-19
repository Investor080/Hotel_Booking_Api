require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require(`./connectDb/connect`)
const app = express();
Port = process.env.Port || 5700


// Middlewares

app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.listen(Port, ()=> {
    connectDB();
    console.log (`Server started on port ${Port}`)
})