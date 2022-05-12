/* 
    /api/messages
*/

const { Router } = require('express');

/* Custom Middlewares */
const { validateJwt } = require('../middlewares/validate_jwt_middleware');

/* Controllers */
const { getMessagesChat } = require('../controllers/messages_controller');

const router = Router();

router.get('/:from', validateJwt, getMessagesChat);

module.exports = router;