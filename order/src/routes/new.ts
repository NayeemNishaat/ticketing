import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { requireAuth, validateRequest } from "@labyrinth-inc/ticketing-sdk";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/order",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((string: string) => mongoose.Types.ObjectId.isValid(string))
      .withMessage("TicketId must be provided")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as newOrderRouter };
