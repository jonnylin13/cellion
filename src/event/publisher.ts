import { CQueueUser } from "./interface/qUser";
import EventEmitter from "events";


export class CPublisher extends EventEmitter implements CQueueUser {

  id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  emit(eventName: string | symbol, ...args: any[]): boolean {
    super.emit('*', ...[eventName, ...args]);
    super.emit(eventName, ...args);
    return true;
  }

}