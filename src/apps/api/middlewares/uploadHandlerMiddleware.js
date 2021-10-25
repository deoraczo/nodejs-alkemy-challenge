const multer = require('multer');
const MimeTypeExeption = require('../../../modules/uploader/MimeTypeExeption');

const fileFilter = (req, file, cb) => {
    const mimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (mimeTypes.indexOf(file.mimetype) > -1) {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new MimeTypeExeption('Only .png, .jpg and .jpeg format allowed!'));
    }
}

const uploadHanlder = multer({
    fileFilter
});


module.exports = uploadHanlder;