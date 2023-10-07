const express = require("express")
const router = express.Router();
const adminController = require("../controllers/adminController")
const upload = require("../middlewares/uploadImage")

// Route handle page
router
    .route("/dashboard")
    .get(adminController.carsPage)

router
    .route("/create")
    .get(adminController.createPage)

router
    .route("/edit/:id")
    .get(adminController.editPage)

module.exports = router