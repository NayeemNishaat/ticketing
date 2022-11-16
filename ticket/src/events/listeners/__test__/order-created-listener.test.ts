import { OrderCreatedListener } from "../order-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { OrderCreatedEvent, OrderStatus } from "@labyrinth-inc/ticketing-sdk";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
  // Point: Create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Point: Create and save a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 99,
    userId: "asdf"
  });
  await ticket.save();

  // Point: Create the fake data event
  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "hfdji",
    expiresAt: "idgkmnb",
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, ticket, data, msg };
};
