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
        const user = controller.getUserByEmailIdAndPassword(email,password);
        console.log("checking middleware");
        return user ? done(null,user):done(null,false,{
            error: 'Your login details are not correct. Please try again beta'
        })
    }
)
const JwtLogin = new JwtStrategy(
    {
        jwtFromRequest: ExtractJWt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret
    },
    async (payload,done) =>{
        const user = await controller.getUserById(payload._id);

        return user ? done(null, user): done(null,false,{
            error: "Your login details are not valid,Please try again"
        })
    }

)

module.exports = passport.use(localLogin).use(JwtLogin);