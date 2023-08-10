var express = require('express');
var router = express.Router();
const authController=require('../controller/auth.controller').auth
const authJwt  = require("../middleware/authJWT.middleware").authJWT;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.post('/login', authController.login)
router.get('/profile',authJwt.verifyToken, authController.profile) 


module.exports = router;
