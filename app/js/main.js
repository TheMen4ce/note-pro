$('.style-selector').change(function(){
    let stylesrc = '/css/style/'+$(this).val()+'.css';
    $('#style-css').attr('href',stylesrc);
})

$('.btn-expand').click(function (btn) {
    $(this).toggleClass('clicked');
    $(this).parent().parent().parent().find('.expandable').toggleClass('expanded', [2]);
});

$('.btn-edit').click(function () {
    $('.expandable').focus();
});