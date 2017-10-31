import {default as notesDb} from "./data.js"

let config = notesDb.getConfig();

class Config {
    constructor(){
        this.style = "pink";
        this.sort = "importance";
        this.showFinished = true;
    }
}

init();

function init(){
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

function toggleShowFinished(){
    config.showFinished = !config.showFinished;
    saveConfig();
}

/**
 * NOTES
 */
function getAllNotes(){
    return notesDb.getAllNotes();
}

function updateNote(note){
    return notesDb.updateNote(note);
}

function createNote(){
    return notesDb.createNote();
}

function deleteNote(noteId){
    return notesDb.deleteNote(noteId);
}


export default {
    config,
    getAllNotes,
    toggleShowFinished,
    setStyle,
    setSortType,
    createNote,
    updateNote,
    deleteNote
};