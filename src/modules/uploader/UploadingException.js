const BadException = require("../../shared/exceptions/BadException");

class UploadingException extends BadException {
    constructor(message) {
        super(message);
    }
}

module.exports = UploadingException;