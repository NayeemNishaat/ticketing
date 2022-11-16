import {
  Listener,
  OrderCreatedEvent,
  Subjects
} from "@labyrinth-inc/ticketing-sdk";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

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

    // Important: Point: Publish an event whenever a ticket is updated so that all the concerned services can be in sync
    await new TicketUpdatedPublisher(this.client).publish({
      // Important: Must use await to catch any error if happens when publishing the event and prevent acknowledging the message. If wait is not used then the message will be acknowledged immediately without waiting for the event to be published
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version
    });

    // Point: Ack the message
    msg.ack();
  }
}
