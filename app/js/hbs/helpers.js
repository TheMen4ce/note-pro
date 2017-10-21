Handlebars.registerHelper("dateFormat", function (date) {
    return moment(date).fromNow();
});

Handlebars.registerHelper("dateFormatShort", function (date) {
    return moment(date).format("YYYY-MM-DD");
});

Handlebars.registerHelper("importance", function (id, importance) {
    let importanceHtml = "";
    for (let i = 5; i > 0; i--) {
        importanceHtml += i <= importance ? getImportanceHtml("on", id, i) : getImportanceHtml("off", id, i);
    }
    return importanceHtml;
});

Handlebars.registerHelper("attr", function (setAttr, attr) {
    return setAttr ? attr : "";
});

function getImportanceHtml(type, noteId, rate) {
    return `<i class="importance importance-${type}" data-note-id="${noteId}" data-rate="${rate}"></i>`
}