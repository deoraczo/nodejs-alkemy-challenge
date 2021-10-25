const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'})
const path = require('path');

class S3Uplaoder {
    async upload(file) {
        const uploadParams = {
            Bucket: 'alkemy-challenge-vargas', 
            Key: file.originalname, 
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };
        
        return new Promise((resolve, reject) => {
            s3.upload (uploadParams, function (err, data) {
                if (err) {
                  console.log("Error", err);
                } if (data) {
                  resolve(data.Location);
                }
              });
        })
    }
}

module.exports = S3Uplaoder;