import request from "supertest";
import { app } from "../../app";

// Note: TDD Approach
it("has a route handler listening to /api/ticket for post requests", async () => {
  const res = await request(app).post("/api/ticket").send({});

  expect(res.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const res = await request(app).post("/api/ticket").send({}).expect(401);
});

it("returns an error if an invalid title is provided", async () => {});

it("returns an error if an invalid price is provided", async () => {});

it("creates a ticket with valid inputs", async () => {});
