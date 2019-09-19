const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

// If we run in Heroku, it will use process.env.PORT
// If we run it locally, it will be defaulted to port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
