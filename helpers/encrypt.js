const bcrypt = require('bcryptjs');

module.exports = {
    encrypt_pass: (password = '') => {
        const salt = bcrypt.genSaltSync();
        const encrypted_password = bcrypt.hashSync(password, salt);
        return encrypted_password;
    }
}