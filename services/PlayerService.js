const {Article, Rooms, User_admin, User_game, User_game_history,User_game_biodata, sequelize} = require('../models')

exports.registerPlayer = async (req,res) => {
    if (!req.body.username || !req.body.password) {
        res.status(404).json({
            message: "Periksa kembali data anda!",
        });
    } else {
        const username = req.body.username;
        const password = req.body.password;
        const input = {username,password}
        return await User_game.register(input)
            .then(() => {
                return 1
            })
            .catch(() => {
                res.status(500).json({
                    message: "There was an error!",
                });
            });
    }
}

exports.loginPlayer = async (req,res) => {
    if (!req.body.username || !req.body.password) {
        res.status(404).json({
            message: "username and password are needed!",
        });
    } else {
        User_game.authenticate(req.body)
            .then((user) => {
                console.log(user)
                res.cookie('jwt',user)
                res.redirect("/player/welcome");
            })
            .catch((error) => {
                res.status(500).json({
                    message: error,
                });
            });
    }
}

exports.addScore = async (req,res) => {
    //console.log(req.body);
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

exports.createRoom = async (req,res) => {
    //console.log(req.body);
    try {
        const result = await Rooms.create({
            created_by : req.body.user_id,
            name : req.body.room_name,
        })
        return {success : true, result: result}
    } catch (error) {
        return res.status(400).send('Error in create new room');
    }
}