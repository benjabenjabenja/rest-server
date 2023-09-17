const { Router } = require('express');
const {
    get_user,
    put_user,
    post_user,
    delete_user,
    patch_user
} = require('../controller/user.controller');
const user_router = new Router();

// get
user_router.get('/get', get_user);
// put
user_router.put('/put/:id', put_user);
// post
user_router.post('/post', post_user);
// delete
user_router.delete('/delete', delete_user);
// patch
user_router.patch('/patch', patch_user);

module.exports = user_router;