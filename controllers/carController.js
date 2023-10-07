const imagekit = require('../lib/imagekit');
const Car = require('../models/carModel');

const createCar = async (req, res) => {
    try {
        const {
            name,
            price,
            category,
        } = req.body
        const file = req.file
        const nameArray = file.originalname.split(".");
        const extension = nameArray[nameArray.length - 1];

        const img = await imagekit.upload({
            file: file.buffer,
            fileName: `IMG-${Date.now()}.${extension}`
        })

        const request = {
            name,
            price,
            category,
            image: img.url
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
        const file = req.file
        if(file == undefined) {
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

        const nameArray = file.originalname.split(".");
        const extension = nameArray[nameArray.length - 1];
        const img = await imagekit.upload({
            file: file.buffer,
            fileName: `IMG-${Date.now()}.${extension}`
        })
        const data = {
            name,
            category,
            price,
            image : img.url,
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
    createCar,
    editCar,
    deleteCar
}