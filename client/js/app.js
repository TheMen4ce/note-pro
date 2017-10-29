import {default as model} from "./model.js";

(function () {
    let notesTemplate = document.getElementById('notes-template').innerText;
    let noteTemplate = document.getElementById("note-template").innerText;
    let cssTemplate = document.getElementById("css-template").innerText;

    let notesList = document.getElementById("notes-list");
    let style = document.getElementById("style");

    let notesVm;

    function init() {
        changeStyle(model.config.style);
        let styleSelector = document.getElementById("style-selector");
        styleSelector.addEventListener("change", (event) => changeStyle(event.target.value));
        styleSelector.value = model.config.style;

        document.getElementById("btn-sort-" + model.config.sort).className = "active";
        document.addEventListener("click", (event) => handleClick(event));

        if (model.config.showFinished) document.getElementById("btn-showFinished").className += " active";

        Handlebars.registerPartial("note", noteTemplate);
        createNoteContainers();
    }

    init();

    function handleClick(event) {
        switch (event.target.id) {
            case "cbx-finished":
                toggleFinished(event.target.dataset.noteId);
                break;
            case "btn-sort-finishDate":
                sortBy("finishDate");
                break;
            case "btn-sort-importance":
                sortBy("importance");
                break;
            case "btn-sort-createdDate":
                sortBy("createdDate");
                break;
            case "btn-showFinished":
                toggleShowFinished();
                break;
            case "btn-create":
                createNote();
                break;
            case "btn-cancel":
            case "btn-edit":
                toggleEdit(event.target.dataset.noteId);
                break;
            case "btn-save":
                saveNote(event.target.dataset.noteId);
                break;
            case "btn-delete":
                deleteNote(event.target.dataset.noteId);
                break;
        }
        if (event.target.classList.contains("importance")) {
            rate(event.target.dataset.noteId, event.target.dataset.rate);
        }
    }

    function changeStyle(style) {
        document.getElementById("style-css").setAttribute("href", "/css/style/" + style + ".css");
        model.setStyle(style);
    }

    function toggleFinished(noteId) {
        let note = findById(noteId);
        note.finished = !note.finished;
        model.updateNote(note).then((updatedNote) => {
            note = updatedNote;
            model.config.showFinished || toggleHide(`#note-${noteId}`);
            sortAndRenderNotes();
        });
    }

    function toggleShowFinished() {
        model.toggleShowFinished();
        document.getElementById("btn-showFinished").classList.toggle("active");
        sortAndRenderNotes();
    }

    function sortBy(sortType) {
        document.getElementById("btn-sort-" + model.config.sort).className = "";
        model.setSortType(sortType);
        document.getElementById("btn-sort-" + sortType).className = "active";
        sortAndRenderNotes();
    }

    function createNote() {
        model.createNote().then((newNote) => {
            notesVm.unshift(newNote);
            renderNewNote(note);
            toggleEdit(newNote._id);
            let title = document.querySelector(`#note-${newNote._id} #note-title`);
            title.focus();
            title.select();
        });
    }

    function deleteNote(noteId) {
        model.deleteNote(noteId).then(() => {
            notesVm.splice(notesVm.indexOf(findById(noteId)),1);
            renderAll();
        });
    }

    function saveNote(noteId) {
        let note = findById(noteId);
        note.title = document.querySelector(`#note-${noteId} #note-title`).value;
        note.content = document.querySelector(`#note-${noteId} #note-content`).value;
        note.finishDate = document.querySelector(`#note-${noteId} #note-finishDate`).value;

        model.updateNote(note).then((updatedNote) => {
            note = updatedNote;
            toggleEdit(noteId);
            sortAndRenderNotes();
        });
    }

    function toggleEdit(noteId) {
        toggleHide(`#note-${noteId} .edit-off`);
        toggleHide(`#note-${noteId} .edit-on`);
        positionNotes();
    }

    function toggleHide(selector) {
        Array.from(document.querySelectorAll(selector), (ele) => ele.classList.toggle('hidden'));
    }

    function rate(noteId, importance) {
        let note = findById(noteId);
        note.importance = importance;
        model.updateNote(note).then((updatedNote) => {
            note = updatedNote;
            sortAndRenderNotes();
        });
    }

    // private
    function findById(noteId) {
        return notesVm.find((note) => {
            return note._id === noteId;
        })
    }

    /**
     * VIEW
     */
    function sortNotes(a, b) {
        let sort = model.config.sort;
        return sort === "finishDate" ? a[sort] > b[sort] : a[sort] < b[sort];
    }

    function createNoteContainers() {
        model.getAllNotes().then((notes) => {
            notesVm = notes;
            renderAll();
        });
    }

    function renderAll() {
        notesList.innerHTML = Handlebars.compile(notesTemplate)(notesVm);
        sortAndRenderNotes();
    }

    function sortAndRenderNotes() {
        notesVm.sort(sortNotes);
        renderNotes();
    }

    function renderNotes(){
        notesVm.forEach(function (note, index) {
            let li = document.getElementById('note-' + note._id);
            renderNote(li, note, index);
        });
        positionNotes()
    }

    function renderNote(ele, note, index){
        let hidden = !model.config.showFinished && note.finished ? "hidden" : "";
        ele.className = `note index-${index} ${hidden}`;
        ele.innerHTML = Handlebars.compile(noteTemplate)(note);
    }

    function renderNewNote(note) {
        let li = document.createElement("li");
        li.setAttribute("id", "note-"+note._id);
        document.getElementById("notes-list").appendChild(li);
        renderNotes();
    }

    function positionNotes() {
        style.innerHTML = Handlebars.compile(cssTemplate)(notesVm);
    }
})();