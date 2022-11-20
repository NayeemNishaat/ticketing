import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent
} from "@labyrinth-inc/ticketing-sdk";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
