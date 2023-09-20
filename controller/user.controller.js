const { response, request } = require('express');
const { log } = require('../helpers/log');
const user_model = require('../models/user');
const bcrypt = require('bcryptjs');
const { encrypt_pass } = require('../helpers/encrypt');


/**
 * Retrieves all users from the database and returns them as a JSON response,
 * along with a success message.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request such as headers, query parameters, and request body.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `response` object from the Express framework.
 */
const get_users = async (req = request, res = response) => {
    try {
        const { limit = 5, offset = 0, active = true } = req.query;
        // Get all users from database
        const filter = !!active ? { active } : null;
        const [total,users] = await Promise.all([
            user_model.countDocuments(filter),
            user_model.find(filter).skip(+offset).limit(+limit)
        ]);

        !!users && res.json({
            message: "GET - USER SUCCESS",
            data: {
                users,
                total,
                limit: +limit,
                offset: +offset
            }
        });
        !!!users && res.json({
            message: "GET - USER SUCCESS",
            data: []
        });
    } catch (e) {
        res.status(400).json({
            message: "GET - USER SUCCESS",
            data: {},
            error: e
        });
    }
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
        
    try {
        const { username, password, email, role, image = '', google = false } = req.body;    
        let new_user = new user_model({
            username,
            password,
            email,
            role,
            image,
            google
        });
        // encrypyt password
        new_user.password = encrypt_pass(password);
        // save db
        await new_user.save();

        return res.status(201).json({
            message: "POST - USER SUCCESS",
            data: new_user
        });
    } catch (e) { 
        log(e);
        res.status(500).json({
            message: 'ERROR - error crearting user',
            data: {},
            error: e
        });
    }

}
/**
 * Handles a PUT request for updating a user and
 * returns a JSON response with a success message and an empty data object.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request made by the client. It includes details such as the request headers,
 * request parameters, request body, etc.
 * @param [res] - The `res` parameter is the response object that is used to send a response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * `json()` which is used to send a JSON response.
 */
const put_user = async (req = request, res = response) => {
    const { id } = req.query;
    const { _id, password, google, email, ...user_param } = req.body;

    // encrypyt password
    if (!!password) {
        user_param.password = encrypt_pass(password);
    }
    try {
        const updated_user = await user_model.findByIdAndUpdate(id, user_param);
        if (!!updated_user) {
            // commit changes
            await updated_user.save();
            res.json({
                message: 'PUT - USER SUCCESS',
                data: updated_user
            });
        }
        // null or undefined
        !!!updated_user && res.status(404).json({
            message: 'PUT - USER ERROR',
            data: {},
            error: `User ${id} not found`
        });

    } catch (e) {
        log(e);
        res.status(500).json({
            message: 'PUT - USER ERROR',
            data: {},
            error: e
        });
    }

}
/**
 * Handles a PATCH request for updating a user
 * and returns a JSON response with a success message and an empty data object.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request such as headers, query parameters, and request body.
 * @param [res] - The `res` parameter is the response object that is used to send a response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * `json()` which is used to send a JSON response.
 */
const patch_user = async (req = reques, res = response) => {
    try {
        const { _uid, ...user } = req.body;
        const user_db = await user_model.findByIdAndUpdate({ id: _uid}, user);
        
        log(user, user_db);
        res.json({
            message: '[SUCCESS] - PATCH USER SUCCESS',
            data: user_db
        });
    } catch (error) {
        log(error);
        res.status(500).json({
            message: '[ERROR] - PATCH USER ERROR',
            error
        });
    }
    
}
/**
 * Handles a DELETE request for deleting a
 * user and returns a JSON response with a success message and an empty data object.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request made by the client. It includes details such as the request method,
 * headers, URL, query parameters, and body.
 * @param [res] - The `res` parameter is the response object that is used to send a response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * `json()` which is used to send a JSON response.
 */
const delete_user = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        // await user_model.deleteOne({ _id: id });
        const deleted_user =  await user_model.findByIdAndUpdate(id, { active: false });
        await deleted_user.save();
        res.json({
            message: 'DELETE - USER SUCCESS',
            data: `User ${id} deleted successfully`
        });
    } catch (e) {
        res.status(500).json({
            message: 'DELETE - USER ERROR',
            data: {},
            error: e
        });
    }
}

module.exports = {
    get_users,
    put_user,
    post_user,
    delete_user,
    patch_user
}