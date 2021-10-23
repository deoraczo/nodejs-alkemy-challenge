const NotFoundException = require("../../../shared/exceptions/NotFoundException");

class CharacterNotFoundException extends NotFoundException {
    constructor(message) {
        super(message);
    }
}

module.exports = CharacterNotFoundException;