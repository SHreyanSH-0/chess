import express from "express";
const router = express.Router();

import * as routes from "../controllers/userControllers.js";

router.post("/login",routes.login);
router.post("/register",routes.register);
router.post("/validateToken",routes.validateToken);

export default router;