const {Article, User_admin} = require('../models')
const md5 = require("md5");
const fs = require("fs");
let users = require("../user.json");

//Static from user.json
exports.registerData = async (req,res,next) => {
    let obj = {
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
}

exports.loginData = async (req,res,next) =>{
    const user = users.find((item) => item.email === req.body.email && item.password === req.body.password);
    if(user) return res.render('pages/static/thankyou' , {message : 'Welcome! Please Enjoy'});
    res.send({
        status : 404,
        message: "Credentials Not Found!"
    })
}

exports.getData = async (req,res,next) =>{
    res.json(users)
}

exports.getDataById = async(req,res,next) =>{
    const user = users.find((e) => e.id == req.params.id) 
    if(user) return res.send(user);
    res.json({
        status  : 404,
        message : "User not found!",
    })
}

exports.updateData = async(req,res,next) => {
    let user = users.find((e) => e.id == req.params.id) 
    let params = {email : req.body.email, password : req.body.password}
    user = { ...user, ...params };
    users = users.map((i) => (i.id === user.id ? user : i));
    res.status(200).json(user);
}

exports.deleteData = async(req,res,next)=>{
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
}

// Using DB
exports.getUsers = async function (req,res) {

    try {
        const users = await Article.findAll()
        return users;
    } catch (e) {
        // Log Errors
        throw Error(e)
    }
}

exports.loginAdmin = async (req,res) => {
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
                    res.redirect("back");
                } else if (user.password !== md5(password)) {
                   
                    res.redirect("back");
                } else {
                    req.session.userId = user.id
                    res.redirect("user_game/dashboard");
                }
            })
            .catch(() => {
                res.status(500).json({
                    message: "There was an error!",
                });
            });
    }
}

exports.addUser = async(req,res,next)=>{
    try {
        const result = await Article.create({
            title : req.body.player,
            body : req.body.score,
        })
        return {success : true, result: result}
    } catch (error) {
        return res.status(400).send('Error in insert new record');
    }
}

exports.getUserById = async(req,res,next)=>{
    try {
        sess = req.session;
        const result = await Article.findByPk(req.params.id)
        return result
    } catch (error) {
        return res.status(400).send('Error in find user');
    }
}

exports.updateUser = async(req,res,next)=>{
    try {
        return await Article.update({
            title : req.body.player,
            body : req.body.score,
        },{where: {id : req.body.id}})
        
    } catch (error) {
        return res.status(400).send('Error in updating a record');
    }
}

exports.deleteUser = async(req,res,next)=>{
    try {
        return Article.destroy({
            where : {id : req.params.id}
        })
    } catch (error) {
        return res.status(400).send('Error in deleting a record');
    }
}