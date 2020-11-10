"use strict";

$(document).ready(function() {
    $("a").click(function(event) {
        sessionStorage.setItem("initialCategory", event.target.id);
    });
});


