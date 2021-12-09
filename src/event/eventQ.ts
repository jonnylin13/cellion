import { CSubscriber, CPublisher } from ".";


export class CEventQueue {

  private publishers: Map<string, CPublisher> = new Map();
  private subscribers: Map<string, CSubscriber> = new Map();

  constructor() {}

  add(queueUser: CPublisher | CSubscriber): void {
    if (queueUser instanceof CPublisher) {
      this.publishers.set(queueUser.id, queueUser);

      // Asynchronously publish events
      queueUser.on('*', async (...args) => {
        this.handleEvent(...args);
        return;
      });
    }
    else this.subscribers.set(queueUser.id, queueUser);
  }

  delete(queueUser: CPublisher | CSubscriber): void {
    if (queueUser instanceof CPublisher) {
      queueUser.removeAllListeners('*');
      this.publishers.delete(queueUser.id);
    }
    else this.subscribers.delete(queueUser.id);
  }

  private handleEvent(...args: any[]): void {
    const eventName: string = args[0];
    const theRest: any[] = args.slice(1);
    for (const subscriber of this.subscribers.values()) {
      if (subscriber.hasEvent(eventName)) subscriber.handle(eventName, ...theRest);
    }
  }
  
}