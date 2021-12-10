import Event from "../../src/event";


const publisher = new Event.CPublisher('testPublisher');
const ctx = {someVar: 2};
const handler = new Event.CHandler('testEvent', ctx, (context: any, val: number) => {
  context.someVar += val;
});
const subscriber = new Event.CSubscriber('testSubscriber', [handler]);
const handler2 = new Event.CHandler('testEvent2', ctx, (context: any) => {
  context.someVar = 0;
});
const subscriber2 = new Event.CSubscriber('testSubscriber2', [handler2]);

const eventQueue = new Event.CEventQueue();

test('queue should add publisher and subscriber', () => {
  eventQueue.add(publisher);
  eventQueue.add(subscriber);
  eventQueue.add(subscriber2);
  expect(eventQueue.getPublishers().length).toBe(1);
  expect(eventQueue.getSubscribers().length).toBe(2);
});

test('test queue functionality', () => {
  publisher.emit('testEvent', 1);
  expect(ctx.someVar).toBe(3);
  publisher.emit('testEvent2');
  expect(ctx.someVar).toBe(0);
  publisher.emit('testEvent', 50);
  expect(ctx.someVar).toBe(50);
});

test('queue should remove all publishers and subscribers', () => {

});