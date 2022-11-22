import {
  OrderCancelledEvent,
  Subjects,
  Listener
} from "@labyrinth-inc/ticketing-sdk";
import { Message } from "node-nats-streaming";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = "payments-service";

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {}
}
