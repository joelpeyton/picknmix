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

        $("#db9").click(function() {
            updatePage(records, "db9");
        });
        $("#db10").click(function() {
            updatePage(records, "db10");
        });
        $("#db11").click(function() {
            updatePage(records, "db11");
        });
        $("#db12").click(function() {
            updatePage(records, "db12");
        });
        $("#db13").click(function() {
            updatePage(records, "db13");
        });
        $("#db14").click(function() {
            updatePage(records, "db14");
        });

        $("#cart").click(function() {
            $.ajax({
                type: "GET",
                url: "php/getCart.php"
            })
            .done(function(cart) {
                alert("Product ids = " + cart);
            });
        });
    })
    .fail(function() {
        alert("Error: Unable to return database");
    });    
});

        
        