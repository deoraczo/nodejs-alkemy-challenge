const fileStorageConfig = {
    S3: {
        ACCESS_KEY: process.env.S3_ACCESS_KEY,
        SECRET_KEY: process.env.S3_SECRET_KEY,
        BUCKET_NAME: process.env.S3_BUCKET_NAME
    }
}

module.exports = fileStorageConfig;