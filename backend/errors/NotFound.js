export default class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}
