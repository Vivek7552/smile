const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const generalUtilities = require('../utils/general');

const s3Config = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.AWS_S3_BUCKET
});

const fileFilter = (req, file, cb) => {
    let allowedMimes = ['image/jpeg', 'image/png', 'audio/mpeg'];
    if (allowedMimes.indexOf(file.mimetype) !== -1)
        cb(null, true)
    else
        cb(null, false)

}

const getExtension = filename => {
    return filename.split('.')[1];
}

const getFolder = path => {
    switch (path) {
        case '/update-profile-image':
            return 'profile-images';
        case '/upload-file':
            return 'lms';
    }
}

const multerS3Config = multerS3({
    s3: s3Config,
    bucket: process.env.AWS_S3_BUCKET,
    metadata: function (request, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (request, file, cb) {
        const fileName = `${getFolder(request.route.path)}/${generalUtilities.generateRandomString(20)}.${getExtension(file.originalname)}`;
        cb(null, fileName)
        return fileName;
    }
});

const upload = multer({
    storage: multerS3Config,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
})

module.exports = upload;