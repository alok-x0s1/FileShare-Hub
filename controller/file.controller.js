const { v4: uuid4 } = require("uuid");
const File = require("../models/file.model");
const path = require("path");

const uploadFile = async (req, res) => {
	if (!req.file) {
		return res.status(500).send({ error: "File is required." });
	}

	try {
		const file = new File({
			filename: req.file.filename,
			pathname: req.file.path,
			filesize: req.file.size,
			uuid: uuid4(),
		});
		const response = await file.save();

		if (!response) {
			return res.status(500).send({ message: "Error while creating file" });
		}

		return res.json({
			fileLink: `${process.env.APP_BASE_URL}/api/files/download/${response.uuid}`,
		});
	} catch (error) {
		return res
			.status(500)
			.send({ error: error, message: "Internal server error" });
	}
};

const downloadFilePage = async (req, res) => {
	try {
		const { uuid } = req.params;
		const file = await File.findOne({ uuid });

		if (!file) {
			return res.status(404).send({ message: "File has been deleted." });
		}

		res.render("download", {
			filename: file.filename,
			filesize: (file.filesize / (1024 * 1024)).toFixed(2),
			uuid: file.uuid,
		});
	} catch (error) {
		return res
			.status(500)
			.send({ message: "Internal server error", error: error.message });
	}
};

const downloadFile = async (req, res) => {
	const { uuid } = req.params;
	try {
		const file = await File.findOne({ uuid });
		if (!file) {
			return res.status(404).send({ message: "File has been deleted." });
		}

		const filePath = path.join(__dirname, "../public/uploads", file.filename);
		res.download(filePath, (err) => {
			if (err) {
				console.log("Error while downloading the file.");
				return res
					.status(500)
					.send({ message: "Error while downloading the file" });
			}
		});
	} catch (error) {
		return res
			.status(500)
			.send({ message: "Internal server error", error: error.message });
	}
};

module.exports = {
	uploadFile,
	downloadFilePage,
	downloadFile,
};