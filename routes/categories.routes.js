const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields, validate_jwt } = require('../middlewares');
const { get_categories, get_category_by_id, post_category } = require('../controller/categories.controller');

const categories_router = new Router();

categories_router.get('/get', [
    validate_jwt,
    validate_fields,
], get_categories);

categories_router.get('/get/:id', [
    validate_jwt,
    validate_fields,
], get_category_by_id);

categories_router.get('/post', [
    validate_jwt,
    validate_fields,
], post_category);

module.exports = categories_router