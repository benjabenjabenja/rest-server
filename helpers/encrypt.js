const bcrypt = require('bcryptjs');

/**
 * Takes a password as input and returns the encrypted version of the
 * password using bcrypt.
 * @param [password] - The `password` parameter is the plain text password that you want to encrypt.
 * @returns The encrypted password is being returned.
 */
const encrypt_pass = (password = '') => {
    const salt = bcrypt.genSaltSync();
    const encrypted_password = bcrypt.hashSync(password, salt);
    return encrypted_password;
};
/**
 * Compares a plain text password with an encrypted password using bcrypt.
 * @param [password] - The password parameter is the plain text password that you want to compare with
 * the encrypted password.
 * @param [encrypted_pass] - The `encrypted_pass` parameter is the encrypted version of the password.
 * It is typically stored in a database or some other form of persistent storage.
 */
const compare_pass = (password = '', encrypted_pass = '') => bcrypt.compareSync(password, encrypted_pass);

module.exports = {
    encrypt_pass,
    compare_pass
}