const { response, request } = require('express');
const { log } = require('../helpers/log');
const { generate_jwt } = require('../helpers/jeisonguebtoken');
const { compare_pass } = require('../helpers/encrypt');
const user_model = require('../models/user');
const { google_verify } = require('../helpers/google-verify');

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