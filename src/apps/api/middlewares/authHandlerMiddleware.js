const UnauthorizedException = require("../../../shared/exceptions/UnauthorizedException");
const JwtProvider = require("../../../shared/infrastructure/JwtProvider");

const authHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new UnauthorizedException('jwt malformed'));
    }

    if (!authHeader.includes('Bearer')) {
        return next(new UnauthorizedException('jwt malformed'));
    }

    const [_, token] = authHeader.split(' ');

    if (!token) {
        return next(new UnauthorizedException('jwt malformed'));
    }

    try {
        const { user } = JwtProvider.decode(token);
        req.currentUser = user;
        next();
    } catch (error) {
        return next(new UnauthorizedException(error.message))
    }
}

module.exports = authHandler;