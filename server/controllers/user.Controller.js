const bcrypt = require('bcrypt');
const User = require('../models/user.model')
users = [];

async function insert(user){
    // make a mongo db call to save user in db
    console.log("saving user to db",user);
     user.hashedPassword = bcrypt.hashSync( user.password,10);
     delete user.password;
     return await new User(user).save();
}
async function getUserByEmailIdAndPassword(email,password) {
    let user = await User.findOne({ email });
    console.log(user,"hello mumbai")
    console.log("checking");
    console.log(user,"checking the errors in the login");
    if(!user){
        console.log("checking");
        return null;
    }
    if( isUserValid(user, password,user.hashedPassword)){
        console.log("checking");
      user = user.toObject() ;
      delete user.hashedPassword ;
      return user;

    }else {
        console.log("checking");
        return null;
    }
}

function isUserValid( user,password,hashedPassword) {
    return user && bcrypt.compareSync( password, hashedPassword);
}
module.exports = 
{
    insert ,
    getUserByEmailIdAndPassword
};