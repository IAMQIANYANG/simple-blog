var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express();
    
// app configure     
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

// config database
mongoose.connect("mongodb://localhost/simple_blog");
var blogSchema = new mongoose.Schema({
    title: String,
    img: String,
    body: String,
    created: {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "test blog", 
//     img: "https://media1.britannica.com/eb-media/80/150980-004-EE46999B.jpg",
//     body: "this is the test blog"
// })

// configure routes

app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("error:" + err);
        } else {
            res.render("index", {blogs:blogs});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Simple blog server has started!");
})