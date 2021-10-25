const S3Uplaoder = require("./s3/S3Uploader");
const UploadingException = require("./UploadingException");

class FileUploader {
    constructor() {
        this.uploader = new S3Uplaoder();
    }


    async upload(file) {
        return await this.uploader.upload(file);
    }
}

module.exports = new FileUploader();