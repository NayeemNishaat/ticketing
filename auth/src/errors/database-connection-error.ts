export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database"; // Note: Available as ob.reason

  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
