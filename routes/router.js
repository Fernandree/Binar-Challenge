var express = require("express");
var app = express();
var router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/", (req, res) => {
    res.render("pages/index");
});

router.get("/requirements", (req, res) => {
    res.render("pages/requirement");
});

router.get("/features", (req, res) => {
    res.render("pages/features");
});

router.get("/ranks", (req, res) => {
    res.render("pages/ranks");
});

router.get("/aboutus", (req, res) => {
    res.render("pages/aboutus");
});

router.get("/subscribe", (req, res) => {
    res.render("pages/subscribe");
});

router.get("/login", (req, res) => {
    res.render("pages/login");
});

router.get("/register", (req, res) => {
    res.render("pages/register");
});

router.get("/forgetpassword", (req, res) => {
    res.render("pages/forgetpassword");
});

router.get("/rps", (req, res) => {
    res.render("pages/rps");
});

router.get("/valorant", (req, res) => {
    res.render("pages/valorant");
});

router.get("/games", (req, res) => {
    res.render("pages/games");
});

router.post("/register-data", (req, res) => {
    var obj = {
        empty: [],
    };
    fs.readFile("user.json", (err, data) => {
        // READ
        if (err) {
            fs.writeFile("user.json", empty, "utf8", (err, result) => {
                console.log("File Created!");
            });
        }

        if (data.length) {
            let a = JSON.parse(data);
            var arr = [];
            var x = 1;
            a.forEach((element) => {
                arr.push({
                    id: x,
                    email: element.email,
                    password: element.password,
                });
                x++;
            });
            var user = arr;
        } else {
            var user = [];
        }
        user.push({
            id: x,
            email: req.body.email,
            password: req.body.password,
        });
        data = JSON.stringify(user);
        fs.writeFile("user.json", data, "utf8", (err, result) => {
            if (err) {
                res.json({
                    status: 400,
                    message: "Failed to register new user!",
                });
            } else {
                res.json({
                    status: 200,
                    message: "You have registered new user!",
                });
            }
        });
    });
});

router.post("/login-data", (req, res) => {
    fs.readFile("user.txt", "utf-8", (err, data) => {
        if (data.includes(JSON.stringify(req.body))) {
            res.json({
                status: 200,
                message: "Login Success!",
            });
        } else {
            res.json({
                status: 400,
                message: "User not found! Please check your credentials!",
            });
        }
    });
});

router.get("/get-data", (req, res) => {
    fs.readFile("user.json", "utf-8", (err, data) => {
        let tes = JSON.parse(data);
        res.json(tes);
    });
});

router.get("/get-data/:id", (req, res) => {
    fs.readFile("user.json", "utf-8", (err, data) => {
        data = JSON.parse(data);
        data.forEach((e) => {
            if (e.id == req.params.id) {
                res.send(e);
            }
        });
    });
});

router.get("/tes", (req, res) => {
    const data = {
        name: "Myoui Mina",
        age: 24,
        address: "San Antonio Texas",
        phone: "011223344",
        data: {
            pacar: "Fernandre",
            lama: {
                tahunPacaran: 2015,
                lamaPacaran: "6 Tahun",
            },
        },
    };
    res.end(JSON.stringify(data, null, "\t"));
});

module.exports = router;
