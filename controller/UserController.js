var UserService = require('../services/UserService')

exports.getArticles = async (req,res,next) => {
    let sess = req.session
    try {
        await UserService.getArticles().then((article) => {
            res.render("pages/admin/dashboard", { article: article, user : sess });
        });
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.addArticle = async (req,res,next) => {
    try {
        const result = await UserService.addArticle(req,res,next)
        if(result) return res.redirect("/user_game/article");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getArticleById = async (req,res,next) => {
    try {
        sess = req.session;
        const article = await UserService.getArticleById(req,res,next)
        if(article) return res.render("pages/admin/edit_user", { article: article, user : sess });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateArticle = async (req,res,next) => {
    try {
        const article = await UserService.updateArticle(req,res,next)
        if(article) return res.redirect("/user_game/article")
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteArticle = async(req,res,next)=>{
    try {
        const article = await UserService.deleteArticle(req,res,next)
        if(article) return res.redirect("/user_game/article")
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.renderHTML = async (req,res,next) => {
    try {
        res.render("pages/static/" + res.locals.route)
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.loginAdmin = async (req,res,next) => {
    try {
        return await UserService.loginAdmin(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.whoami = async(req,res,next)=>{
    //res.render('pages/profile', req.user.dataValues)
    const currentUser = req.user
    res.json(currentUser)
}

exports.registerAdmin = async (req,res,next) => {
    try {
        const registered = await UserService.registerAdmin(req,res)
        
        if(registered){
            res.redirect('/login')
        }else{
            res.send('Admin register failed')
        }
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

//User Game
exports.getUserGame = async (req,res,next) => {
    let sess = req.session
    try {
        await UserService.getUserGame().then((user_game) => {
            res.render("pages/admin/user_game_dashboard", { user_game: user_game, user : sess });
        });
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.addUserGame = async (req,res,next) => {
    try {
        const result = await UserService.addUserGame(req,res,next)
        if(result) return res.redirect("/user_game/user-game");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getUserGameById = async (req,res,next) => {
    try {
        sess = req.session;
        const user_game = await UserService.getUserGameById(req,res,next)
        if(user_game) return res.render("pages/admin/edit_user_game", { user_game: user_game, user : sess });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateUserGame = async (req,res,next) => {
    
    try {
        const user_game = await UserService.updateUserGame(req,res,next)
        if(user_game) return res.redirect("/user_game/user-game");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteUserGame = async(req,res,next)=>{
    try {
        const user_game = await UserService.deleteUserGame(req,res,next)
        if(user_game) return res.redirect("/user_game/user-game");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

//User Game Biodata
exports.getUserBio = async (req,res,next) => {
    let sess = req.session
    try {
        let users = await UserService.getUserGameForBio()
        let bio = await UserService.getUserBio()
        return res.render("pages/admin/user_game_bio", { users:users, bio: bio, user : sess });
        
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.addUserBio = async (req,res,next) => {
    console.log(req.body,req.file)
    try {
        const result = await UserService.addUserBio(req,res,next)
        if(result) return res.redirect("/user_game/biodata");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getUserBioById = async (req,res,next) => {
    try {
        sess = req.session;
        const bio = await UserService.getUserBioById(req,res,next)
        if(bio) return res.render("pages/admin/edit_user_bio", { bio: bio, user : sess });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateUserBio = async (req,res,next) => {
    try {
        if(req.file === undefined ) {
            console.log('1')
            const img = await UserService.getImageName(req,res,next)
            req.body.filename = img[0].images
        }else{
            console.log('2')
            req.body.filename = req.file.filename
        }
        const bio = await UserService.updateUserBio(req,res,next)
        if(bio) return res.redirect("/user_game/biodata");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteUserBio = async(req,res,next)=>{
    try {
        const bio = await UserService.deleteUserBio(req,res,next)
        if(bio) return res.redirect("/user_game/biodata");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

//User Game History
exports.getUserHistory = async (req,res,next) => {
    let sess = req.session
    try {
        let users = await UserService.getUserGame()
        await UserService.getUserHistory().then((history) => {
            res.render("pages/admin/user_game_history", { users:users, history: history, user : sess });
        });
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.addUserHistory = async (req,res,next) => {
    try {
        const result = await UserService.addUserHistory(req,res,next)
        if(result) return res.redirect("/user_game/history");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getUserHistoryById = async (req,res,next) => {
    try {
        sess = req.session;
        const history = await UserService.getUserHistoryById(req,res,next)
        if(history) return res.render("pages/admin/edit_user_history", { history: history, user : sess });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateUserHistory = async (req,res,next) => {
    try {
        const history = await UserService.updateUserHistory(req,res,next)
        if(history) return res.redirect("/user_game/history");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteUserHistory = async(req,res,next)=>{
    try {
        const history = await UserService.deleteUserHistory(req,res,next)
        if(history) return res.redirect("/user_game/history");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}


//Restful "Data" Static
exports.registerData = async (req,res,next) => {
    try {
        return await UserService.registerData(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.loginData = async (req,res,next) => {
    try {
        return await UserService.loginData(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getData =  async (req,res,next) => {
    try {
        return await UserService.getData(req,res)
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getDataById =  async (req,res,next) => {
    try {
        return await UserService.getDataById(req,res)
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateData = async(req,res,next)=>{
    try {
        return await UserService.updateData(req,res)
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteData = async(req,res,next)=>{
    try {
        return await UserService.deleteData(req,res)
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
