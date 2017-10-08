'use strict';

var notePro;
function init() {
    if (!localStorage.notePro) {
        notePro = {
            config: {
                style: 'pink',
                sort: 'importance',
                showFinished: true
            }
        };
        localStorage.notePro = JSON.stringify(notePro);
    }else{
        notePro = JSON.parse(localStorage.notePro);
    }

    changeStyle(notePro.config.style);
    document.getElementById('style-selector').value = notePro.config.style;
}
init();

function changeStyle(style) {
    $('#style-css').attr('href', '/css/style/' + style + '.css');
    notePro.config.style = style;
}

$('#style-selector').change(function () {
    changeStyle($(this).val());
})

$('.btn-expand').click(function (btn) {
    $(this).toggleClass('clicked');
    $(this).parent().parent().parent().find('.note-text').toggleClass('expanded', [2]);
});

$('.btn-edit').click(function () {
    $('.note-text').focus();
});