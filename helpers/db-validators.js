const Role = require("../models/role");

/**
 * Checks if a given role exists in the database and throws an error if it
 * does not.
 * @param [role] - The `role` parameter is a string that represents the role that needs to be
 * validated.
 */
const validate_rol = async (role = '') => {
    const if_exist = await Role.findOne({ role });
    if (!if_exist) {
        throw new Error(`${role} is not register`);
    }
}
/**
 * Checks if a user with a given ID exists and throws an error if not.
 * @param [id] - The `id` parameter is the user ID that needs to be validated.
 */
const validate_user_id = async (id = '') => {
    const if_exist = await Role.findById({ id });
    if (!!!if_exist) {
        throw new Error(`User ${id} not found`);
    }
}

module.exports = {
    validate_rol,
    validate_user_id
}