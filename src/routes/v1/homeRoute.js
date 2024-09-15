import { Router } from "express";
const router = Router();

import { sendMessage } from "../../functions/Home.js";

router.get("/", sendMessage);

export default router;
