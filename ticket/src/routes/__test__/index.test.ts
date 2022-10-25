import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
  return request(app).post("/api/ticket").set("Cookie", global.signin()).send({
    title: "concert",
    price: 20
  });
};

it("can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/ticket").send().expect(200);

  expect(response.body.length).toEqual(3);
});
