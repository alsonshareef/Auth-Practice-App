const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

// MODELS
const User = require("./models/user");

// CONFIG ================================================
mongoose.connect("mongodb://localhost/auth_app");
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret: "This is an app for practicing user authentication",
    resave: false,
    saveUninitialized: false 
}));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES ================================================
app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/secret", function(req, res){
    res.render("secret.ejs");
});

// =======================================================
app.listen(3000, function(){
    console.log("Server has started on port 3000!");
});
