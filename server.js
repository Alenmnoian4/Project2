// Import
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const vehicleRouter = require("./controllers/vehicle");

// Creating application object
const app = express();

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO)
mongoose.connection

.on('open', () => console.log("Connected to Mongo"))
.on('close', () => console.log("Disconnected from Mongo"))
.on('error', () => console.log(error))

// Middleware
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use("/static", express.static("public"))
app.use("/Vehicle", vehicleRouter)

// Routes

app.get("/", (req, res) => {
    res.render('<h1>Server is Working/h1>')
})

// App listener
const PORT = process.env.PORT || 3000
app.listen(PORT, (request, response) => {
    console.log(`Listening on port: ${PORT}`)
})

