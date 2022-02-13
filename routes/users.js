var express = require('express');
var router = express.Router();
const PlayerController = require('../controller/PlayerController')

router.get("/register",(req,res,next) => { 
  res.locals.route = 'register_player'
  next()
  }, PlayerController.renderHTML);
  
router.post("/register", PlayerController.registerPlayer);

router.get("/login",(req,res,next) => { 
  res.locals.route = 'login_player'
  next()
  }, PlayerController.renderHTML);

router.post("/login", PlayerController.loginPlayer);

router.get("/whoami", authenticateJWT, PlayerController.whoami);
router.get("/welcome", authenticateJWT, PlayerController.welcome);
router.post("/create-room", authenticateJWT, PlayerController.createRoom);
router.post("/add-score", authenticateJWT, PlayerController.addScore);
router.get("/rps/:room_id", authenticateJWT, PlayerController.playGame)


// router.post("/article",  PlayerController.addArticle)
// router.get("/article/:id",  PlayerController.getArticleById);
// router.put("/article",  PlayerController.updateArticle)
// router.delete("/article/:id",  PlayerController.deleteArticle)

module.exports = router;
