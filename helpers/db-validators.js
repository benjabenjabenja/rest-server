const Role = require("../models/role");

const validate_rol = async (role = '') => {
    const if_exist = await Role.findOne({ role });
    if (!if_exist) {
        throw new Error(`${role} is not register`);
    }
}
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