

export class CHandler {
  eventName: string;
  handler: Function;
  context: any;

  constructor(eventName: string, context: any, handler: Function) {
    this.eventName = eventName;
    this.handler = handler;
    this.context = context;
  }

  run(...args: any[]) {
    this.handler(this.context, ...args);
  }
}