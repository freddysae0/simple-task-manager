import type { Request, Response } from "express";
import express from "express";

import emojis from "./emojis.js";
import tasks from "./tasks.js";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/", tasks);

export default router;
