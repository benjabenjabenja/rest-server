const categories_model = require('../models/categories');

const validate_category = async (req, res, next) => {
    const { name, tag } = req.body;
    const category = categories_model.findOne({ name: name.toUpperCase(), tag });
    if (!!category) {
        return res.status(400).json({
            message: "[ERROR] - CATEGORY ALREADY EXIST",
            error: "category <tag> | <name> already exist"
        });
    }
    next();
}

module.exports = {
    validate_category
}