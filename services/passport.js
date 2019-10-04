const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// Turn the user to cookie, which is user.id
passport.serializeUser((user, done) => {
  // user.id is not profile.id
  // user.id is the user object ID in mongoDB
  done(null, user.id);
});

// Turn the cookie back to user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// new GoogleStrategy creates new instance of google passport strategy
// passport.use() => generic register
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // We have this user in DB
          done(null, existingUser);
        } else {
          // Create a new user
          new User({ googleId: profile.id }).save().then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);
