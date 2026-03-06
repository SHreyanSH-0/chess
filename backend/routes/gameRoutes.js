const express = require("express");
const router = express.Router();

const routes = require("../controllers/gameControllers");

router.get("/currentState",routes.currentState);
router.post("/update",routes.update);

module.exports = router;