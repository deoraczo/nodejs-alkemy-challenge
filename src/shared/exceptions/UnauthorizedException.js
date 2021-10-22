class UnauthorizedException extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = UnauthorizedException;