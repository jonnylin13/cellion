import Event from "../../src/event";

const publisher = new Event.CPublisher('testPublisher');

test('should emit an event', () => {
  return new Promise<void>((resolve) => {
    publisher.on('*', () => {
      resolve();
    });
    publisher.emit('', {});
  });
})