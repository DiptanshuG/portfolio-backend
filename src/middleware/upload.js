const multer = require('multer');
const path = require('path');
const { storage } = require('../config/cloudinary');


// // Set storage engine
// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// Check file type
const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

// Init upload
// const upload = multer({
//     storage,
//     limits: { fileSize: 1000000 }, // 1MB
//     fileFilter: (req, file, cb) => {
//         checkFileType(file, cb);
//     },
// });
const upload = multer({ storage });

module.exports = upload;
