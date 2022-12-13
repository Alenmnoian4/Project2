const mongoose = require("./connection")
const {Schema, model} = mongoose

const vehiclesSchema = new Schema({
    company: String,
    model: String,
    color: String,
    horsepower: String,
    cost: String,
    inStock: Boolean,
    username: String
})

const Vehicle = model("Vehicle", vehiclesSchema)

module.exports = Vehicle