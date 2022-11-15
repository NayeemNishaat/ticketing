import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedEvent } from "@labyrinth-inc/ticketing-sdk";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  // Point: Create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);

  // Point: Create a fake data event
  const data: TicketCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    title: "concert",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString()
  };

  // Point: Create a fake message object
  // const msg: Partial<Message> = { // Note: Partial is not working
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg };
};

it("creates and saves a ticket", async () => {
  const { listener, data, msg } = await setup();

  // Point: Call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  const ticket = await Ticket.findById(data.id);

  // Point: Write assertions to make sure a ticket was created!
  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  // Point: Call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // Point: Write assertions to make sure ack function is called!
  expect(msg.ack).toHaveBeenCalled();
});
