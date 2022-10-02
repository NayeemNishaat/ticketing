import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY is not defined."); // Important: This error will never reach to the client because it's not originated in between request-respponse cycle.

  try {
    await mongoose.connect("mongodb://auth-mongo-svc:27017/auth"); // Note: "auth-mongo-svc" is the service name/cluster ip and "27017" is the port for the cluster ip service and "auth" is the db name.
    console.log("MongoDB Online");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};
start();
