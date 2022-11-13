import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // Part: Create an instance of a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 5,
    userId: "123"
  });

  // Part: Save the ticket to the database
  await ticket.save();

  // Part: Fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // Part: Make changes to the tickets we fetched
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // Part: Save the first fetched ticket
  await firstInstance!.save();

  // Part: Save the second fetched ticket and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123"
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save(); // Note: We don't need to update, we can just save and this will increment the version number
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
