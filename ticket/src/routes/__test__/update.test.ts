import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/ticket/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "title",
      price: 20
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/ticket/${id}`)
    .send({
      title: "title",
      price: 20
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/ticket")
    .set("Cookie", global.signin())
    .send({
      title: "title",
      price: 20
    });

  await request(app)
    .put(`/api/ticket/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "title2",
      price: 30
    })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/ticket")
    .set("Cookie", cookie)
    .send({
      title: "title",
      price: 20
    });

  await request(app)
    .put(`/api/ticket/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 30
    })
    .expect(400);

  await request(app)
    .put(`/api/ticket/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "title2",
      price: -10
    })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/ticket")
    .set("Cookie", cookie)
    .send({
      title: "title",
      price: 20
    });

  await request(app)
    .put(`/api/ticket/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "another one",
      price: 30
    })
    .expect(200);

  const res = await request(app).get(`/api/ticket/${response.body.id}`).send();

  expect(res.body.title).toEqual("another one");
  expect(res.body.price).toEqual(30);
});