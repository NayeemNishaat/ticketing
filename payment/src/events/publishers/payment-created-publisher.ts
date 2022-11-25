import {
  Subjects,
  Publisher,
  PaymentCreatedEvent
} from "@labyrinth-inc/ticketing-sdk";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
