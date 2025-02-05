const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");
const { validateWithZod, registerScheme, loginScheme } = require("../middlewares/validators");
//npm i zod

//@ENDPOINT http://localhoat:8000/api/register
router.post("/register", validateWithZod(registerScheme), authController.register);
router.post("/login", validateWithZod(loginScheme), authController.login);

module.exports = router;
