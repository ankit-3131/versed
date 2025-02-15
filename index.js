require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const methodOverride = require('method-override');
connectDB();

const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(session(
    {
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_LINK
        })
    })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static('public'));
app.use(expressLayouts);


app.set('layout','./layouts/main'); // layout is here in main.ejs
app.set('view engine','ejs');


// ALL THESE SHIFTED TO ROUTES AND THE MAIN CONTROLLER

// app.get('/', (req, res)=>{
//     const locals = {
//         pageTitle: "Versed",
//         description: "Drop your verse we'll catch it"
//     }
//     res.render('index', locals);  //index ko put karr rha inside the layout body and locals ko at respective positions
// });

app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/dashboard'));

app.listen(port, ()=>{
    console.log(`App is running on http://localhost:${port}`);
})