import {default as notesDb} from './data.js'

const notes = notesDb.getAllNotes();
const config = notesDb.getConfig();


init();

class Note {
    constructor(title,content){
        this.id = getId();
        this.finished = false;
        this.importance = 3,
        this.title = title;
        this.content = content;
        this.finishDate = new Date();
        this.createdDate = new Date();
    }
}

class Config {
    constructor(){
        this.style = "pink";
        this.sort = "importance";
        this.showFinished = true;
    }
}

function init(){
    if(!notes.length){
        notes.push(new Note("Init note", "Mach mal öppis"))
        saveNotes();
    }
    
    if(!config){
        notesDb.saveConfig(new Config());
    }
}

function saveNotes(){
    notesDb.saveNotes(notes);
}

function findById(noteId) {
    return notes.find((note) => {
        return note.id == noteId;
    })
}

function toggleFinished(noteId){
    let note = findById(noteId);
    note.finished = !note.finished;
    saveNotes();
}

export default {
    config: config,
    notes: notes,
    toggleFinished
};