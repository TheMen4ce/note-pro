const express = require('express');
const router = express.Router();
const controller = require('../controller/notesController.js');

router.get("/notes", controller.getNotes);
router.post("/notes", controller.createNote);
router.put("/notes/:id/", controller.updateNote);
router.delete("/notes/:id/", controller.deleteNote);

module.exports = router;