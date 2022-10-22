import express, { Request, Response } from "express";
import { requireAuth } from "@labyrinth-inc/ticketing-sdk";

const router = express.Router();

router.post("/api/ticket", requireAuth, (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as createTicketRouter };
