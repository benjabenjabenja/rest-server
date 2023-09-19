const Role = require("../models/role");

const validate_rol = async (role = '') => {
    const if_exist = await Role.findOne({ role });
    if (!if_exist) {
        throw new Error(`${role} is not register`);
    }
}

module.exports = {
    validate_rol 
}