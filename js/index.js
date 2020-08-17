$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "php/start.php"
    });

    $("a").click(function(event) {
        document.cookie = "menuId=" + event.target.id + ";";
    });
});


