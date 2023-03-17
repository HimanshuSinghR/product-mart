const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWt = require('passport-jwt').ExtractJwt;

const config = require('../config/config');
const controller = require('../controllers/user.Controller');

const localLogin = new LocalStrategy(
    {
        usernameField:"email"
    },
    async (email,password,done) =>{
        const user = userController.getUserByEmailIdAndPassword(email,password);
        return user
        ?done(null,user):done(null,false,{
            error: 'Your login details are not correct. Please try again'
        })
    }
)
const JwtLogin = new JwtStrategy(
    {
        jwtFromRequest: ExtractJWt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecretKey
    },
    async (payload,done) =>{
        const user = await userController.getUserById(payload._id);

        return user ? done(null, user): done(null,false,{
            error: "Your login details are not valid,Please try again"
        })
    }

)

module.exports = passport.use(localLogin).use(JwtLogin);