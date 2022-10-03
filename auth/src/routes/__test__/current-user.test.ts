import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/currentuser") // Important: Supertest will not manage cookie automatically and won't send cookie with the request by default.
    .send({})
    .expect(200);
});
