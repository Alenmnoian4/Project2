require("dotenv").config()  // Load env variables
const express = require('express') // bring in express to make our app
const morgan = require('morgan') // nice logger for our request
const methodOverride = require('method-override') // allows us to override post request from our ejs/forms
const Mongoose = require('mongoose');
const { default: mongoose } = require("mongoose");


const app = express()

mongoose.connect(process.env.MONGO)


//////////////////////////////////////////////
//////// Middlewares
///////////////////////////////////////////////

app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false,
  }))

// app.get('/', homeRoutes)
// app.get('/store', storeRoutes)
// app.get('/user', userRoutes)
app.use('/fruits', FruitRouter)
app.use("/user", UserRouter)

app.get("/", (req, res) => {
    res.render("index.ejs")
  });

app.listen(PORT, ()=> console.log(`Who let the dogs out on port: ${PORT}`))