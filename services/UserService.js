const {Article, User_admin, User_game, User_game_history,User_game_biodata, sequelize} = require('../models')
const md5 = require("md5");
const fs = require("fs");
let users = require("../user.json");

User_game.hasMany(User_game_history,{
    foreignKey : 'id'
});
User_game.hasOne(User_game_biodata,{
    foreignKey : 'id'
});
User_game_history.belongsTo(User_game , {
    foreignKey : 'user_id'
});

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

exports.addUserHistory = async(req,res,next)=>{
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

//User_Game
exports.addUserGame = async(req,res,next)=>{
    console.log(req.body);
    try {
        const result = await User_game.create({
            username : req.body.username,
            password : md5(req.body.password),
        })
        return {success : true, result: result}
    } catch (error) {
        return res.status(400).send('Error in insert new record');
    }
}

exports.getUserGame = async function (req,res) {
    try {
        const users = await User_game.findAll()
        return users;
    } catch (e) {
        // Log Errors
        throw Error(e)
    }
}

exports.getUserGameForBio = async function (req,res) {
    try {
        const users = await User_game.findAll({
            where: sequelize.literal(`id not in(SELECT user_id from "User_game_biodata")`),
        })
        return users;
    } catch (e) {
        // Log Errors
        throw Error(e)
    }
}

exports.getUserGameById = async(req,res,next)=>{
    try {
        sess = req.session;
        const result = await User_game.findByPk(req.params.id)
        return result
    } catch (error) {
        return res.status(400).send('Error in find user');
    }
}

exports.updateUserGame = async(req,res,next)=>{
    try {
        return await User_game.update({
            username : req.body.username,
            password : md5(req.body.password),
        },{where: {id : req.body.user_id}})
        
    } catch (error) {
        return res.status(400).send('Error in updating a record');
    }
}

exports.deleteUserGame = async(req,res,next)=>{
    try {
        return User_game.destroy({
            where : {id : req.params.id}
        })
    } catch (error) {
        return res.status(400).send('Error in deleting a record');
    }
}

//User Game Biodata
exports.addUserBio = async(req,res,next)=>{
    console.log(req.file.filename)
    try {
        const result = await User_game_biodata.create({
            full_name : req.body.fullname,
            user_id : req.body.user_id,
            age : req.body.age,
            country : req.body.country,
            images : req.file.filename,
            date_of_birth : req.body.dob,
            gender : req.body.gender,
        })
        return {success : true, result: result}
    } catch (error) {
        return res.status(400).send('Error in insert new record');
    }
}

exports.getUserBio = async function (req,res) {

    try {
        const users = await User_game_biodata.findAll({order:[['id','asc']]})
        return users;
    } catch (e) {
        // Log Errors
        throw Error(e)
    }
}

exports.getUserBioById = async(req,res,next)=>{
    try {
        sess = req.session;
        const result = await User_game_biodata.findByPk(req.params.id)
        return result
    } catch (error) {
        return res.status(400).send('Error in finding a record');
    }
}

exports.updateUserBio = async(req,res,next)=>{
    //console.log(req.body, req.file)
    try {
        return await User_game_biodata.update({
            full_name : req.body.fullname,
            age : req.body.age,
            country : req.body.country,
            images : req.body.filename,
            date_of_birth : req.body.dob,
            gender : req.body.gender,
        },{where: {id : req.body.bio_id}})
        
    } catch (error) {
        return res.status(400).send('Error in updating a record');
    }
}

exports.deleteUserBio = async(req,res,next)=>{
    try {
        return User_game_biodata.destroy({
            where : {id : req.params.id}
        })
    } catch (error) {
        return res.status(400).send('Error in deleting a record');
    }
}

exports.getImageName = async(req,res,next)=>{
    //console.log(req.body.bio_id)
    try {
        return await User_game_biodata.findAll({
            attributes: ['images'],
            where : {id : req.body.bio_id}
        })
    } catch (error) {
        return res.status(400).send('Error in deleting a record');
    }
}

//User Game History
exports.addUserHistory = async(req,res,next)=>{
    try {
        const result = await User_game_history.create({
            user_id : req.body.user_id,
            score : req.body.score,
            time : req.body.time,
            stage : req.body.stage,
        })
        return {success : true, result: result}
    } catch (error) {
        return res.status(400).send('Error in insert new record');
    }
}

exports.getUserHistory = async function (req,res) {

    try {
        const users = await User_game_history.findAll({
            attributes : ['id','stage','score','time'],
            include : {
                model : User_game,
                attributes : ['username']
            },
            order:[['id','asc']]
        })
        return users;
    } catch (e) {
        // Log Errors
        throw Error(e)
    }
}

exports.getUserHistoryById = async(req,res,next)=>{
    try {
        sess = req.session;
        const result = await User_game_history.findByPk(req.params.id)
        return result
    } catch (error) {
        return res.status(400).send('Error in finding a record');
    }
}

exports.updateUserHistory = async(req,res,next)=>{
    //console.log(req.body, req.file)
    try {
        return await User_game_history.update({
            score : req.body.score,
            time : req.body.time,
            stage : req.body.gender,
        },{where: {id : req.body.history_id}})
        
    } catch (error) {
        return res.status(400).send('Error in updating a record');
    }
}

exports.deleteUserHistory = async(req,res,next)=>{
    try {
        return User_game_history.destroy({
            where : {id : req.params.id}
        })
    } catch (error) {
        return res.status(400).send('Error in deleting a record');
    }
}