import Queue from "bull";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  // Note: Define the type definition of the job data
  redis: {
    host: process.env.REDIS_HOST
  }
});

expirationQueue.process(async (job) => {
  console.log(
    "I want to publish an expiration:complete event for orderId",
    job.data.orderId
  );
});

export { expirationQueue };
