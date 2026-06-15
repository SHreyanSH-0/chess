const express = require("express");
const router = express.Router();

const routes = require("../controllers/userControllers");

router.post("/login",routes.login);
router.post("/register",routes.register);
router.post("/validateToken",routes.validateToken);

module.exports = router;