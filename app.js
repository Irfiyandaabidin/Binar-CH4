const express = require('express');
const flash = require("connect-flash");
const session = require("express-session")
const morgan = require("morgan")
const bodyParser = require("body-parser")

const app = express();

const carRouter = require("./routes/carRoutes") 
const adminRouter = require("./routes/adminRoutes") 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(express.static(`${__dirname}/public`))
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")
app.use(
    session({
        secret: "geeksforgeeks",
        saveUninitialized: true,
        resave: true
    })
)
app.use(flash())
app.use("/", adminRouter)
app.use("/car", carRouter)

module.exports = app;