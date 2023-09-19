const { validationResult } = require('express-validator');
const user_model = require('../models/user');

/**
 * Checks if there are any validation errors and returns an error
 * response if there are any.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the request headers, request body, and request parameters. It is typically
 * provided by the Express.js framework.
 * @param res - The `res` parameter is the response object in Express.js. It is used to send a response
 * back to the client.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used to move to the next middleware function
 * after the current middleware function has completed its task.
 * @returns If the `error` is not empty, the function will return a response with a status code of 400
 * and a JSON object containing a message, an empty data object, and the error. If the `error` is
 * empty, the function will call the `next()` function to proceed to the next middleware or route
 * handler.
 */
const validate_fields = (req, res, next) => {
    const error = validationResult(req);
    if (!!error.isEmpty()) {
        return res.status(400).json({
            message: 'ERROR',
            data: {},
            error
        });
    }
    next();
}
/**
 * Checks if an email already exists in the user_model and returns an
 * error message if it does.
 * @param req - The req parameter is the request object that contains information about the HTTP
 * request being made, such as the headers, body, and query parameters.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to manipulate the response, such as
 * setting the status code, sending JSON data, or redirecting the client to a different URL.
 * @param next - The `next` parameter is a callback function that is used to pass control to the next
 * middleware function in the request-response cycle. It is typically used to move to the next
 * middleware function after the current middleware function has completed its task.
 * @returns If the email already exists in the user_model, a response with status code 400 and a JSON
 * object containing a message and an empty data object will be returned.
 */
const verify_email_exist = async (req, res, next) => {
    const { email } = req.body;
    const mail_exist = await user_model.findOne({ email });
    if (!!mail_exist) {
        return res.status(400).json({
            message: 'This e-mail already exist!',
            data: {}
        });
    }
    next();
}

module.exports = { 
    validate_fields,
    verify_email_exist
}