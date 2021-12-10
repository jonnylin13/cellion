

export abstract class Exception {
  name: string = 'Exception';
  message: string = 'An exception has occurred.';

  constructor(name?: string, message?: string) {
    if (name) this.name = name;
    if (message) this.message = message;
  }
}