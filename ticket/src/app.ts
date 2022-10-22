import express from "express";
import "express-async-errors"; // Note: This is a package that allows us to throw errors inside async functions and it will be automatically caught by the global error handler middleware. Only need to importonce before creating the "app"!
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@labyrinth-inc/ticketing-sdk";
import { createTicketRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true); // Note: Traffic is being proxied to our application through ingress-nginx. Hence bt default express doen't trust proxied https connection. That's why we are saying express to trust proxy.
app.use(express.json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" })
);
app.use(createTicketRouter);

app.all("*", async (_req, _res, next) => {
  // next(new NotFoundError()); // Note: For throwing async errors
  throw new NotFoundError(); // Note: Manually throwing an error and it will be captured by the global error handler middleware in our case it will be the below "errorHandler" middleware. Important: This will not work if we don't have the "express-async-errors" package installed because async errors will not be automatically captured by express and this request will hang.
});

app.use(errorHandler);

export { app };
