var PlayerService = require('../services/PlayerService')

exports.renderHTML = async (req,res,next) => {
    try {
        res.render("pages/static/" + res.locals.route)
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.registerPlayer = async (req,res,next) => {
    try {
        const registered = await PlayerService.registerPlayer(req,res)
        
        if(registered){
            res.redirect('/player/login')
        }else{
            res.send('Player register failed')
        }
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.loginPlayer = async (req,res,next) => {
    try {
        return await PlayerService.loginPlayer(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.whoami = async(req,res,next)=>{
    res.render('pages/profile', req.user)
}

exports.welcome = async(req,res,next)=>{
    res.render('pages/static/welcome', req.user)
}

exports.createRoom = async(req,res,next)=>{
    try {
        //console.log(req.body)
        //res.render("pages/static/rps",req.user)
        const result =  await PlayerService.createRoom(req,res)
        return res.redirect("/player/rps/"+result.result.id)
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.playGame = async(req,res,next)=>{
    try {
        //console.log(req.params)
        res.render("pages/static/rps",{user: req.user, room_id: req.params.room_id})
        //const result =  await PlayerService.createRoom(req,res)
        //return res.redirect()
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.addScore = async(req,res,next)=>{
    try {
        const result = await PlayerService.addScore(req,res)
        if(result) return res.json({ status: 200, message: "Score has been added" });
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}