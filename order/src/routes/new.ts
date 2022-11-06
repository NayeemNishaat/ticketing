import express, { Request, Response } from "express";
import mongoose from "mongoose";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  BadRequestError
} from "@labyrinth-inc/ticketing-sdk";
import { OrderStatus } from "@labyrinth-inc/ticketing-sdk";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";

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
    const { ticketId } = req.body;

    // Part: Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw new NotFoundError();

    // Part: Make sure that this ticket is not already reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) throw new BadRequestError("Ticket is already reserved");

    // Part: Calculate an expiration date for this order

    // Part: Build the order and save it to the database

    // Part: Publish an event saying that an order was created

    res.send({});
  }
);

export { router as newOrderRouter };
