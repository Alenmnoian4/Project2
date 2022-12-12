//////////////////////////////////////////////
//////// Database Connections
///////////////////////////////////////////////
require("dotenv").config()  // Load env variables
const mongoose = require('mongoose') // gives us that db connection and cool methods for CRUD to the datas

const MONGO = process.env.MONGO
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//Establish our connections
mongoose.connect(MONGO, CONFIG)

// Log connections events from mongoose
mongoose.connection
    .on("open", ()=> console.log('Mongoose connected'))
    .on("close", ()=> console.log('Disconnected from Mongoose'))
    .on("error", (error)=> console.log('Mongoose error', error))

// export mongoose with connection to use in other files
module.exports = mongoose