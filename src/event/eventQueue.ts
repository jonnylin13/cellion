import { CPublisher } from "./publisher";
import { CSubscriber } from "./subscriber";
import EventException from "../exception/event";


export class CEventQueue {

  private publishers: Map<string, CPublisher> = new Map();
  private subscribers: Map<string, CSubscriber> = new Map();

  constructor() {}

  add(queueUser: CPublisher | CSubscriber): void {
    if (queueUser instanceof CPublisher) {
      this.publishers.set(queueUser.id, queueUser);

      // Asynchronously publish events
      queueUser.on('*', async (...args: any[]) => {
        this.handleEvent(...args);
        return;
      });
    }
    else this.subscribers.set(queueUser.id, queueUser);
  }

  delete(value: CPublisher | CSubscriber | string): void {
    if (typeof value === 'string') {
      const queueUser = this.getPublisherOrSubscriberById(value);
      if (queueUser === undefined) throw new EventException.NoQueueUserFound();
      this.deleteQueueUser(queueUser);
      return;
    }
    this.deleteQueueUser(value);
  }

  deleteQueueUser(queueUser: CPublisher | CSubscriber) {
    if (queueUser instanceof CPublisher) {
      queueUser.removeAllListeners('*');
      this.publishers.delete(queueUser.id);
    }
    else this.subscribers.delete(queueUser.id);
  }

  private getPublisherOrSubscriberById(id: string): CPublisher | CSubscriber | undefined {
    if (this.publishers.has(id)) return this.publishers.get(id);
    return this.subscribers.get(id);
  }

  private handleEvent(...args: any[]): void {
    const eventName: string = args[0];
    const theRest: any[] = args.slice(1);
    for (const subscriber of this.subscribers.values()) {
      if (subscriber.hasEvent(eventName)) subscriber.handle(eventName, ...theRest);
    }
  }

  getPublishers() {
    return Array.from(this.publishers.values());
  }

  getSubscribers() {
    return Array.from(this.subscribers.values());
  }
  
}