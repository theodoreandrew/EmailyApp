const key = require("../config/keys");
const stripe = require("stripe")(key.stripeSecretKey);
const requrireLogin = require("../middleware/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requrireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id
    });

    // req.user set up automatically by passport
    req.user.credits += 5;

    // We create this variable user to persist the newest version of user's model
    const user = await req.user.save();

    res.send(user);
  });
};
