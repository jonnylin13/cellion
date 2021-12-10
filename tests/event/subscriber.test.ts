import Event from "../../src/event";

const ctx = {someVar: 2};
const handler = new Event.CHandler('testEvent', ctx, (context: any, val: number) => {
  context.someVar += val;
});
const subscriber = new Event.CSubscriber('testSubscriber', [handler]);

test('subscriber should call handler and mutate context to 3', () => {
  subscriber.handle('testEvent', 1);
  expect(ctx.someVar).toBe(3);
});