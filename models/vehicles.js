//////////////////////////////////////////////
//////// Fruits Model
///////////////////////////////////////////////
const mongoose = require('./connection')

const { Schema, model } = mongoose // destructuring, grabbing model and Schema off mongoose variable
// mongoose.Schema
// mongoose.model


const vehiclesSchema = new  Schema({
    name: String,
    color: String,
    readyToEat: Boolean,
    username: String,
})

const vehicle = model('vehicle', vehiclesSchema)

module.exports = vehicle
