var express = require("express");
var router = express.Router();
var auth = require("../auth")

const { User_admin, User_game, Article } = require("../models");

router.get("/dashboard", auth.isAuthorized, (req, res) => {
    sess = req.session;
    console.log(sess);
    
    Article.findAll().then((article) => {
        res.render("pages/admin/dashboard", { article: article, user : sess });
    });
});

router.post("/add", auth.isAuthorized, (req,res) => {
    return Article.create({
        title : req.body.player,
        body : req.body.score,
    }).then(function (users) {
        if (users) {
            res.redirect("/user_game/dashboard")
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
})

router.get("/edit_user/:id", auth.isAuthorized, (req, res) => {
    sess = req.session;
    Article.findByPk(req.params.id).then((article) => {
        res.render("pages/admin/edit_user", { article: article, user : sess });
    });
});

router.post("/update", auth.isAuthorized, (req,res) => {
    return Article.update({
        title : req.body.player,
        body : req.body.score,
    },{where: {id : req.body.id}}).then(function (users) {
        if (users) {
            res.redirect("/user_game/dashboard")
        } else {
            response.status(400).send('Error in updating a record');
        }
    });
})

router.get("/delete/:id", auth.isAuthorized, (req,res) => {
    return Article.destroy({
        where : {id : req.params.id}
    }).then(function (users) {
        if (users) {
            res.redirect("/user_game/dashboard")
        } else {
            response.status(400).send('Error in deleting a record');
        }
    });
})

module.exports = router;
