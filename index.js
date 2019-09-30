const express = require("express");
require("./services/passport"); // This function does not return anything

const app = express();

// This will execute function in authRoutes.js with app as the argument.
require("./routes/authRoutes")(app);

// If we run in Heroku, it will use process.env.PORT
// If we run it locally, it will be defaulted to port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
