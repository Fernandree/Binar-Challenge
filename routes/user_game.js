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


//Articles
router.get("/article", auth.isAuthorized, UserController.getArticles);
router.post("/article", auth.isAuthorized, UserController.addArticle)
router.get("/article/:id", auth.isAuthorized, UserController.getArticleById);
router.put("/article", auth.isAuthorized, UserController.updateArticle)
router.delete("/article/:id", auth.isAuthorized, UserController.deleteArticle)

//User Game
router.get("/user-game", auth.isAuthorized, UserController.getUserGame);
router.post("/user-game", auth.isAuthorized, UserController.addUserGame);
router.get("/user-game/:id", auth.isAuthorized, UserController.getUserGameById);
router.put("/user-game", auth.isAuthorized, UserController.updateUserGame)
router.delete("/user-game/:id", auth.isAuthorized, UserController.deleteUserGame)

//User Biodata
router.get("/biodata", auth.isAuthorized, UserController.getUserBio);
router.post("/biodata", auth.isAuthorized, upload.single('images'), UserController.addUserBio);
router.get("/biodata/:id", auth.isAuthorized, UserController.getUserBioById);
router.put("/biodata", auth.isAuthorized, upload.single('newImages'), UserController.updateUserBio)
router.delete("/biodata/:id", auth.isAuthorized, UserController.deleteUserBio)

//User History
router.get("/history", auth.isAuthorized, UserController.getUserHistory);
router.post("/history",auth.isAuthorized, UserController.addUserHistory);
router.get("/history/:id", auth.isAuthorized, UserController.getUserHistoryById);
router.put("/history", auth.isAuthorized, UserController.updateUserHistory)
router.delete("/history/:id", auth.isAuthorized, UserController.deleteUserHistory)

module.exports = router;
