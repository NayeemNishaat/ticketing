import {
  Publisher,
  OrderCancelledEvent,
  Subjects
} from "@labyrinth-inc/ticketing-sdk";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
