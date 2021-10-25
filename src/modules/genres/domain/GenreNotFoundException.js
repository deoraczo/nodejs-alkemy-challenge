const NotFoundException = require("../../../shared/exceptions/NotFoundException");

class GenreNotFoundException extends NotFoundException {
    constructor(message) {
        super(message);
    }
}

module.exports = GenreNotFoundException;