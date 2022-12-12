/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config() // Load ENV Variables
const mongoose = require("mongoose") // gives us that db connection and cool methods for CRUD to the data

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const MONGO = process.env.MONGO
const CONFIG = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

// Establish Connection
mongoose.connect(MONGO, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
	.on("open", () => console.log("Connected to Mongoose"))
	.on("close", () => console.log("Disconnected from Mongoose"))
	.on("error", (error) => console.log(error))

////////////////////////////////////////////////////
// Export the Connection
////////////////////////////////////////////////////

module.exports = mongoose