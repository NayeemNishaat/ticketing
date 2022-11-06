import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app";
import { Order, OrderStatus } from "../models/order";
import { Ticket } from "../models/ticket";

it("returns an error if the ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post("/api/order")
    .set("Cookie", global.signin())
    .send({ ticketId })
    .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20
  });
  await ticket.save();

  const order = Order.build({
    ticket,
    userId: "asdf",
    status: OrderStatus.Created,
    expiresAt: new Date()
  });
  await order.save();

  await request(app)
    .post("/api/order")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id }) // Note: Ticked is already reserved by the order above
    .expect(400);
});

it("reserves a ticket", async () => {});
