const express = require('express');
const bcrypt = require('bcrypt');
const userController = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register',asyncHandler(insert),login);
router.post('/login' ,asyncHandler(getUserByEmailIdAndPassword),login);

async function insert(req,res,next) {
    const user = req.body;
    console.log(`registering the user`,user);
    req.user = await userController.insert(user);
    next();

}

async function getUserByEmailIdAndPassword(req,res,next){
    const user = req.body;
    console.log(`searching user for `,user);

    req.user = await userController.getUserByEmailIdAndPassword(user.email,user.password);
    
    next();
}

function login(req,res){
    const user = req.user;
    const token = authController.generateToken(user);

    if( user == null){
        return 500;
    }
    res.json({
            user,
            token
        });
}
module.exports = router;    