var UserService = require('../services/UserService')    

exports.getUsers = async (req,res,next) => {
    let sess = req.session
    try {
        await UserService.getUsers().then((article) => {
            res.render("pages/admin/dashboard", { article: article, user : sess });
        });
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.addUser = async (req,res,next) => {
    try {
        const result = await UserService.addUser(req,res,next)
        if(result) return res.redirect("/user_game/dashboard");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getUserById = async (req,res,next) => {
    try {
        sess = req.session;
        const article = await UserService.getUserById(req,res,next)
        if(article) return res.render("pages/admin/edit_user", { article: article, user : sess });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.updateUser = async (req,res,next) => {
    try {
        const article = await UserService.updateUser(req,res,next)
        if(article) return res.redirect("/user_game/dashboard")
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteUser = async(req,res,next)=>{
    try {
        const article = await UserService.deleteUser(req,res,next)
        if(article) return res.redirect("/user_game/dashboard")
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
