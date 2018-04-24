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
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({
    secret: "This is an app for practicing user authentication",
    resave: false,
    saveUninitialized: false 
}));
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES ================================================
app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/secret", function(req, res){
    res.render("secret.ejs");
});

// Authentication Routes ----
// Registration
app.get("/register", function(req, res){
    res.render("register.ejs");
});

app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        })
    });
});

// Login
app.get("/login", function(req, res){
    res.render("login.ejs");
});

app.post("/login",passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
});

// =======================================================
app.listen(3000, function(){
    console.log("Server has started on port 3000!");
});
