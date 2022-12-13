const express = require("express")
const Vehicle = require("../models/vehicle")

const router = express.Router()

router.use((req, res, next) => {
    if(req.session.loggedIn) {
        next()
    } else {
        res.redirect("/user/login")
    }
})

// Index
router.get("/", (req, res) => {
    Vehicle.find({username: req.session.username}, (err, vehicles) => {
        res.render("vehicle/index.ejs", { vehicles })
    })
})

// New
router.get("/new", (req, res) => {
    res.render("vehicle/new.ejs")
})

// Delete
router.delete("/:id", (req, res) => {
    const id = req.params.id
    Vehicle.findByIdAndRemove(id, (err, vehicle) => {
        res.redirect("/vehicle")
    })
})

// Update
router.put("/:id", (req, res) => {
    const id = req.params.id
    req.body.completed = req.body.completed === "on" ? true : false
    Vehicle.findByIdAndUpdate(id, req.body, {new: true}, (err, vehicle) => {
        res.redirect("/vehicle")
    })
})

// Create
router.post("/", (req, res) => {
    req.body.completed = req.body.completed === "on" ? true : false
    req.body.username = req.session.username
    Vehicle.create(req.body, (err, vehicle) => {
        res.redirect("/vehicle")
    })
})

// Edit
router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    Vehicle.findById(id, (err, vehicle) => {
        res.render("vehicle/edit.ejs", {vehicle})
    })
})

// Show
router.get("/:id", (req, res) => {
    const id = req.params.id
    Vehicle.findById(id, (err, vehicle) => {
        res.render("vehicle/show.ejs", {vehicle})
    })
})

module.exports = router