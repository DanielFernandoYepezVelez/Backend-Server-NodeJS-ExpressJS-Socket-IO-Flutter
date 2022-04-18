/* 
    /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

/* Custom Middlewares */
const { validateFields } = require('../middlewares/validate_fields_middleware');
const { validateJwt } = require('../middlewares/validate_jwt_middleware');

/* Controllers */
const { createUser, loginUser, renewToken } = require('../controllers/auth_controller');

const router = Router();

router.post('/new', [
    check('name', 'El Nombre Es Obligatorio').not().isEmpty(),
    check('email', 'El Correo Electronico Es Obligatorio').isEmail(),
    check('password', 'La Contraseña Es Obligatorio').not().isEmpty(),
    validateFields,
], createUser);

router.post('/', [
    check('name', 'El Nombre Es Obligatorio').not().isEmpty(),
    check('email', 'El Correo Electronico Es Obligatorio').isEmail(),
    // validateFields,
], loginUser);

router.get('/renew', validateJwt, renewToken);

module.exports = router;