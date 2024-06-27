const express = require("express");
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Import routes
const fileRoute = require("./routes/file.route");

// Middlewares
app.use("/api/files", fileRoute);

app.get("/", (req, res) => {
	res.send("Hello");
});

module.exports = { app };