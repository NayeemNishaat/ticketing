import {
  Publisher,
  Subjects,
  TicketUpdatedEvent
} from "@labyrinth-inc/ticketing-sdk";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
