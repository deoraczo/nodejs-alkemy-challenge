const jwt = require('jsonwebtoken');
const { authConfig } = require('../../apps/api/config');
class JwtProvider {
    static generate(payload) {
        return jwt.sign(payload, authConfig.JWT_SECRET, {
            expiresIn: authConfig.JWT_EXPIRES_IN
        })
    }
}

module.exports = JwtProvider;