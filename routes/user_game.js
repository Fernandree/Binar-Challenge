var express = require("express");
var router = express.Router();
var md5 = require("md5");

const { User_admin, User_game, Article } = require("../models");

router.post("/login_admin", (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(404).json({
            message: "username and password are needed!",
        });
    } else {
        const username = req.body.username;
        const password = req.body.password;
        const admin = {
            where: {
                username,
            },
        };
        User_admin.findOne(admin)
            .then((user) => {
                if (!user) {
                    res.status(404).json({
                        message: "Authentication failed!",
                    });
                } else if (user.password !== md5(password)) {
                    res.status(404).json({
                        message: "Password incorrect!",
                    });
                } else {
                    res.redirect("/");
                }
            })
            .catch(() => {
                res.status(500).json({
                    message: "There was an error!",
                });
            });
    }
});

router.get("/dashboard", (req, res) => {
    Article.findAll().then((article) => {
        res.render("pages/dashboard", { article: article });
    });
});

module.exports = router;
