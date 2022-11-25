import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  OrderStatus
} from "@labyrinth-inc/ticketing-sdk";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

import { Message } from "node-nats-streaming";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) throw new Error("Order not found");

    order.set({ status: OrderStatus.Complete });
    await order.save();

    // Remark: Ideally emit an event here to inform other services that the order has been paid for/updated.

    msg.ack();
  }
}
