const express = require("express");
const router = express.Router()
const auth = require("../auth")
const UserController = require('../controller/UserController')

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

router.get("/",auth.isAuthorized, (req,res,next) => { 
    res.locals.route = 'index'
    next()
    }, UserController.renderHTML
);

router.get("/requirements",(req,res,next) => { 
    res.locals.route = 'requirement'
    next()
    }, UserController.renderHTML
);

router.get("/features",(req,res,next) => { 
    res.locals.route = 'features'
    next()
    }, UserController.renderHTML
);

router.get("/ranks",(req,res,next) => { 
    res.locals.route = 'ranks'
    next()
    }, UserController.renderHTML
);

router.get("/aboutus",(req,res,next) => { 
    res.locals.route = 'aboutus'
    next()
    }, UserController.renderHTML
);

router.get("/subscribe",(req,res,next) => { 
    res.locals.route = 'subscribe'
    next()
    }, UserController.renderHTML
);

router.get("/login",(req,res,next) => { 
    res.locals.route = 'login'
    next()
    }, UserController.renderHTML
);


router.post("/login_admin", UserController.loginAdmin);

router.get("/register",(req,res,next) => { 
    res.locals.route = 'register'
    next()
    }, UserController.renderHTML
);

router.get("/forgetpassword",(req,res,next) => { 
    res.locals.route = 'forgetpassword'
    next()
    }, UserController.renderHTML
);

router.get("/rps",(req,res,next) => { 
    res.locals.route = 'rps'
    next()
    }, UserController.renderHTML
);

router.get("/valorant",(req,res,next) => { 
    res.locals.route = 'valorant'
    next()
    }, UserController.renderHTML
);

router.get("/games",(req,res,next) => { 
    res.locals.route = 'games'
    next()
    }, UserController.renderHTML
);

router.get("/features",(req,res,next) => { 
    res.locals.route = 'features'
    next()
    }, UserController.renderHTML
);


// Static (Still Using user.json file)
router.post("/login-data", UserController.loginData);
router.post("/data", UserController.registerData);
router.get("/data", UserController.getData);
router.get("/data/:id", UserController.getDataById);
router.put("/data/:id", UserController.updateData);
router.delete("/data/:id", UserController.deleteData);

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
