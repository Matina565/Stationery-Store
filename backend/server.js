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
  origin: ["http://localhost:3000", "http://localhost:8081"], // Allow both frontend and backend origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // For cookies or authentication
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
require("./app/routes/stationery.routes.js")(app);
require("./app/routes/rating.routes.js")(app);
require("./app/routes/upload.routes.js")(app);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong! Please try again later."
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop the server");
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    // If port 5000 is in use, try port 5001
    const altPort = 5001;
    console.log(`Port ${PORT} is in use, trying port ${altPort}...`);
    server.close();
    app.listen(altPort, () => {
      console.log(`Server is running on port ${altPort}`);
      console.log(`API URL: http://localhost:${altPort}`);
      console.log("Press Ctrl+C to stop the server");
    });
  } else {
    console.error(err);
  }
});
