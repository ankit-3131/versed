require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const port = 3000;
const path = require('path');

const app = express();

app.use(session(
    {
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
    }, 
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
)
);

passport.serializeUser((user, done)=> done(null,user));
passport.deserializeUser((user, done)=> done(null,user));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'public','login-page.html'));
});

app.get('/auth/google', passport.authenticate('google', {scope: ["profile","email"]})
);

app.get("/auth/google/callback", passport.authenticate('google',{failureRedirect: '/'}), (req,res) => {
    res.redirect("/main-page");
});

app.get('/main-page',(req,res) =>{
    res.send(`Welcome ${req.user.displayName}`);
});

// app.get('/logout', (req,res)=>{
//     req.logOut();
//     res.redirect('/');
// })
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
