const { response } = require('express');
const user_model = require('../models/user');
const { log } = require('../helpers/log');
const ADMIN_ROLE = 'ADMIN_ROLE';

/**
 * Checks if the role provided in the request body is an admin role
 * and returns an error if it is not.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, and request URL. It is used
 * to access and manipulate the data sent by the client.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `response` object from the Express framework.
 * @param next - The `next` parameter is a function that is called to pass control to the next
 * middleware function in the request-response cycle. It is typically used to move to the next
 * middleware function after the current middleware function has completed its task.
 * @returns If the role does not include the ADMIN_ROLE, a response with status code 400 and a JSON
 * object containing an error message and the error details will be returned. Otherwise, the next
 * middleware function will be called.
 */
const validate_admin_role = (req, res = response, next) => {
    try {
        const { role = '' } = req.body;

        if (!!!role.includes(ADMIN_ROLE)) {
            return res.status(400).json({
                message: '[ERROR] - Inavlid <role> name',
                error: 'invalid <role> only admin'
            });
        }
        next();

    } catch (error) {
        log(error);
        res.status(500).json({
            message: '[ERROR]- Internal Server Error',
            error
        });
    }
}
/**
 * Middleware function that checks if a user's role matches any of the specified roles.
 * @param roles - The `roles` parameter is a rest parameter that allows you to pass multiple role
 * values as arguments to the `validate_role_is` function. These role values represent the roles that
 * are allowed to access a certain route or perform a certain action.
 * @returns The function `validate_role_is` is returning an asynchronous function that takes in three
 * parameters: `req`, `res`, and `next`.
 */
const validate_role_is = (...roles) => {
    return async function (req, res = response, next) {
        try {
            const { _uid } = req.body;
            const user_db = user_model.findById({ id: _uid });
            if (!!!user_db) return res.status(404).json({
                message: '[ERROR] - User not found',
                error: 'invalid user <id>'
            });
            const { role } = user_db;
            if (!!!roles.includes(role)) return res.json({
                message: '[ERROR] - Invalid user <role>',
                error: 'invalid <role>'
            });
            next();
        } catch (error) {
            log(error);
            res.status(500).json({
                message: '[ERROR]- Internal Server Error',
                error
            });
        }
    }
}

module.exports = {
    validate_admin_role,
    validate_role_is
}