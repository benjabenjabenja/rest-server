const { response, request } = require('express');
const { log } = require('../helpers/log');
const user_model = require('../models/user');

/**
 * Sends a JSON response with a success message
 * and an empty data object.
 * @param [req] - The `req` parameter represents the HTTP request object, which contains information
 * about the incoming request such as the request headers, request parameters, request body, etc.
 * @param [res] - The `res` parameter is the response object that is used to send a response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * `json()` which is used to send a JSON response.
 */
const get_user = (req = request, res = response) => {
    res.json({
        message: "GET - USER SUCCESS",
        data: {}
    });
}
/**
 * Logs the request body and sends a JSON response with a success message.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request made to the server. It includes details such as the request headers,
 * request body, request method, URL, and more.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `response` object in the Express framework.
 */
const post_user = async (req = request, res = response) => {
    const { user } = req.body;
    const new_user = new user_model();
    console.log(new_user);
    res.status(201).json({
        message: "POST - USER SUCCESS",
        data: {...element}
    });
}
const put_user = (req = request, res = response) => {
    res.json({
        message: 'PUT - USER SUCCESS',
        data: {}
    });
}

const delete_user = (req = request, res = response) => {
    res.json({
        message: 'DELETE - USER SUCCESS',
        data: {}
    });
}
const patch_user = (req = reques, res = response) => {
    res.json({
        message: 'PATCH - USER SUCCESS',
        data: {}
    });
}

module.exports = {
    get_user,
    put_user,
    post_user,
    delete_user,
    patch_user
}