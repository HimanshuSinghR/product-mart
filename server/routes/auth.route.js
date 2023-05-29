const express = require('express');
const bcrypt = require('bcrypt');
const userController = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');
const authController = require('../controllers/auth.controller');
const passport = require('../middleware/passport');
const router = express.Router();

router.post('/register',asyncHandler(insert),login);
router.post('/login' ,passport.authenticate('local',{session:"true"}),login);
router.get('/findme',passport.authenticate('jwt',{session:"true"}),login);
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

async function login(req,res){
    // throw new Error('Server Error while login');
    const user = await req.user;
    const token = authController.generateToken(user);
    console.log("User checking using login",user);
    // if( user == null){
    //     return 500;
    // }
    res.json({
            user,
            token
        });
}
module.exports = router;    