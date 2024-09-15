import { Router } from "express";

const router = Router();

import Home from "./homeRoute.js";
import Register from "./registerRoute.js";

router.use("/", Home);
router.use("/register", Register);

export default router;
