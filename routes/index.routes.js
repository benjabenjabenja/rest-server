const { Router } = require('express');
const { validate_jwt } = require('../middlewares');

const index_router = new Router();

index_router.get('', validate_jwt);

module.export = index_router;