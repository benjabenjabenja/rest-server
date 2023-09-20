const { response } = require('express');
const { log } = require('../helpers/log');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = process.env;
const user_model = require('../models/user');

/**
 * Validate a JSON Web Token (JWT) in the `x-token` header of a
 * request, and if valid, allows the request to proceed to the next middleware or route handler.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as headers, body, and query parameters. It is typically provided by the web
 * framework or server handling the request.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `response` object from the Express framework.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used to move to the next middleware function
 * or to the route handler after the current middleware function has completed its task.
 * @returns a middleware function that takes in three parameters: `req`, `res`, and `next`.
 */
const validate_jwt = async (req , res = response, next) => {
    const { 'x-token': auth } = req.headers;
    if (!!!auth) return res.status(400).json({
        message: '[ERROR] - Invalid <header>',
        error: 'header <x-token> undefined'
    });
    // validate true jwt
    try {
        const { _uid } = jwt.verify(auth, JWTSECRET);
        const user_loged = await user_model.findById({ _id: _uid });
        if (!!user_loged) req.user = user_loged;
        req.uid = _uid;
        next();
    } catch (error) {
        log(error);
        res.status(401).json({
            message: '[ERROR] - Invalid token',
            error: 'Invalid <token>'
        });
    }
}

module.exports = {
    validate_jwt
}