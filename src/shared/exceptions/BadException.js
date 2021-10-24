class BadException extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = BadException;