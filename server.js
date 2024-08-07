require("dotenv").config();

const { connectDB } = require("./db/db");
const { app } = require("./app");

const PORT = process.env.PORT || 8000;

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is started at port : ${PORT}`);
		});
	})
	.catch((error) => {
		console.log("mongoDb connection failed !!", error);
	});
