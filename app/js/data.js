let notePro = localStorage.notePro ? JSON.parse(localStorage.notePro) : { notes: [] };

function getAllNotes() {
    return notePro.notes;
}

function getConfig() {
    return notePro.config;
}

function saveNotes(notes) {
    notePro.notes = notes;
    persist();
}

function saveConfig(config) {
    notePro.config = config;
    persist();    
}

function persist(){
    localStorage.notePro = JSON.stringify(notePro);
}

export default { getConfig, getAllNotes, saveConfig, saveNotes };