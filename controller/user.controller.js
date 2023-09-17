const { response, request } = require('express');
const { log } = require('../helpers/log');
const user_model = require('../models/user');
const bcrypt = require('bcryptjs');

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
    const { username, password, email, role, image = null, google = false } = req.body.user;    
    try {
        let new_user = new user_model({
            username,
            password,
            email,
            role,
            image,
            google
        });
        // verify email exist

        // encrypyt password
        const salt = bcrypt.genSaltSync();
        const { password: encrypted_password } = new_user;
        new_user.password = bcrypt.hashSync(encrypted_password, salt);
        log(new_user.password);
        // save db
        await new_user.save();

        res.status(201).json({
            message: "POST - USER SUCCESS",
            data: {
                username,
                email,
                role,
                image,
                google
            }
        });
    } catch (e) { 
        log(e);
        res.status(500).json({
            message: 'ERROR - error crearting user',
            data: {}
        });
    }

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