const AWS = require('aws-sdk');
const path = require('path');
const { fileStorageConfig } = require('../../../apps/api/config');
const { v4: uuidv4 } = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: fileStorageConfig.S3.ACCESS_KEY,
  secretAccessKey: fileStorageConfig.S3.SECRET_KEY,
  apiVersion: '2006-03-01'
});



const generateFilename = (file) => {
  const timestamp = (new Date()).getTime().toString();
  const ext = path.extname(file.originalname);
  const uuid = uuidv4();
  return `${timestamp}.${uuid}${ext}`;
}

class S3Uplaoder {
    async upload(file) {
      const fileName = generateFilename(file);

      const uploadParams = {
            Bucket: fileStorageConfig.S3.BUCKET_NAME, 
            Key: fileName, 
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
      };

        console.log(uploadParams);
        
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