import express from "express";

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

app.get("*", (_req, _res, _next) => {
  throw new NotFoundError(); // Manually throwing an error and it will be captured by the global error handler middleware in our case it will be the below "errorHandler" middleware.
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
