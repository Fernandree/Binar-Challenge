var express = require("express");
var app = express();
var router = express.Router();
const path = require("path");
const fs = require("fs");
let users = require("../user.json");

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
    res.render("pages/rps", {page: "rps"});
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
    const user = users.find((item) => item.email === req.body.email && item.password === req.body.password);
    if(user) return res.render('pages/thankyou' , {message : 'Welcome! Please Enjoy'});
    res.send({
        status : 404,
        message: "Credentials Not Found!"
    })
});

router.get("/get-data", (req, res) => {     
    res.json(users);
});

router.get("/get-data/:id", (req, res) => {
    const user = users.find((e) => e.id == req.params.id) 
    if(user) return res.send(user);
    res.json({
        status  : 404,
        message : "User not found!",
    })
});

router.put("/update-data/:id", (req, res) => {
    let user = users.find((e) => e.id == req.params.id) 
    let params = {email : req.body.email, password : req.body.password}
    user = { ...user, ...params };
    users = users.map((i) => (i.id === user.id ? user : i));
    res.status(200).json(user);
});

router.delete("/delete-data/:id", (req, res) => {
    let user = users.find((e) => e.id == req.params.id) 
    if(user) {
        users = users.filter(function(data) {
            return data.id != req.params.id;
        });
    }
    data = JSON.stringify(users);
    fs.writeFile("user.json", data, "utf8", (err, result) => {
        if (err) {
            res.json({
                status: 400,
                message: "Failed to delete a user!",
            });
        } else {
            res.json({
                status: 200,
                message: "You have deleted a user!",
            });
        }
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
