import type { Request, Response } from "express";
import express from "express";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  res.json(["😀", "😳", "🙄"]);
});

export default router;
