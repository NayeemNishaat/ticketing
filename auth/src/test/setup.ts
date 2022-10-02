import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;
beforeAll(async () => {
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
