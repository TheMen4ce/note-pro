import {default as model} from "./model.js";

; (function () {
    function init() {
        changeStyle(model.config.style);
        document.getElementById("style-selector").value = model.config.style;
        document.getElementById("btn-sort-" + model.config.sort).className = "active";
        document.getElementById("style-selector").addEventListener("change", (event) => changeStyle(event.target.value))
        document.addEventListener("click", (event) => handleClick(event));

        if (model.config.showFinished) document.getElementById("btn-showFinished").className += " active";
        updateVm();
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
        render(model.notes);
    }

    function toggleShowFinished() {
        // TODO: make finished look like: todo 'in for days' and done 'a year ago'
        model.toggleShowFinished();
        document.getElementById("btn-showFinished").classList.toggle("active");
        updateVm();
    }

    function sortBy(sortType) {
        document.getElementById("btn-sort-" + model.config.sort).className = "";
        model.setSortType(sortType);
        document.getElementById("btn-sort-" + sortType).className = "active";
        updateVm();
    }

    function createNote(){
        model.createNote();
        render(model.notes);
    }

    function deleteNote(noteId){
        model.deleteNote(noteId);
        render(model.notes);
    }

    function saveNote(noteId){
        let title = document.querySelector(`.note-${noteId} #note-title`).value;
        let content = document.querySelector(`.note-${noteId} #note-content`).value;
        let finishDate = document.querySelector(`.note-${noteId} #note-finishDate`).value;
        model.saveNote(noteId, title, content, finishDate);
        toggleEdit(noteId);
        render(model.notes);
    }

    function toggleEdit(noteId){
        toggleHide(noteId, "edit-off");
        toggleHide(noteId, "edit-on");
    }

    function toggleHide(noteId, clazz){
        Array.from(document.querySelectorAll(`.note-${noteId} .${clazz}`), (ele) => ele.classList.toggle('hidden'));
    }

    function rate(noteId, importance) {
        model.setImportance(noteId, importance)
        render(model.notes);
    }

    /**
     * VIEW
     */
    function updateVm() {
        let notesVm = model.config.showFinished ? model.notes : model.notes.filter((note) => { return !note.finished; });
        notesVm = notesVm.sort((a, b) => {
            return a[model.config.sort] > b[model.config.sort];
        });
        render(notesVm);
    }

    function render(notesVm) {
        let notesTemplateText = document.getElementById("notesTemplate").textContent;
        let notesHtml = Handlebars.compile(notesTemplateText);
        document.getElementById("notes-content").innerHTML = notesHtml({ notes: notesVm });
    }
})();