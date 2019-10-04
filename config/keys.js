// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === "production") {
  // we are in production. Return prod set of keys.
  module.exports = require("./prod");
} else {
  // we are in development. Return dev set of keys.
  module.exports = require("./dev");
}
