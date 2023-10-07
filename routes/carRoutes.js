const express = require("express")
const router = express.Router();
const carController = require("../controllers/carController")
const upload = require("../middlewares/uploadImage")

// Route handle data
router
    .route("/add")
    .post(upload.single('image'), carController.createCar)

router
    .route("/edit/:id")
    .post(upload.single('image'), carController.editCar)

router
    .route("/delete/:id")
    .get(carController.deleteCar)

module.exports = router