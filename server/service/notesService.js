const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

class Note {
    constructor(title,content){
        this.finished = false;
        this.importance = "3";
        this.title = title;
        this.content = content;
        this.finishDate = new Date();
        this.createdDate = new Date();
    }
}

const notesService = {};

notesService.createNote = (title, content, callback) => {
    let note = new Note(title, content);
    db.insert(note, (err, newDoc) => {
        callback(newDoc);
    });
};

notesService.deleteNote = (id, callback) => {
    db.remove({ _id: id }, {}, (err, numRemoved) => {
        callback(numRemoved);
    });
};

getNote = (id, callback) => {
    db.findOne({ _id: id }, (err, doc) => {
        callback(doc);
    });
};

notesService.updateNote = (id, updatedNote, callback) => {
    getNote(id, (dbNote) => {
        db.update(dbNote, updatedNote, {}, (err, numReplaced) => {
            callback(numReplaced);
        })
    })
};

notesService.getNotes = (callback) => {
    db.find({}, (err, docs) => {
        callback(docs);
    });
};

module.exports = notesService;