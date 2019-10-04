const mongoose = require("mongoose");
const { Schema } = mongoose; // destructure the object

const userSchema = new Schema({
  googleId: String
});

mongoose.model("users", userSchema);
