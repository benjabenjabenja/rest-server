const { Router } = require('express');
const { check } = require('express-validator');
const { login, google_sing_in } = require('../controller/auth.controller');
const { validate_fields } = require('../middlewares/email_validator');

const auth_router = new Router();

auth_router.post('/login', [
    check('username', 'Invalid e-mail').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'must have at least 4 characters').isLength({ min: 8 }),
    validate_fields
], login);

auth_router.post('/login/google', [
    check('id_google', 'ID google is required').not().isEmpty(),
    validate_fields
], google_sing_in);

module.exports = auth_router;