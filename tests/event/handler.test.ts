import { CHandler } from "../../src/event";

const ctx = {someVar: 2};
const handler = new CHandler('testEvent', ctx, (context: any, val: number) => {
  context.someVar += val;
});

test('should run handler and mutate context variable', () => {
  handler.run(1);
  expect(ctx.someVar).toBe(3);
});