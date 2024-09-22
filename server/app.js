if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000;
// require("dotenv").config();
const express = require("express");
const routes = require("./routes/index");
const errorHandler = require("./middleware/errorhandler");
const corsOptions = require("./middleware/cors");
const app = express();
const cors = require("cors");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log("Running on port " + port));

module.exports = app;
