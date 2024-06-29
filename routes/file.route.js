const express = require("express");
const {
	uploadFile,
	downloadFilePage,
    downloadFile,
	sendEmail,
} = require("../controller/file.controller");
const upload = require("../middleware/multer.middleware");
const router = express.Router();

router.route("/").post(upload.single("myFile"), uploadFile);
router.route("/download/:uuid").get(downloadFilePage);
router.route("/:uuid").get(downloadFile);
router.route("/send").post(sendEmail);

module.exports = router;