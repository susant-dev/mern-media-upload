require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productsRoute = require("./src/modules/products/products-routes");
const connectDB = require("./src/shared/middlewares/connect-db");

const server = express();

const port = process.env.SERVER_PORT;
const hostname = process.env.SERVER_HOST;

server.use(cors());

// built-in middlewares to parse request body in application-level
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Add the connectDB middleware in application-level, before defining routes.
server.use(connectDB);

// Mount all the routes
server.use(productsRoute);

// error-handling middleware to logs the error for debugging.
server.use((error, req, res, next) => {
  console.log(error);
  res.status(500).send({ errorMessage: "Oops! Internal server error!" });
});

// Middleware to handle route not found error.
server.use((req, res, next) => {
  res
    .status(404)
    .send({ errorMessage: `404! ${req.method} ${req.path} Not Found.` });
});

server.listen(port, hostname, (error) => {
  if (error) console.log(error.message);
  else console.log(`Server running on http://${hostname}:${port}`);
});
