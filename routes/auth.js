const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controller/auth.controller');

const auth_router = new Router();

auth_router.post('/login', [
    check('username', 'Invalid e-mail').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'must have at least 4 characters').isLength({ min: 8 }),
], login);

module.exports = auth_router;