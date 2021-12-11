const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const router = express.Router();
const route = require("./routes/router");
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('layout', './layout/layout')
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json())
app.use(express.urlencoded({extended :true}))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

router.use((req, res, next) => {
    next();
});

app.use("/", route);
