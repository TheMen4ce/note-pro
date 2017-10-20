import {default as notesDb} from './data.js'

const notes = notesDb.getAllNotes();
let config = notesDb.getConfig();

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

init();

function init(){
    if(!notes.length){
        notes.push(new Note("Init note", "Mach mal öppis"))
        saveNotes();
    }
    
    if(!config){
        config = new Config();
        saveConfig();
    }
}
/**
 * CONFIG
 */
function saveConfig(){
    notesDb.saveConfig(config);
}

function setStyle(style){
    config.style = style;
    saveConfig();
}

function setSortType(sortType){
    config.sort = sortType;
    saveConfig();
}

/**
 * NOTES
 */
function getId(){
    for(let i = 0; i< 1000; i++){
        if (!notes.some((note) => {return note.id === i})) return i; 
    }
    alert("You have reached the maximum amounts of notes!") 
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

function setImportance(noteId,importance){
    let note = findById(noteId);
    note.importance = importance;
    saveNotes();
}

function toggleShowFinished(){
    config.showFinished = !config.showFinished;
    saveConfig();
}

export default {
    config: config,
    notes: notes,
    toggleFinished,
    toggleShowFinished,
    setStyle,
    setSortType,
    setImportance
};