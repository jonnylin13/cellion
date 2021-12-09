import { CQueueUser } from "./interface/qUser";
import { CHandler } from "./handler";


export abstract class CSubscriber implements CQueueUser {

  id: string;
  private handlers: Map<string, CHandler> = new Map();

  constructor(id: string, handlers: CHandler[]) {
    this.id = id;
    for (const handler of handlers) {
      this.handlers.set(handler.eventName, handler);
    }
  }
  
  hasEvent(eventName: string): boolean {
    return this.handlers.has(eventName);
  }

  handle(eventName: string, ...args: any[]): void {
    try {
      this.handlers.get(eventName)?.run(...args);
    } catch (err) {
      throw err;
    }
  }

}