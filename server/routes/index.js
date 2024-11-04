//controller se data lekar routes define krrha hai

const express = require('express');
const app = express();
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.homepage);
router.get('/about', mainController.about);

module.exports = router;