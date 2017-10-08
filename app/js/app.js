var notes = [
    {
        id: 1,
        finished: false,
        rating: 1,
        title: "Das ist der Title",
        content: "Sali s'eint, sali s'ander, fertig lustig!",
        doDate: new Date()
    },
    {
        id: 2,
        finished: true,
        rating: 3,
        title: "Am Mami helfe poschtä",
        content: "Alüte, fräge wies gaht, alli Läde abklappere, etc.",
        doDate: new Date(2017,10,23)
    },
    {
        id: 3,
        finished: false,
        rating: 4,
        title: "Über d'Strass laufe",
        content: "Luege, Lose, Laufe! hähä",
        doDate: new Date(2017,12,13)
    }
];

function rate(noteId, rating) {
    let note = findNote(noteId);
    note.rating = rating;
    render();
}

function findNote(noteId){
    return notes.find((note) => {
        return note.id == noteId;
    })
}

function render() {
    let notesTemplateText = document.getElementById('notesTemplate').textContent;
    let notesHtml = Handlebars.compile(notesTemplateText);
    document.getElementById('notes-content').innerHTML = notesHtml({ notes: notes });
}

render();