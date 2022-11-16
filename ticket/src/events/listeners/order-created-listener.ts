import {
  Listener,
  OrderCreatedEvent,
  Subjects
} from "@labyrinth-inc/ticketing-sdk";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    // Point: Find the ticket that the order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // Point: If no ticket, throw error
    if (!ticket) throw new Error("Ticket not found");

    // Point: Mark the ticket as being reserved by setting its orderId property
    ticket.set({ orderId: data.id });

    // Point: Save the ticket
    await ticket.save();

    // Point: Ack the message
    msg.ack();
  }
}
