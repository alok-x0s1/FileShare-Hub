const { v4: uuid4 } = require("uuid");
const File = require("../models/file.model");
const path = require("path");
const sendMail = require("../services/sendEmail");
const emailTemplet = require("../services/emailTemplet");

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

const sendEmail = async (req, res) => {
	const { uuid, emailTo, emailFrom } = req.body;
	if (!uuid || !emailFrom || !emailTo) {
		return res.status(422).send({ message: "All fields are required" });
	}

	const file = await File.findOne({ uuid });
	if (file.sender) {
		return res.status(422).send({ message: "Email sent already." });
	}
	file.sender = emailFrom;
	file.receiver = emailTo;

	const response = await file.save();

	sendMail({
		from: emailFrom,
		to: emailTo,
		subject: "FileShare-hub",
		text: `${emailFrom} share a file with you.`,
		html: emailTemplet({
			emailFrom: emailFrom,
			downloadLink: `${process.env.APP_BASE_URL}/api/files/download/${response.uuid}`,
			fileSize: (file.filesize / (1024 * 1024)).toFixed(2),
			expiresIn: "24h",
		}),
	});

	return res.send({ message: "Email sent.", success: true });
};

module.exports = {
	uploadFile,
	downloadFilePage,
	downloadFile,
	sendEmail,
};