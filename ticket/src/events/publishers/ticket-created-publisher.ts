import {
  Publisher,
  Subjects,
  TicketCreatedEvent
} from "@labyrinth-inc/ticketing-sdk";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated; // Note: Annotation is also required because we won't allow the change of subject
}
