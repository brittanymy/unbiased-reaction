// Establish routes
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.static("public")); 
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// Listen log
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});