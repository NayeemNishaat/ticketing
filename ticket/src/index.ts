import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is not defined."); // Important: This error will never reach to the client because it's not originated in between request-respponse cycle.

  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined.");

  try {
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
