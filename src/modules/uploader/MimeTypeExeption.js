const BadException = require("../../shared/exceptions/BadException");

class MimeTypeExeption extends BadException {
    constructor(message) {
        super(message);
    }
}

module.exports = MimeTypeExeption;