const express = require("express");
const { uploadFile } = require("../middleware/file.middleware");
const upload = require("../middleware/multer.middleware");
const router = express.Router();

router.route("/").post(upload.single("myFile"), uploadFile)
router.get("/", (req, res) => {
    res.send("Hello")
})

module.exports = router;