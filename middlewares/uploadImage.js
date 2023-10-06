const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${__dirname}/../public/images`)
    },
    filename: (req, file, callback) => {
        const fileExtension = file.originalname.split(".").pop();
        callback(null, req.body.name + "." + fileExtension);
    },
})

const upload = multer({ storage });

module.exports = upload