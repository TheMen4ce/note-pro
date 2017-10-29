Handlebars.registerHelper("dateFormat", (date) => {
    return moment(date).fromNow();
});

Handlebars.registerHelper("dateFormatShort", (date) => {
    return moment(date).format("YYYY-MM-DD");
});

Handlebars.registerHelper("importance", (id, importance) => {
    let importanceHtml = "";
    for (let i = 5; i > 0; i--) {
        importanceHtml += i <= importance ? getImportanceHtml("on", id, i) : getImportanceHtml("off", id, i);
    }
    return importanceHtml;
});

Handlebars.registerHelper("attr", (setAttr, attr) => {
    return setAttr ? attr : "";
});

function getImportanceHtml(type, noteId, rate) {
    return `<i class="importance importance-${type}" data-note-id="${noteId}" data-rate="${rate}"></i>`
}

Handlebars.registerHelper('calcTranslateY', (index) => {
    let distanceFromTop = 0;
    for (let i = 0; i < index; i++) {
        let aboveNote = document.querySelector(`.index-${i}:not(.hidden)`);
        if (aboveNote) distanceFromTop += aboveNote.clientHeight + 40;
    }
    return distanceFromTop;
});