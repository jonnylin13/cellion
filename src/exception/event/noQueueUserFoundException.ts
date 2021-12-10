import { Exception } from "../exception";


export class NoQueueUserFound extends Exception {
  constructor() {
    super('NoQueueUserFound', 'No queue user could be found.');
  }
}