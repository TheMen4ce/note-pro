import {default as model} from "./model.js";

; (function () {
    let notesTemplate = document.getElementById('notes-template').innerText;
    let noteTemplate = document.getElementById("note-template").innerText;
    let cssTemplate = document.getElementById("css-template").innerText;

    let notesList = document.getElementById("notes-list");
    let style = document.getElementById("style");

    let notesVm;

    function init() {
        changeStyle(model.config.style);
        let styleSelector = document.getElementById("style-selector");
        styleSelector.addEventListener("change", (event) => changeStyle(event.target.value))
        styleSelector.value = model.config.style;

        document.getElementById("btn-sort-" + model.config.sort).className = "active";
        document.addEventListener("click", (event) => handleClick(event));

        if (model.config.showFinished) document.getElementById("btn-showFinished").className += " active";

        Handlebars.registerPartial("note", noteTemplate);
        createNoteContainers();
        renderNotes();
    }
    init();  

    function handleClick(event){
        switch(event.target.id){
            case "cbx-finished": 
                toggleFinished(event.target.dataset.noteId);
                break;
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
        if(event.target.classList.contains("importance")){
            rate(event.target.dataset.noteId, event.target.dataset.rate);
        }
    }

    function changeStyle(style) {
        document.getElementById("style-css").setAttribute("href", "/css/style/" + style + ".css");
        model.setStyle(style);
    }

    function toggleFinished(noteId) {
        model.toggleFinished(noteId);
        model.config.showFinished || toggleHide(`#note-${noteId}`); // TODO maybe fade out?
        renderNotes();
    }

    function toggleShowFinished() {
        // TODO: make finished looklike: todo 'in for days' and done 'a year ago'
        model.toggleShowFinished();
        document.getElementById("btn-showFinished").classList.toggle("active");
        renderNotes();
    }

    function sortBy(sortType) {
        document.getElementById("btn-sort-" + model.config.sort).className = "";
        model.setSortType(sortType);
        document.getElementById("btn-sort-" + sortType).className = "active";
        renderNotes();
    }

    function createNote(){
        model.createNote(); // TODO return created note from model, add it to the DOM, focus element
        createNoteContainers();
        renderNotes();
    }

    function deleteNote(noteId){
        model.deleteNote(noteId);
        createNoteContainers();
        renderNotes();
    }

    function saveNote(noteId){
        let title = document.querySelector(`#note-${noteId} #note-title`).value;
        let content = document.querySelector(`#note-${noteId} #note-content`).value;
        let finishDate = document.querySelector(`#note-${noteId} #note-finishDate`).value;
        model.saveNote(noteId, title, content, finishDate);
        toggleEdit(noteId);
        renderNotes();
    }

    function toggleEdit(noteId){
        toggleHide(`#note-${noteId} .edit-off`);
        toggleHide(`#note-${noteId} .edit-on`);
        positionNotes();
    }

    function toggleHide(selector){
        Array.from(document.querySelectorAll(selector), (ele) => ele.classList.toggle('hidden'));
    }

    function rate(noteId, importance) {
        model.setImportance(noteId, importance)
        renderNotes();
    }

    /**
     * VIEW
     */
    function sortNotes(a, b) {
        let sort = model.config.sort;
        return sort === "finishDate" ? a[sort] > b[sort] : a[sort] < b[sort];
    }

    function createNoteContainers(){
        notesVm = model.notes;
        notesList.innerHTML = Handlebars.compile(notesTemplate)(notesVm);
    }

    function renderNotes() {
        notesVm.sort(sortNotes).forEach(function (note, index) {
            let li = document.getElementById('note-' + note.id);
            let hidden = !model.config.showFinished && note.finished ? "hidden" : "";
            li.className = `note index-${index} ${hidden}`;
            li.innerHTML = Handlebars.compile(noteTemplate)(note);
        })
        positionNotes()
    }

    function positionNotes() {
        style.innerHTML = Handlebars.compile(cssTemplate)(model.notes);
    }
})();