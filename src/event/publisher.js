const EventEmitter = require('events');


class CPublisher extends EventEmitter {

  constructor(id) {
    super();
    this.id = id;
  }

  emit(eventName, ...args) {
    super.emit('*', ...[eventName, ...args]);
    super.emit(eventName, ...args);
    return true;
  }

}

module.exports = CPublisher;