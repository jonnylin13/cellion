

export class CHandler {
  eventName: string;
  run: Function;

  constructor(eventName: string, context: any, handler: Function) {
    this.eventName = eventName;
    this.run = handler.bind(context);
  }
}