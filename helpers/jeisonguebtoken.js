const jwt = require("jsonwebtoken");
const { log } = require('../helpers/log');
const { JWTSECRET } = process.env; 
const TOKEN_TIME = 10000;

/**
 * Generates a JSON Web Token (JWT) using a given payload and returns a
 * promise that resolves to an object containing the token.
 * @param [payload] - The payload parameter is the data that you want to include in the JSON Web Token
 * (JWT). It can be any valid JSON object that you want to encode and include in the token.
 * @returns The function `generate_jwt` returns a Promise that resolves to an object with a `token`
 * property.
 */
const generate_jwt = (payload = '') => {
    if (!!!payload) return new Error('<payload> required');
    return new Promise((resolve, reject) => {
        const cb = (err, t) => {
            if (err) {
                log(err);
                reject('[ERROR] - Can t generate token');
            } else resolve({ token: t });
        }
        jwt.sign({ __uid: payload }, JWTSECRET, { expiresIn: TOKEN_TIME}, cb);
    });
}

module.exports = {
    generate_jwt
}