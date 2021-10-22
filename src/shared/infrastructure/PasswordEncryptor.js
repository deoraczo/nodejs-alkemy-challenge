const bcrypt = require('bcryptjs');

class PasswordEncryptor {
    static encrypt(plainPassword) {
        return bcrypt.hashSync(plainPassword, 8);
    }

    static compare(plainPassword, encryptedPassword) {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    }
}

module.exports = PasswordEncryptor;