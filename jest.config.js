module.exports = {
    preset: 'ts-jest',  // Use ts-jest for TypeScript support
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",  // Use ts-jest to transform TypeScript files
    },
    testEnvironment: 'node',  // Specify the test environment, either 'node' or 'jsdom'
};
