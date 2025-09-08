export default {
  testEnvironment: "jsdom", // since you’re testing browser-like code
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js"],
};
