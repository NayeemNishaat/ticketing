import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testcom",
      password: "password"
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  await request(app) // Note: await/return both works
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "pa"
    })
    .expect(400);
});

it("returns a 400 if no email/password provided", async () => {
  await request(app).post("/api/users/signup").send().expect(400);
  await request(app) // Note: await for using multiple requests in a single test
    .post("/api/users/signup")
    .send({ email: "abc@123.com" })
    .expect(400);
  return request(app) // Note: await for using multiple requests in a single test
    .post("/api/users/signup")
    .send({ password: "abc123" })
    .expect(400);
});

it("prevents duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined(); // Note: This will fail because cookie is secured and supertest will request over http not https.
});
