const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("home.ejs");
});

// =======================================================
app.listen(3000, function(){
    console.log("Server has started on port 3000!");
});