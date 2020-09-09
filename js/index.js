$(document).ready(function() {
    $("a").click(function(event) {
        sessionStorage.setItem("initialCategory", event.target.id);
        document.cookie = "menuId=" + event.target.id + ";";
    });
});


