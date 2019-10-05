const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); // give access to cookies
const passport = require("passport"); // tell passport to use the cookies
const keys = require("./config/keys");

require("./models/User");
require("./services/passport"); // This function does not return anything
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // Maximum duration cookies can last for
    keys: [keys.cookieKey] // will be used to encrypt the cookies
  })
);
app.use(passport.initialize());
app.use(passport.session());

// This will execute function in authRoutes.js with app as the argument.
require("./routes/authRoutes")(app);

app.get("/", (req, res) => {
  res.send({
    Hello: "world"
  });
});

// If we run in Heroku, it will use process.env.PORT
// If we run it locally, it will be defaulted to port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
