$(document).ready(function () {
    // .js-button-campaign и .js-button-campaign2 - классы присвоенный кнопкам "Купить билеты". .js-overlay-campaign - класс присвоенный всплывающему окну. Все стили для всплывающего окна прописаны в файле css/modal_window.css
    $('.js-button-campaign').click(function (ev) {
        ev.preventDefault();
        $('.js-overlay-campaign').fadeIn();
    });

    $('.js-button-campaign2').click(function (ev) {
        ev.preventDefault();
        $('.js-overlay-campaign').fadeIn();
    });

    // закрыть на крестик
    $('.js-close-campaign').click(function () {
        $('.js-overlay-campaign').fadeOut();

    });

    // закрыть по клику вне окна
    $(document).mousedown(function (e) {
        var popup = $('.js-popup-campaign');
        if (e.target != popup[0] && popup.has(e.target).length === 0) {
            $('.js-overlay-campaign').fadeOut();

        }
    });

});
