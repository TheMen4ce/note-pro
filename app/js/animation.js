'use strict';

$('.btn-expand').click(function (btn) {
    $(this).toggleClass('clicked');
    $(this).parent().parent().parent().find('.note-text').toggleClass('expanded', [2]);
});

$('.btn-edit').click(function () {
    $('.note-text').focus();
});