let notePro = localStorage.notePro ? JSON.parse(localStorage.notePro) : {};
let baseUrl = "http://127.0.0.1:5000/";

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
    return fetch(baseUrl + "notes")
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

    return fetch(baseUrl + "notes/" + note._id, fetchData)
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

    return fetch(baseUrl + "notes", fetchData)
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        });
}


function deleteNote(noteId) {
    return fetch(baseUrl + "notes/" + noteId, {method: "DELETE"})
        .then((resp) => resp.json())
        .then((data) => {
            return data;
        });
}

export default {getConfig, getAllNotes, saveConfig, updateNote, deleteNote, createNote};