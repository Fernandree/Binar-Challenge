const express = require("express");
const router = express.Router();
const auth = require("../auth")
const UserController = require('../controller/UserController')

router.get("/dashboard", auth.isAuthorized, UserController.getUsers);
router.post("/add", auth.isAuthorized, UserController.addUser)
router.get("/edit_user/:id", auth.isAuthorized, UserController.getUserById);
router.post("/update", auth.isAuthorized, UserController.updateUser)
router.get("/delete/:id", auth.isAuthorized, UserController.deleteUser)

module.exports = router;
