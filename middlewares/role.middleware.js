const { response } = require('express');
const { log } = require('../helpers/log');
const ADMIN_ROLE = 'ADMIN_ROLE';

const validate_admin_role = (req, res = response, next) => {
    try {
        const { role = '' } = req.body;

        if (!!!role.includes(ADMIN_ROLE)) {
            return res.status(400).json({
                message: '[ERROR] - Inavlid <role> name',
                error: 'invalid <role> only admin'
            });
        }
        next();

    } catch (error) {
        log(error);
        res.status(500).json({
            message: '[ERROR]- Internal Server Error',
            error
        });
    }
}

module.exports = {
    validate_admin_role
}