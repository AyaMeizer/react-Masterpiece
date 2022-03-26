const { Router } = require('express');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')





router.post("/create", userController.create)
router.get("/update/:id", userController.update)
router.get("/getUser", userController.getUser)
router.get("/delete/:id", userController.delete)


module.exports = router