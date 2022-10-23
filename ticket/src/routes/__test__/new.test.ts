import request from "supertest";
import { app } from "../../app";

// Note: TDD Approach
it("has a route handler listening to /api/ticket for post requests", async () => {
  const res = await request(app).post("/api/ticket").send({});

  expect(res.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  await request(app).post("/api/ticket").send({}).expect(401);
});

it("returns a status other than 401 if the use is signed in", async () => {
  // Important: Don't write inter-service dependent tests. Write independent tests.
  const res = await request(app)
    .post("/api/ticket")
    .set("Cookie", global.signin())
    .send({});

  expect(res.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/ticket")
    .set("Cookie", global.signin())
    .send({
      title: "",
      price: 10
    })
    .expect(400);

  await request(app)
    .post("/api/ticket")
    .set("Cookie", global.signin())
    .send({
      price: 10
    })
    .expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app)
    .post("/api/ticket")
    .set("Cookie", global.signin())
    .send({
      title: "tjhbn dfjdh",
      price: -100
    })
    .expect(400);

  await request(app)
    .post("/api/ticket")
    .set("Cookie", global.signin())
    .send({
      title: "xjv dgjsii"
    })
    .expect(400);
});

it("creates a ticket with valid inputs", async () => {});
