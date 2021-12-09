

class CEventQueue {

  constructor() {
    this.publishers = new Map();
    this.subscribers = new Map();
  }

  // TODO: Refactor to just add() and remove()
  addPublisher(publisher) {
    this.publishers.set(publisher.id, publisher);

    // Asynchronously publish events
    publisher.on('*', async (...args) => {
      this.handleEvent(...args);
      return;
    });
  }

  addSubscriber(subscriber) {
    this.subscribers.set(subscriber.id, subscriber);
  }

  removePublisher(publisher) {
    publisher.removeAllListeners('*');
    this.publishers.delete(publisher.id);
  }

  deleteSubscriber(subscriber) {
    this.subscribers.delete(subscriber.id);
  }

  handleEvent(...args) {
    const eventName = args[0];
    const theRest = args.slice(1);
    for (const subscriber of this.subscribers.values()) {
      if (subscriber.hasEvent(eventName)) subscriber.handle(eventName, ...theRest);
    }
  }
  
}

module.exports = CEventQueue;