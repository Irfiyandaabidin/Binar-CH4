const Car = require('../models/carModel');

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

const createCar = async (req, res) => {
    try {
        const {
            name,
            price,
            category,
        } = req.body
        const path = `images/${req.file.filename}`
        const request = {
            name,
            price,
            category,
            image: path
        }
        await Car.create(request)
        req.flash("message", "Ditambahkan")
        res.redirect("/dashboard")
    } catch (err) {
        console.log(err)
        res.status(400).json({
          status: "failed",
          message: err.message,
        })
      }
}

const editCar = async (req, res) => {
    try {
        const id = req.params.id
        const {
            name,
            category,
            price
        } = req.body
        if(req.file == undefined) {
            const car = await Car.findById(id)
            const path = car.image
            console.log(req.body)
            const data = {
                name,
                category,
                price,
                image : path,
                updateAt : new Date()
            }
            await Car.findByIdAndUpdate(id, data, {
                new: true
            })
            req.flash("message", "Diupdate")
            return res.redirect("/dashboard")
        }
        const path = `images/${req.file.filename}`
        const data = {
            name,
            category,
            price,
            image : path,
            updatedAt : new Date()
        }
        await Car.findByIdAndUpdate(id, data, {
            new: true
        })
        req.flash("message", "Diupdate")
        res.redirect("/dashboard")
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message,
        })        
    }
}

const deleteCar = async(req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id)
        req.flash("message", "Dihapus")
        res.redirect("/dashboard")
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
    editPage,
    createCar,
    editCar,
    deleteCar
}