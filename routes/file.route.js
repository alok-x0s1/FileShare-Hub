const express = require("express");
const {
	uploadFile,
	downloadFilePage,
    downloadFile,
} = require("../middleware/file.middleware");
const upload = require("../middleware/multer.middleware");
const router = express.Router();

router.route("/").post(upload.single("myFile"), uploadFile);
router.route("/download/:uuid").get(downloadFilePage);
router.route("/:uuid").get(downloadFile);

module.exports = router;