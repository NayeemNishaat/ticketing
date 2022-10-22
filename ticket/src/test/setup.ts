import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  function signin(): string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdf";
  // Important: For mongodb libssl 1.1 is required which is not available on ubuntu 22.04 hence we need to use the following workaround
  // wget http://debian.mirror.ac.za/debian/pool/main/o/openssl/libssl1.1_1.1.1o-1_amd64.deb
  // sudo dpkg -i libssl1.1_1.1.1o-1_amd64.deb
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  // Part: Build a JWT payload. { id, email }
  const payload = { id: "abfscsf", email: "abc@xyz.ijk" };

  // Part: Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Part: Build session Object. { jwt: JWT_TOKEN }
  const session = { jwt: token };

  // Part: Turn the session into JSON
  const sessionJSON = JSON.stringify(session);

  // Part: Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // Part: Return a string that is the cookie with the encoded data
  return [`session=${base64}`]; // Remark: Supertest expects an array of strings as a cookie.
};
