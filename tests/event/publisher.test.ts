import { CPublisher } from "../../src/event";

const publisher = new CPublisher('testPublisher');

test('should emit an event', () => {
  return new Promise<void>((resolve) => {
    publisher.on('*', () => {
      resolve();
    });
    publisher.emit('', {});
  });
})