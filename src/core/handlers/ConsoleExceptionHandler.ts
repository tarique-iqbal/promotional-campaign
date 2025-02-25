import { injectable } from 'inversify';

import { IExceptionHandler } from '../interfaces/IExceptionHandler';

@injectable()
export class ConsoleExceptionHandler implements IExceptionHandler {
  handle(error: Error): void {
    console.error(`[ERROR]: ${error.message}`);
    if (error instanceof Error && error.stack) {
      console.error(error.stack);
    }
  }
}
