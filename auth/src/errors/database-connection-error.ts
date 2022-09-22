export class DatabaseConnectionError extends Error {
  reason = "Error connecting to database"; // Note: Available as ob.reason
  statusCode = 500;

  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason
      }
    ];
  }
}
