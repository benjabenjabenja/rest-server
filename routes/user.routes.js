const { Router } = require('express');
const { check } = require('express-validator');
const {
    get_users,
    put_user,
    post_user,
    delete_user,
    patch_user
} = require('../controller/user.controller');
const ROLES = ['ADMIN_ROLE', 'USER_ROLE'];
const {
    validate_fields,
    verify_email_exist
} = require('../middelwares/email_validator');
const {
    validate_rol,
    validate_user_id
} = require('../helpers/db-validators');
const user_router = new Router();

// get
user_router.get('/get', get_users);
// put
user_router.put('/put/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(validate_user_id),
    check('rol').custom(validate_rol),
    check('email', 'Invalid e-mail').isEmail(),
    validate_fields
],put_user);
// post
user_router.post('/post', [
    check('username', 'username is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'must have at least 4 characters').isLength({ min: 4 }),
    check('email', 'Invalid e-mail').isEmail(),
    check('role', 'invalid role').isIn(ROLES),
    check('rol').custom(validate_rol),
    verify_email_exist,
    validate_fields
],post_user);
// delete
user_router.delete('/delete/:id', [
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(validate_user_id)
], delete_user);
// patch
user_router.patch('/patch', patch_user);

module.exports = user_router;