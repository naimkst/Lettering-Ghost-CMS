"use strict";
$(document).ready(function () {


    /*------------ Start site menu  ------------*/

    // Start sticky header
    $(window).on('scroll', function () {
        if ($(window).scrollTop() >= 150) {
            $('#sticky-header').addClass('sticky-menu');
        } else {
            $('#sticky-header').removeClass('sticky-menu');
        }
    });

    $('.caouse-module-card > .card-header > .btn').on('click', function () {
        $(this).addClass('caouse-module-card-open').removeClass('collapsed');
    });




});