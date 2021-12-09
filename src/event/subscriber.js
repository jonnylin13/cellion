

class CSubscriber {

  constructor(id, handlers) {
    this.handlers = new Map();
    this.id = id;
    for (const handler of handlers) {
      this.handlers.set(handler.eventName, handler);
    }
  }
  
  hasEvent(eventName) {
    return this.handlers.has(eventName);
  }

  handle(eventName, ...args) {
    try {
      this.handlers.get(eventName)?.run(...args);
    } catch (err) {
      throw err;
    }
  }

}

module.exports = CSubscriber;