const BadException = require("./BadException");

class AssociationException extends BadException {
    constructor(message) {
        super(message);
    }
}

module.exports = AssociationException;