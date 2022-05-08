/* 
    /api/users
*/

const { Router } = require('express');

/* Custom Middlewares */
const { validateJwt } = require('../middlewares/validate_jwt_middleware');

/* Controllers */
const { getUsers } = require('../controllers/users_controller');

const router = Router();

router.get('/', validateJwt, getUsers);

module.exports = router;