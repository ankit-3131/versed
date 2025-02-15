const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const {isLoggedIn} = require('../middleware/checkAuth');
const path = require('path')

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '.././versed/public/cover-images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + '-' + uniqueSuffix+ '-' + file.originalname)
    }
  })
const upload = multer({ storage: storage });

// const upload = multer({ dest: './public/cover-images/' })

router.get('/dashboard',isLoggedIn, dashboardController.dashboard);
// router.get('/dashboard', dashboardController.dashboard);
// router.get('/dashboard/item/:id', dashboardController.dashboardViewNote);
router.get('/dashboard/item/:id',isLoggedIn, dashboardController.dashboardViewNote);

router.get('/dashboard/add',isLoggedIn, (req,res)=>{

    res.render('dashboard/add-note', {layout: "../views/layouts/dashboard"});
});

router.post('/dashboard/add', isLoggedIn, upload.single('coverImage'), dashboardController.dashboardAddNote);



router.get('/dashboard/search', isLoggedIn, dashboardController.searchNote);

router.put('/dashboard/item/:id',isLoggedIn, dashboardController.dashboardUpdateNote);
router.delete('/dashboard/item-delete/:id',isLoggedIn, dashboardController.dashboardDeleteNote);

module.exports = router;