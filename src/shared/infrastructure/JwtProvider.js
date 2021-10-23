const jwt = require('jsonwebtoken');
const { authConfig } = require('../../apps/api/config');
class JwtProvider {
    static generate(payload) {
        return jwt.sign(payload, authConfig.JWT_SECRET, {
            expiresIn: authConfig.JWT_EXPIRES_IN
        })
    }

    static decode(token) {
        return jwt.verify(token, authConfig.JWT_SECRET)
    }
}

module.exports = JwtProvider;