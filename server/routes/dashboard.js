const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const {isLoggedIn} = require('../middleware/checkAuth')

router.get('/dashboard',isLoggedIn, dashboardController.dashboard);
router.get('/dashboard/item/:id',isLoggedIn, dashboardController.dashboardViewNote);
router.put('/dashboard/item/:id',isLoggedIn, dashboardController.dashboardUpdateNote);
router.delete('/dashboard/item-delete/:id',isLoggedIn, dashboardController.dashboardDeleteNote);

module.exports = router;