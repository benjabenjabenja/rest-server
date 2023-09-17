const { Router } = require('express');
const {
    get_elements,
    post_elements,
    put_elements,
    delete_element,
    patch_element
} = require('../controller/elements.controller');

const elements_router = new Router();

// get
elements_router.get('/get', get_elements);
// put
elements_router.put('/put', put_elements);
// post
elements_router.post('/post', post_elements);
// delete
elements_router.delete('/delete', delete_element);
// patch
elements_router.patch('/delete', patch_element);

module.exports = elements_router;