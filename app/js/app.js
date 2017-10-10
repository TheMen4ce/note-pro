"use strict"

/**
 * TEMP DB
 */
var notesDb = [
    {
        id: 1,
        finished: false,
        importance: 1,
        title: "Das ist der Title",
        content: "Sali s'eint, sali s'ander, fertig lustig!",
        finishDate: new Date(2017, 10, 9),
        createdDate: new Date()
    },
    {
        id: 2,
        finished: true,
        importance: 3,
        title: "Am Mami helfe poschtä",
        content: "Alüte, fräge wies gaht, alli Läde abklappere, etc.",
        finishDate: new Date(2017, 10, 23),
        createdDate: new Date()
    },
    {
        id: 3,
        finished: false,
        importance: 4,
        title: "Über d'Strass laufe",
        content: "Luege, Lose, Laufe! hähä",
        finishDate: new Date(2017, 12, 13),
        createdDate: new Date()
    }
];

/**
 * TEMP GLOBALS
 */
var notePro;
var notesVm;
function init() {
    if (!localStorage.notePro) {
        notePro = {
            config: {
                style: 'pink',
                sort: 'importance',
                showFinished: true
            },
            notes: notesDb
        };
        localStorage.notePro = JSON.stringify(notePro);
    } else {
        notePro = JSON.parse(localStorage.notePro);
    }

    changeStyle(notePro.config.style);
    document.getElementById('style-selector').value = notePro.config.style;
    document.getElementById("btn-sort-" + notePro.config.sort).className = 'active';
    if(notePro.config.showFinished) document.getElementById("btn-showFinished").className += ' active';
    updateVm();
}
init();

function saveDb(){
    localStorage.notePro = JSON.stringify(notePro);
}

function changeStyle(style) {
    $('#style-css').attr('href', '/css/style/' + style + '.css');
    notePro.config.style = style;
}

$('#style-selector').change(function () {
    changeStyle($(this).val());
})

function updateVm() {
    notesVm = notePro.config.showFinished ? notePro.notes : notePro.notes.filter((note) => { return !note.finished; });
    notesVm = notesVm.sort((a, b) => {
        return a[notePro.config.sortType] < b[notePro.config.sortType];
    });
    render();
}

function toggleFinished(noteId){
    let note = findNote(noteId);
    note.finished = !note.finished;
    updateVm();
    saveDb();
}

function toggleShowFinished(){
    notePro.config.showFinished = !notePro.config.showFinished;
    document.getElementById("btn-showFinished").classList.toggle('active');
    updateVm();
    saveDb();
}

function sortBy(sortType) {
    document.getElementById("btn-sort-" + notePro.config.sort).className = '';
    notePro.config.sort = sortType;
    document.getElementById("btn-sort-" + sortType).className = 'active';
    updateVm();
    saveDb();
}

function rate(noteId, importance) {
    let note = findNote(noteId);
    note.importance = importance;
    render();
    saveDb();
}

function findNote(noteId) {
    return notePro.notes.find((note) => {
        return note.id == noteId;
    })
}

function render() {
    let notesTemplateText = document.getElementById('notesTemplate').textContent;
    let notesHtml = Handlebars.compile(notesTemplateText);
    document.getElementById('notes-content').innerHTML = notesHtml({ notes: notesVm });
}