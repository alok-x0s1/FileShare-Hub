const File = require("../models/file.model");
const fs = require("fs");

async function deleteFileAfter24() {
	const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24);
	const files = await File.find({
		createdAt: {
			$lt: pastDate,
		},
	});

	if (files.length) {
		for (const file of files) {
			try {
				fs.unlinkSync(file.pathname);
				await file.remove();
				console.log(`Successfully deleted ${file.filename}`);
			} catch (error) {
				console.log(`Error while deleting the file ${error}`);
			}
		}
		console.log("Job DONE...");
	}
}

module.exports = deleteFileAfter24;