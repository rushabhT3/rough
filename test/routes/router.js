const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controller');

router.get('/', controllers.home);
router.post('/about', controllers.about);
router.post('/users/createUser', controllers.createUser);
router.get('/getUsers', controllers.getUsers);
router.delete('/deleteUser/:id', controllers.deleteUser);

module.exports = router;
