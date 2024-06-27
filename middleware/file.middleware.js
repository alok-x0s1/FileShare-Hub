const { v4: uuid4 } = require("uuid");
const File = require("../models/file.model");

const uploadFile = async (req, res) => {
	if (!req.file) {
		return res.status(500).send({ error: "File is required." });
	}
	console.log("Inside route", req.file);

	try {
		const file = new File({
			filename: req.file.filename,
			pathname: req.file.path,
			filesize: req.file.size,
			uuid: uuid4(),
		});
		const response = await file.save();

        if(!response) {
            return res
			.status(500)
			.send({ message: "Error while creating file" });
        }

        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}`})
	} catch (error) {
		return res
			.status(500)
			.send({ error: error, message: "Internal server error" });
	}
};

module.exports = {
	uploadFile,
};
