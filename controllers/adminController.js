const Car = require('../models/carModel');
const momentTime = require("moment-timezone")

const carsPage = async(req, res) => {
    try {
        const { name } = req.query
        const condition = {}
        if(name)
            condition.name = {
                $regex: ".*" + name.toLowerCase() + ".*",
            }
        const cars = await Car.find().where(
            condition
        )
        res.render("index.ejs", {
            cars,
            momentTime,
            message: req.flash("message", "")
        })
    } catch(err) {
        res.status(400).json({
            status: "failed",
            message: err.message,
        })
    }
}

const createPage = async(req, res) => {
    try {
        res.render("create.ejs")
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}

const editPage = async(req, res) => {
    try {
        const car = await Car.findById(
            req.params.id
        )
        res.render("edit.ejs", {
            car
        })
    } catch (err) {
        res.status(400).json({
          status: "failed",
          message: err.message,
        })
    }
}

module.exports = {
    carsPage,
    createPage,
    editPage
}