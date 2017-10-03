'use strict';

function init(){
    if(localStorage.style){
        changeStyle(localStorage.style);
    }
}
init();

function changeStyle(style){
    $('#style-css').attr('href','/css/style/'+style+'.css');
    localStorage.style = style;
}

$('.style-selector').change(function(){
    changeStyle($(this).val());
})

$('.btn-expand').click(function (btn) {
    $(this).toggleClass('clicked');
    $(this).parent().parent().parent().find('.expandable').toggleClass('expanded', [2]);
});

$('.btn-edit').click(function () {
    $('.expandable').focus();
});