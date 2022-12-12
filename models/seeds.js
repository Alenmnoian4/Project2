require('dotenv').config()
const mongoose = require('./connection')
const vehicle = require('./vehicle')


mongoose.connection.on('open', () => {

    // define data we want to put in the database
    const startingVehicles =  [
        { company: "Bugatti", model: "Chiro Super Sport" ,color: "orange", horsepower: "1,577", cost: "$3,825,000"  , inStock: true },
        { company: "Lamborghini", model: "Aventador" ,color: "purple", horsepower: "769" , cost: "$546,847", inStock: true },
        { company: "Ferrari", model: "SF90 Stradale" ,color: "orange", horsepower: "1,000", cost: "$625,000" , inStock: true },
        { company: "Porsche", model: "911 GT3 RS" ,color: "red", horsepower: "518", cost: "$314,000" , inStock: true },
        { company: "Bentley", model: "Bentayga" ,color: "brown", horsepower: "456", cost: "$226,000" , inStock: true },
        { company: "Koenigsegg", model: "Agera RS" ,color: "red", horsepower: "1,160" ,cost: "$3,000,000" , inStock: true },
      ]
      
      // Delete all vehicles
      vehicle.deleteMany({}, (err, data) => {
        vehicle.create(startingVehicles, (err, data) => {
            console.log(data)
            mongoose.connection.close()
        })
    })
})
