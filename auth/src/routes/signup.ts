import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password length must be between 4 and 20")
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    console.log("Creating a user...");

    throw new DatabaseConnectionError();

    res.send({});
  }
);

export { router as signupRouter };
