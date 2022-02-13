const jwt = require('jsonwebtoken');
const accessTokenSecret = 'this is my secret, shuush';

module.exports = authenticateJWT = (req, res, next) => {
    //console.log(req.cookies['jwt'])
    if(req.cookies['jwt']){
        const claims = jwt.verify(req.cookies['jwt'], accessTokenSecret)
        req.user = claims
        next()
    }else{
        res.redirect('/player/login')
    }
};