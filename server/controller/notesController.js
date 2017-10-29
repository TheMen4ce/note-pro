const notesService = require("../service/notesService.js");

const notesController = {};

notesController.getNotes = (req, res) => {
    notesService.getNotes((notes) => {
        res.json(notes);
    });
};

notesController.createNote = (req, res) => {
    notesService.createNote(req.body.title, req.body.content, (note) => {
        res.json(note);
    });
};

notesController.updateNote = (req, res) => {
    notesService.updateNote(req.params.id, req.body, (numReplaced) => {
        res.json(numReplaced);
    });
};

notesController.deleteNote = (req, res) => {
    notesService.deleteNote(req.params.id, (numRemoved) => {
        res.json(numRemoved);
    });
};

module.exports = notesController;