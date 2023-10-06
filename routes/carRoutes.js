const express = require("express")
const router = express.Router();
const carController = require("../controllers/carController")
const upload = require("../middlewares/uploadImage")

// Route handle page
router
    .route("/dashboard")
    .get(carController.carsPage)

router
    .route("/create")
    .get(carController.createPage)

router
    .route("/edit/:id")
    .get(carController.editPage)
    
// Route handle data
router
    .route("/car/add")
    .post(upload.single('image'), carController.createCar)

router
    .route("/car/edit/:id")
    .post(upload.single('image'), carController.editCar)

router
    .route("/car/delete/:id")
    .get(carController.deleteCar)

module.exports = router