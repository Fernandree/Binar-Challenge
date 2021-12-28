const { User_admin, User_game, Article } = require("./models");

module.exports.isAuthorized  = function(req, res, next) {

    console.log(req.session.userId)
    User_admin.findByPk(req.session.userId).then(function (user) {
        if (!user) {
            
            return res.render("pages/error/401")
        } else {      
            if (user === undefined) {
                
                return res.render("pages/error/401")
            } else {
                return next();
            }
        }
    });
}