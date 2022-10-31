import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is not defined."); // Important: This error will never reach to the client because it's not originated in between request-respponse cycle.

  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined.");

  try {
    await natsWrapper.connect("ticketing", "hjijdjf", "http://nats-svc:4222");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Online (ticket svc)");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000 (ticket svc)");
  });
};
start();

// Warning: Important: We will not create a NATS client in this file and export it. If we do so we will end up creating a circular export-import loop/dependency. Which in turn cause re-running of these two files back and forth and will cause error!
