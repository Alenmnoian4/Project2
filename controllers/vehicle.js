const express = require('express') // bring this in so we can make our router
const vehicle = require('../models/vehicles')


/////
// Create Router  variable to attach routes
/////

const router = express.Router() // router will have all routes attached to it


//////////////////////////////////////////////
//////// Actual Routes
///////////////////////////////////////////////


router.use((req,res, next) => {
    console.log(req.session)
    if(req.session.loggedIn){
        next();
    }else {
        res.redirect('/user/login')
    }
})

router.get('/', (req, res) => {
    console.log(req.session)
    // Get all vehicles from mongo and send them back
    // vehicle.find({})
    vehicle.find({})
    .then((vehicles) => {
        // res.json(vehicles)
        res.render('vehicles/index.ejs', { vehicles, user: req.session.username })
    })
    .catch(err => console.log(err))

})

router.get('/new', (req, res) => {
    res.render('vehicles/new.ejs')
})

router.post('/', (req, res) => {
   //this is the current req.body 
// {
//     name: 'pear',
//     color: 'peach',
//     readyToEat: 'on'
// }

    req.body.inStock = req.body.inStock === 'on' ? true : false
     //this is the  req.body after this line
    // {
//     name: 'pear',
//     color: 'peach',
//     readyToEat: true
// }

    
    req.body.username = req.session.username;
    //this is the  req.body after this line
        // {
//     name: 'pear',
//     color: 'peach',
//     readyToEat: true,
//     username: <req.session.username> 'user1'
// }


    vehicle.create(req.body, (err, createdVehicle) =>{
        console.log('created' , createdVehicle, err)
        res.redirect('/vehicles')
    })
} )

router.get('/:id/edit', (req, res) => {

    const id = req.params.id
    // Find the fruit and send it to the edit.ejs  to prepopulate the form
    vehicle.findById(id, (err, readyVehicle) => {
        // res.json(foundFruit)
        res.render('vehicles/edit.ejs', { vehicle: readyVehicle })
    })
})

router.put('/:id', (req, res) => {
    
    req.body.InStock = req.body.InStock === 'on' ? true : false

    vehicle.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedVehicle) => {
        console.log(updatedVehicle)

        res.redirect(`/vehicles/${req.params.id}`)
        
    })
})

router.get('/:id', (req, res)=>{

    // Go and get fruit from the database
    vehicle.findById(req.params.id)
    .then((vehicle)=> {
        res.render('vehicles/show.ejs', {vehicle})
    })
})

router.delete('/:id', async (req, res) => {

    // Method 1
    // Fruit.findByIdAndDelete(req.params.id, (err, deletedFruit) => {
    //     console.log(err, deletedFruit)
    //     res.redirect('/fruits')
    // })

    // // Method 2
    // Fruit.findByIdAndDelete(req.params.id)
    // .then((deletedFruit) => {
    //     console.log(err, deletedFruit)
    //     res.redirect('/fruits')
    // })
    // .catch(err => console.log(err))


    // Method 3 async await

    const deletedVehicle = await vehicle.findByIdAndDelete(req.params.id)

    if(deletedVehicle){
        res.redirect('/vehicles/')
    }
})

/////////////
///// export this router to use in other files
//////////////
module.exports = router
