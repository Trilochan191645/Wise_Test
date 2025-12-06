const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
   ignoreTestFiles: [
      "**/node_modules/**"
    ]
  },
});
