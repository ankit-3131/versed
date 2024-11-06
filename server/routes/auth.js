const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const User = require('../models/User');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    }, 
async function(accessToken, refreshToken, profile, done) {
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value
    }
    try{
        let user = await User.findOne({googleId:profile.id});
        if(user){
            done(null, user);
        }
        else{
            user = await User.create(newUser);
            done(null, user);
        }
    }
    catch(error){
        console.log(error);
    }
  }
));

// router.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile'] }));
  
// router.get('/auth/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function(req, res) {
//         res.redirect('/dashboard');
//     });


router.get('/auth/google', passport.authenticate('google', {scope: ["profile","email"]}));

router.get("/auth/google/callback", passport.authenticate('google',{failureRedirect: '/login-failure'}), (req,res) => {
    res.redirect("/dashboard");
});

router.get('/login-failure', (req,res)=>{
    res.send("Login failed!");
})

//saving data
passport.serializeUser((user, done)=> done(null,user.id));
//collecting data
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id); // `findById` returns a promise
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = router;