import Stripe from "stripe";

export const stripe = new Stripe(
  "sk_test_51KoMC0CUGtQvOzQdlKH8XQKCEZYZOiU6NtdDDWvkwCTpUSHFxBFzDVJ40lNQezB90yNZVa7QAT30n02k69EOZkqh00T1ujh3IJ",
  {
    apiVersion: "2022-11-15"
  }
);
