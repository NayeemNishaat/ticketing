import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);

  const cookie = authResponse.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser") // Important: Supertest will not manage cookie automatically and won't send cookie with the request by default.
    .set("Cookie", cookie) // Note: So we need to set the Cookie header manually.
    .send({})
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});
