const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama car harus ada"],
    unique: true,
  },
  desciption: {
    type: String
  },
  price: {
    type: Number,
    required: [true, "Harga nya harus ada"],
  },
  updateAt: {
    type: Date
  },
  image: {
    type: String
  },
  category: {
    type: String
  }
})

const Car = mongoose.model("car", carSchema)

module.exports = Car