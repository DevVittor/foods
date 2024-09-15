import { Router } from "express";
const router = Router();

import { createNewUser } from "../../functions/Register.js";

router.post("/", createNewUser);

export default router;
