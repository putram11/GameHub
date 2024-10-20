// Load environment variables in non-production environments
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000;
const express = require("express");
const routes = require("./routes/index");
const errorHandler = require("./middleware/errorhandler");
const corsOptions = require("./middleware/cors");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors(corsOptions)); // CORS options
app.use(express.json()); // JSON body parser
app.use(express.urlencoded({ extended: true })); // URL-encoded body parser
app.use(express.static("public")); // Serve static files

// Routes
app.use(routes);

// Centralized error handling
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Running on port ${port}`));

module.exports = app;
