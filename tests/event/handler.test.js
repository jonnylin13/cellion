const { CHandler } = require('../../src/event');

const user = {health: 2};
const handler = new CHandler('testEvent', user, function (val) {
  this.health += val;
});

test('should increment the context variable to 3', () => {
  handler.run(1);
  expect(user.health).toBe(3);
})