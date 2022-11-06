import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("fetches the order", async () => {
  // Part: Create a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20
  });
  await ticket.save();

  const user = global.signin(); // Note: Cookie

  // Part: Make a request to create an order
  const { body: order } = await request(app)
    .post("/api/order")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Part: Make a request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/order/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it("returns error if one user tries to fetch another user's order", async () => {
  // Part: Create a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20
  });
  await ticket.save();

  // Part: Make a request to create an order
  const { body: order } = await request(app)
    .post("/api/order")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);

  // Part: Make a request to fetch the order
  await request(app)
    .get(`/api/order/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
