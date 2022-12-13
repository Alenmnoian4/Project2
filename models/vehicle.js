//////////////////////////////////////////////
//////// Vehicles Model
///////////////////////////////////////////////
const mongoose = require('./connection')

const { Schema, model } = mongoose // destructuring, grabbing model and Schema off mongoose variable
// mongoose.Schema
// mongoose.model


const vehiclesSchema = new  Schema({
    company: String,
    model: String,
    color: String,
    horsepower: String,
    cost: String,
    inStock: Boolean,
    username: String
})

const Vehicle = model('Vehicle', vehiclesSchema)

module.exports = Vehicle
