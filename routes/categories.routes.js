const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields, validate_jwt, validate_admin_role } = require('../middlewares');
const { get_categories, get_category_by_id, post_category, put_category, delete_category } = require('../controller/categories.controller');
const { validate_category } = require('../middlewares/category.middleware');
const { validate_user_id } = require('../helpers/db-validators');

const categories_router = new Router();

// get categories
categories_router.get('/get', [
    validate_jwt,
    validate_fields,
], get_categories);

// get category by id
categories_router.get('/get/:id', [
    validate_jwt,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(validate_user_id),
    validate_fields,
], get_category_by_id);

// post category
categories_router.post('/post', [
    validate_jwt,
    check('name', 'field <name> is required').not().isEmpty(),
    check('tag', 'field <tag> is required').not().isEmpty(),
    validate_category,
    validate_fields,
], post_category);

// put category
categories_router.put('/put/:id', [
    validate_jwt,
    validate_admin_role,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(validate_user_id),
    validate_fields,
], put_category);

// deletes a category
categories_router.delete('/delete/:id',[
    validate_jwt,
    validate_admin_role,
    check('id', 'Invalid id').isMongoId(),
    check('id').custom(validate_user_id),
    validate_fields,
], delete_category);

module.exports = categories_router