const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const router = express.Router();
const route = require("./routes/router");
const article = require("./routes/article");
const user_game = require("./routes/user_game");
const expressLayouts = require("express-ejs-layouts");
const session = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;

app.use(expressLayouts);
app.set("layout", "./layout/layout");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.use("/", route);
app.use("/articles/", article, express.static(path.join(__dirname, 'public')));
app.use("/user_game/", user_game, express.static(path.join(__dirname, 'public')));

//Error Handling Page Not Found
app.use('*',(req,res, next) => {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.render('pages/error/404', { url: req.url });
      return;
    }
})