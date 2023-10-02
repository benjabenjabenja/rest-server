const {
    validate_fields,
    verify_email_exist
} = require('../middlewares/email_validator');
const { validate_jwt } = require('../middlewares/jwt.middleware');
const { validate_admin_role } = require('../middlewares/role.middleware');

module.exports = {
    validate_fields,
    verify_email_exist,
    validate_jwt,
    validate_admin_role
}