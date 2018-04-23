const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost/auth_app");

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