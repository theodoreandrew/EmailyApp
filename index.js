const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("./config/keys");

const app = express();

// new GoogleStrategy creates new instance of google passport strategy
// passport.use() => generic register
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("access token:", accessToken);
      console.log("refresh token:", refreshToken);
      console.log("profile", profile);
    }
  )
);

/**
 * Handling request when user grants permission to sign in using Google O'Auth.
 * scope => specifies to google what access should be able to be accessed.
 */
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

/**
 * This route handler has the code to be exchanged with user's profile.
 */
app.get("/auth/google/callback", passport.authenticate("google"));

// If we run in Heroku, it will use process.env.PORT
// If we run it locally, it will be defaulted to port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
