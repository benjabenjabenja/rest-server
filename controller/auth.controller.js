const { response, request } = require('express');
const { log } = require('../helpers/log');

const login = async (req = request, res = response) => {
    try {
        const { username = '', password = '' } = req.body;
        if (!username || !password) {
            throw new Error('[ERROR] Username and Password required');
        }
        
        const token = '';
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

module.exports = { 
    login
}