const express = require("express");
const router = express.Router();
const auth = require("../auth")
const UserController = require('../controller/UserController')
const path = require("path");
const multer  = require('multer')

const storage = multer.diskStorage(
    {
        destination: './public/data/uploads/',
        filename: function ( req, file, cb ) {
            console.log(req.body.user_id)
            const uniqueSuffix = req.body.user_id + '_' + Math.round(Math.random() * 10000)
            cb( null, uniqueSuffix+path.extname(file.originalname));
        }
    }
);
    
const upload = multer({ storage: storage })

const passport = require("../lib/passport")
router.use(passport.initialize())

const restrict = require('../middlewares/restrict')
router.get("/whoami", authenticateJWT, UserController.whoami);
//Articles
router.get("/article", authenticateJWT, UserController.getArticles);
router.post("/article", authenticateJWT, UserController.addArticle)
router.get("/article/:id", authenticateJWT, UserController.getArticleById);
router.put("/article", authenticateJWT, UserController.updateArticle)
router.delete("/article/:id", authenticateJWT, UserController.deleteArticle)

//User Game
router.get("/user-game", UserController.getUserGame);
router.post("/user-game", UserController.addUserGame);
router.get("/user-game/:id", UserController.getUserGameById);
router.put("/user-game", UserController.updateUserGame)
router.delete("/user-game/:id", UserController.deleteUserGame)

//User Biodata
router.get("/biodata", UserController.getUserBio);
router.post("/biodata", upload.single('images'), UserController.addUserBio);
router.get("/biodata/:id", UserController.getUserBioById);
router.put("/biodata", upload.single('newImages'), UserController.updateUserBio)
router.delete("/biodata/:id", UserController.deleteUserBio)

//User History
router.get("/history", UserController.getUserHistory);
router.post("/history", UserController.addUserHistory);
router.get("/history/:id", UserController.getUserHistoryById);
router.put("/history", UserController.updateUserHistory)
router.delete("/history/:id", UserController.deleteUserHistory)




module.exports = router;
