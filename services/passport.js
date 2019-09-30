const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");

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
