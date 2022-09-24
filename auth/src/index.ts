import express from "express";
import "express-async-errors"; // Note: This is a package that allows us to throw errors inside async functions and it will be automatically caught by the global error handler middleware. Only need to importonce before creating the "app"!
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async (_req, _res, next) => {
  // next(new NotFoundError()); // Note: For throwing async errors
  throw new NotFoundError(); // Note: Manually throwing an error and it will be captured by the global error handler middleware in our case it will be the below "errorHandler" middleware. Important: This will not work if we don't have the "express-async-errors" package installed because async errors will not be automatically captured by express and this request will hang.
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-svc:27017/auth"); // Note: "auth-mongo-svc" is the service name/cluster ip and "27017" is the port for the cluster ip service and "auth" is the db name.
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!");
  });
};
start();
