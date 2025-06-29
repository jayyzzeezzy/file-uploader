const { Router } = require("express");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const db = require('../db/queries');
const controllers = require('../controllers/controllers');

const authRouter = Router();

// configure LocalStrategy
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.findUserByUsername(username);
            console.log(user);
    
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);
// create user session and persist their login credentials 
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.findUserById(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
});

// set up paths for passport authentication
authRouter.post('/log-in', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/'
}));
authRouter.get("/log-out", controllers.getLogOut);
authRouter.get("/sign-up", controllers.getSignUp);
authRouter.post("/sign-up", controllers.postSignUp);

module.exports = authRouter;