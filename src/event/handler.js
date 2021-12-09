

class CHandler {

  constructor(eventName, context, handler) {
    this.eventName = eventName;
    this.run = handler.bind(context);
  }

}

module.exports = CHandler;