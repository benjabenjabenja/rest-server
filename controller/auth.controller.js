const { response, request } = require('express');
const { log } = require('../helpers/log');
const { generate_jwt } = require('../helpers/jeisonguebtoken');
const { compare_pass } = require('../helpers/encrypt');
const user_model = require('../models/user');
const { google_verify } = require('../helpers/google-verify');

/**
 * Handles user login by verifying the username or email, checking
 * the user's status, verifying the password, and generating a token if successful.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request such as headers, body, and query parameters.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `response` object from the Express framework.
 * @returns a JSON response with a message and a token if the login is successful. If there is an
 * error, it returns a JSON response with an error message.
 */
const login = async (req = request, res = response) => {
    try {
        const { username = '', password = '' } = req.body;
        const user_db = await user_model.findOne({ email: username }) || await user_model.findOne({ username });
        
        // verify user <email> or <username> exist
        if (!!!user_db) {
            return res.status(400).json({
                message: '[ERROR] - Invalid <username> / <password> ',
                error: 'invalid <username>'
            });
        }
        // vevrify user <status> --> active
        if (!!!user_db.active) {
            return res.status(400).json({
                message: '[ERROR] - Invalid <status>',
                error: 'user <status> inactive'
            });
        }
        // verify password correct
        if (!!!compare_pass(password, user_db.password)) {
            return res.status(400).json({
                message: '[ERROR] - Invalid <username> / <password> ',
                error: 'invalid <password>'
            });
        }
        // generate token
        const { token } = await generate_jwt(user_db.id);

        res.json({
            message: '[SUCCESS] - LOGIN SUCCESS',
            token
        });
            
    } catch (error) {
        log(error);
        res.status(500).json({
            message: '[ERROR] - POST LOGIN ERROR',
            error
        });
    }
}

/**
 * Handles the sign-in process using Google authentication.
 * @param [req] - The `req` parameter represents the request object, which contains information about
 * the incoming HTTP request. It includes details such as the request headers, request body, request
 * method, and request URL.
 * @param [res] - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the `response` object from the Express framework.
 * @returns a JSON response with a success message, a token, and the user_db object.
 */
const google_sing_in = async (req = request, res = response) => {

    try {
        const { id_google } = req.body;

        const { username, email, image } = await google_verify(id_google);

        let user_db = await user_model.findOne({ email, active: true });
        // user no exist
        if (!!!user_db) {
            const to_save = {
                username,
                email,
                password: ':B',
                image,
                google: true,
                role: 'USER_ROLE'
            };
            user_db = new user_model(to_save);
            await user_db.save();
        }
        // user <status> active = false
        if (!!!user_db?.active) {
            return res.status(401).json({
                message: '[ERROR] - USER STATUS FAIL',
                error: 'user <status> || <active> => false'
            })
        }
        // generate token
        const { token } = await generate_jwt(user_db.id);

        res.json({
            message: "[SUCCESS] - GOOGLE SIGN-IN SUCCESS",
            token,
            user_db
        });
    } catch (error) {
        log(error);
        res.status(500).json({
            message: '[ERROR] - GOOGLE SIGN-IN ERROR',
            error
        });
    }

}

module.exports = { 
    login,
    google_sing_in
}