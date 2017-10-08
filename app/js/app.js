var notesDb = [
    {
        id: 1,
        finished: false,
        importance: 1,
        title: "Das ist der Title",
        content: "Sali s'eint, sali s'ander, fertig lustig!",
        finishDate: new Date(2017, 10, 09),
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

function sortBy(sortType) {
    notesVm = notesDb.sort((a, b) => {
        return a[sortType] < b[sortType];
    });
    render();
}

function rate(noteId, importance) {
    let note = findNote(noteId);
    note.importance = importance;
    render();
}

function findNote(noteId) {
    return notesDb.find((note) => {
        return note.id == noteId;
    })
}

function render() {
    let notesTemplateText = document.getElementById('notesTemplate').textContent;
    let notesHtml = Handlebars.compile(notesTemplateText);
    document.getElementById('notes-content').innerHTML = notesHtml({ notes: notesVm });
}

var notesVm;
sortBy('importance');