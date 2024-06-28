const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "public/uploads")));

// Import routes
const fileRoute = require("./routes/file.route");

// Middlewares
app.use("/api/files", fileRoute);

app.get("/", (req, res) => {
	res.render("home");
});

module.exports = { app };