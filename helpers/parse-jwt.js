
/**
 * Takes a JWT token as input and returns the decoded payload as a JavaScript
 * object.
 * @param [token] - The `token` parameter is a string representing a JSON Web Token (JWT).
 * @returns the parsed JSON object from the decoded base64 string.
 */
const parse_jwt = function(token = '') {
    let url_encrypted = token.split('.')[0];
    b64 = url_encrypted.replace('-', '+').replace('_', '/');
    return JSON.parse(window?.atob(b64));
}

module.exports = {
    parse_jwt
}