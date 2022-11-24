export const stripe = {
  charges: {
    create: jest.fn().mockResolvedValue({}) // Note: mockResolvedValue is a function that returns a promise that is resolved with the value passed to it
  }
};
