export interface IExceptionHandler {
  handle(error: Error): void;
}
