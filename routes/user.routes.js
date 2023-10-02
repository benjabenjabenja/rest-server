const { Router } = require('express');
const { check } = require('express-validator');
const {
    get_users,
    put_user,
    post_user,
    delete_user,
    patch_user
} = require('../controller/user.controller');
const {
    validate_rol,
    validate_user_id
} = require('../helpers/db-validators');
const { 
    validate_fields,
    verify_email_exist,
    validate_jwt,
    validate_admin_role
} = require('../middlewares/index');

const ROLES = ['ADMIN_ROLE', 'USER_ROLE'];
const user_router = new Router();

// get
user_router.get('/get', validate_jwt, get_users);
// post
user_router.post('/post', [
    validate_jwt,
    check('username', 'username is required').not().isEmpty(),
    check('password', 'password is required').not().isEmpty(),
    check('password', 'must have at least 4 characters').isLength({ min: 4 }),
    check('email', 'Invalid e-mail').isEmail(),
    check('role', 'invalid role').isIn(ROLES),
    check('rol').custom(validate_rol),
    verify_email_exist,
    validate_fields
], post_user);
// put
user_router.put('/put/:id', [
    validate_jwt,
    validate_admin_role,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(validate_user_id),
    check('rol').custom(validate_rol),
    check('email', 'Invalid e-mail').isEmail(),
    validate_fields
], put_user);
// patch
user_router.patch('/patch', [
    validate_jwt,
    validate_admin_role
], patch_user);
// delete
user_router.delete('/delete/:id', [
    validate_jwt,
    validate_admin_role,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(validate_user_id)
], delete_user);


module.exports = user_router;