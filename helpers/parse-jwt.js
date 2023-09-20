
const parse_jwt = function(token = '') {
    let url_encrypted = token.split('.')[0];
    b64 = url_encrypted.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(b64));
}

module.exports = {
    parse_jwt
}