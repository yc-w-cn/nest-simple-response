export class SimpleException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SimpleException';
  }
}
