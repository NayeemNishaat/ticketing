import {
  Publisher,
  OrderCreatedEvent,
  Subjects
} from "@labyrinth-inc/ticketing-sdk";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
