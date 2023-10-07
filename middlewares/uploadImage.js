const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, `${__dirname}/../public/images`)
//     },
//     filename: (req, file, callback) => {
//         const fileExtension = file.originalname.split(".").pop();
//         callback(null, req.body.name + "." + fileExtension);
//     },
// })
// const upload = multer({ storage });

const multerFiltering = (req, file, cb) => {
    if(
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
    ) {
        cb(null, true);
    } else {
        return cb("Hanya format image saja (jpg, png, jpeg)")
    }
}

const upload = multer({
    fileFilter: multerFiltering
})

module.exports = upload