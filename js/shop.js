import { getCookie, updatePage } from "./utils.js";

$(document).ready(function(event) {
    $.ajax({
        type: "GET",
        url: "php/getDatabase.php"
    })
    .done(function(records) {
        let menuId = getCookie("menuId");

        if (menuId) {
            updatePage(records, menuId);
        }

        $("#menuLinks").click(function(event) {
            if (event.target.id === "cart") {
                $.ajax({
                    type: "GET",
                    url: "php/getCart.php"
                })
                .done(function(cart) {
                    alert("Product ids = " + cart);
                });
            }

            else {
                updatePage(records, event.target.id);
            }
        })
    })
    .fail(function() {
        alert("Error: Unable to return database");
    });    
});

        
        