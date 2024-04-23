//get: /posts- display all posts [done]
//get: /posts/new- creating form to get new posts [done]
//post: /posts- create a new post [done]
//get: /posts/:id- get a single post [done]
//patch: /posts/:id- update a post [done]
//delete: /posts/:id- delete a post [done]

const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const { v4: uuid } = require("uuid");

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("styles"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let database = [
    {
        id: uuid(),
        username: "Raj",
        description: "The beautiul BMW m5",
        img: "https://imgd.aeplcdn.com/664x374/n/cw/ec/50723/m5-facelift-exterior-right-front-three-quarter.jpeg?q=80"
    },
    {
        id: uuid(),
        username: "Joe",
        description: "Spotted an airbus A380 today!",
        img: "https://i0.wp.com/aviationforaviators.com/wp-content/uploads/2023/07/a6-apc-etihad-airways-airbus-a380-861_PlanespottersNet_896870_693c68ec1a_o.jpg?fit=1200%2C663&ssl=1"
    },
    {
        id: uuid(),
        username: "Walter",
        description: "Saw this cool train today!",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj-XKdN3K6K2wrGMGueb1s8_xoN0tazlUzaw&usqp=CAU"
    },
    {
        id: uuid(),
        username: "Kartik",
        description: "Saw a cool car today!",
        img: "https://cdn.whichcar.com.au/assets/w_4096/d07e10af/2024-ferrari-sf90-xx-hero.jpg"
    }
]

//listing all posts
app.get("/posts", (req, res) => {
    res.render("posts/index", { database });
});

//creating a form to input new posts
app.get("/posts/new", (req, res) => {
    res.render("posts/new");
});

//creating a new post
app.post("/posts", (req, res) => {
    const { username, description, imgSrc } = req.body;
    database.push({ username, description, img: imgSrc, id: uuid() });
    res.redirect("/posts");
});

//get a post
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = database.find(p => p.id === id);

    res.render("posts/show", { post });
});

//getting post to be updated
app.get("/posts/:id/edit", (req, res) => {
    const { id } = req.params;
    const post = database.find(p => p.id === id);

    res.render("posts/edit", { post });
});

//updating a post
app.patch("/posts/:id", (req, res) => {
    const { id } = req.params;
    const findPost = database.find(p => p.id === id);
    const newDesc = req.body.description;
    const newImg = req.body.img;

    findPost.description = newDesc;
    findPost.img = newImg;

    res.redirect("/posts");
});

//deleting a post
app.delete("/posts/:id", (req, res) => {
    const { id } = req.params;

    database = database.filter(p => p.id !== id);

    res.redirect("/posts");
});

app.listen(3000, () => {
    console.log("Listening on Port 3000");
});