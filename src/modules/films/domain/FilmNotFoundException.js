const NotFoundException = require("../../../shared/exceptions/NotFoundException");

class FilmNotFoundException extends NotFoundException {
    constructor(message) {
        super(message);
    }
}

module.exports = FilmNotFoundException;