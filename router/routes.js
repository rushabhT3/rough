const express = require('express')
const router = express.Router();

const controllers = require('../controllers/easy');

router.get('/', controllers.index)
router.get("/intro", controllers.intro)
// router.post("/outro", controllers.outro)
router.post('/', controllers.create)

module.exports = router;
