import request from "supertest";
import { app } from "../../app";

it("returns a 404 if the ticket is not found", async () => {
  const res = await request(app).get("/api/ticket/dfdyuj").send().expect(404);

  // console.log(res.body); // Remark: This line will be invoked if the test passes or if we remove the expectation.
});

it("returns the ticket if the ticket is found", async () => {
  const title = "concert";
  const price = 20;

  const response = await request(app)
    .post("/api/ticket")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/ticket/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
