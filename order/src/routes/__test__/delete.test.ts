import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";

it("marks an order as cancelled", async () => {
  // Part: Create a ticket with Ticket Model
  const ticket = Ticket.build({
    title: "concert",
    price: 20
  });
  await ticket.save();

  const user = global.signin();

  // Part: Make a request to create an order
  const { body: order } = await request(app)
    .post("/api/order")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Part: Make a request to cancel the order
  await request(app)
    .delete(`/api/order/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  // Part: Make sure the order is cancelled
  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo("emits an order cancelled event");
