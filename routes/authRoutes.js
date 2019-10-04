const passport = require("passport");

module.exports = app => {
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

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
