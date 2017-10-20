import {default as model} from './model.js';

; (function () {
    function init() {
        changeStyle(model.config.style);
        document.getElementById('style-selector').value = model.config.style;
        document.getElementById("btn-sort-" + model.config.sort).className = 'active';
        if (model.config.showFinished) document.getElementById("btn-showFinished").className += ' active';
        updateVm();

        $(document).on("click", "input[data-note-id]", handleToggleFinished);
    }
    init();

    function changeStyle(style) {
        $('#style-css').attr('href', '/css/style/' + style + '.css');
        model.config.style = style;
    }

    $('#style-selector').change(function () {
        changeStyle($(this).val());
    })

    function handleToggleFinished(event) {
        let target = $(event.target);
        let noteId = Number(target.data("note-id"));

        if (!isNaN(noteId)) {
            model.toggleFinished(noteId);
            render();
        }
    }

    function updateVm() {
        model.notes = model.config.showFinished ? model.notes : model.notes.filter((note) => { return !note.finished; });
        model.notes = model.notes.sort((a, b) => {
            return a[model.config.sortType] < b[model.config.sortType];
        });
        render();
    }

    function toggleShowFinished() {
        model.config.showFinished = !model.config.showFinished;
        document.getElementById("btn-showFinished").classList.toggle('active');
        updateVm();
        saveDb();
    }

    function sortBy(sortType) {
        document.getElementById("btn-sort-" + model.config.sort).className = '';
        model.config.sort = sortType;
        document.getElementById("btn-sort-" + sortType).className = 'active';
        updateVm();
        saveDb();
    }

    function rate(noteId, importance) {
        let note = findById(noteId);
        note.importance = importance;
        render();
        saveDb();
    }

    function render() {
        let notesTemplateText = document.getElementById('notesTemplate').textContent;
        let notesHtml = Handlebars.compile(notesTemplateText);
        document.getElementById('notes-content').innerHTML = notesHtml({ notes: model.notes });
    }
})();