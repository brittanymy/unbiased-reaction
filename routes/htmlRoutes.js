// Establish routes
const router = require("express").Router();
const path = require("path");

// HTML routes
router.get("/notes", (req, res) => {
    res.sendFile(path.json(__dirname, "../public/notes.html"));
});

router.get("/", (req, res) => {
    res.sendFile(path.json(__dirname, "../public/index.html"));
});

module.exports = router;