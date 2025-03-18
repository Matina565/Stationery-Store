const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config();

const app = express();

// Static file serving setup
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8081"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Stationery Store API" });
});

// Routes
require("./app/routes/product.routes")(app);
require("./app/routes/stationery.routes")(app);
require("./app/routes/rating.routes")(app);
require("./app/routes/upload.routes")(app);
// require("./app/routes/dashboard.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});