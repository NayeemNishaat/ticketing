import { ValidationError } from "express-validator";

export class RequestValidationError extends Error {
  // errors: ValidationError[];
  // constructor(errors: ValidationError[]) {
  //   super();
  //   this.errors = errors;
  // }

  // Note: Equivalent to the above syntax
  constructor(public errors: ValidationError[]) {
    super();

    // Important: When extending a built-in class like Error in TypeScript you need to set the prototype explicitly.
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
