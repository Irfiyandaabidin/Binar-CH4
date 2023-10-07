// SDK initialization

var ImageKit = require("imagekit");
const dotenv = require("dotenv");
dotenv.config()

var imagekit = new ImageKit({
    publicKey : process.env.PUBLIC_KEY_IMAGEKIT,
    privateKey : process.env.PRIVATE_KEY_IMAGEKIT,
    urlEndpoint : process.env.URL_ENDPOINT_IMAGEKIT
});

module.exports = imagekit