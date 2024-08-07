const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema(
	{
		filename: {
			type: String,
			required: true,
		},
		pathname: {
			type: String,
			required: true,
		},
		filesize: {
			type: Number,
			required: true,
		},
		uuid: {
			type: String,
			required: true,
		},
		sender: {
			type: String,
			required: false,
		},
		receiver: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

const File = mongoose.model("File", FileSchema);
module.exports = File;