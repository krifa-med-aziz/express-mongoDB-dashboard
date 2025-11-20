const express = require("express");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const path = require("path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const app = express();
const port = 5000;

const customerRouter = require("./src/routes/customerRoutes.js");

// Livereload setup
const liveReloadServer = livereload.createServer();
liveReloadServer.watch([
  path.join(__dirname, "public"),
  path.join(__dirname, "views"),
]);

// Connect livereload middleware (must be before routes)
app.use(connectLivereload());
app.use(express.json());

// Custom Route middleware
app.use("/api/customers", customerRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Trigger refresh on connection
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
