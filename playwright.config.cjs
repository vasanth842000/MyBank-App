// playwright.config.js
module.exports = {
  testDir: 'tests', // Specify the test directory
  retries: 1, // Number of retries for failed tests
  timeout: 30000, // Timeout for each test in ms
  use: {
    headless: false, // Show the browser UI during tests (set to true for CI)
  },
};
