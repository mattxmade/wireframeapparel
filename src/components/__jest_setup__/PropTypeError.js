const error = console.error;

console.error = (message, ...args) => {
  if (/(Invalid prop|Failed prop type)/gi.test(message)) {
    throw new Error(message);
  }

  error.apply(console, [message, ...args]);
};

// error handling setup
// https://medium.com/shark-bytes/type-checking-with-prop-types-in-jest-e0cd0dc92d5
