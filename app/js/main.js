$('.btn-expand').click(function (btn) {
    $(this).toggleClass('clicked');
    $(this).parent().parent().parent().find('.expandable').toggleClass('expanded', [2]);
});

$('.btn-edit').click(function () {
    $('.expandable').focus();
});