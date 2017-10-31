let notePro = localStorage.notePro ? JSON.parse(localStorage.notePro) : {};

/**
 * CONFIG
 */
function getConfig() {
    return notePro.config;
}

function saveConfig(config) {
    notePro.config = config;
    localStorage.notePro = JSON.stringify(notePro);
}

/**
 * NOTES
 */
function getAllNotes() {
    return fetch("notes")
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        });
}


function updateNote(note) {
    let fetchData = {
        method: "PUT",
        body: JSON.stringify(note),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
        }
    };

    return fetch("notes/" + note._id, fetchData)
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        });
}

function createNote() {
    let fetchData = {
        method: "POST",
        body: JSON.stringify({content: "Please add some content", title: "Title"}),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
        }
    };

    return fetch("notes", fetchData)
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        });
}


function deleteNote(noteId) {
    return fetch("notes/" + noteId, {method: "DELETE"})
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        });
}

export default {getConfig, getAllNotes, saveConfig, updateNote, deleteNote, createNote};