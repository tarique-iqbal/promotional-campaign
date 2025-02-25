import { ConsoleExceptionHandler } from '../../../src/core/handlers/ConsoleExceptionHandler';

describe('ConsoleExceptionHandler', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore(); // Restore console.error after each test
  });

  it('should log the error message', () => {
    const handler = new ConsoleExceptionHandler();
    const error = new Error('Test error');

    handler.handle(error);

    expect(consoleSpy).toHaveBeenCalledWith('[ERROR]: Test error');
  });

  it('should log the stack trace if available', () => {
    const handler = new ConsoleExceptionHandler();
    const error = new Error('Test error');

    handler.handle(error);

    expect(consoleSpy).toHaveBeenCalledTimes(2); // One for error message, one for stack trace
    expect(consoleSpy).toHaveBeenCalledWith('[ERROR]: Test error');
    expect(consoleSpy).toHaveBeenCalledWith(error.stack);
  });

  it('should not log stack trace if it is undefined', () => {
    const handler = new ConsoleExceptionHandler();
    const error = { message: 'Test error', stack: undefined } as Error;

    handler.handle(error);

    expect(consoleSpy).toHaveBeenCalledTimes(1); // Only logs the error message
    expect(consoleSpy).toHaveBeenCalledWith('[ERROR]: Test error');
  });
});
