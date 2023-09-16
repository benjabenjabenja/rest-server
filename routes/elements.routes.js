const { Router } = require('express');
const {
    get_elements,
    post_elements,
    put_elements,
    delete_element
} = require('../controller/elements.controller');

const elements_router = new Router();

elements_router.get('/get', get_elements );
elements_router.put('/put', put_elements);
elements_router.post('/post', post_elements);
elements_router.delete('/delete', delete_element);

module.exports = elements_router;