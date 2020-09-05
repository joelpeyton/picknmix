import { getCookie, updatePage } from "./utils.js";
import { updateCart } from "./cart.js";

$(document).ready(function() {
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
                let cart = sessionStorage.cart.split(",");
                let cartRecords = []; 
                records.forEach(record => {
                    if (cart.includes(record["id"])) {
                        cartRecords.push(record);
                    }
                });
                updateCart(cartRecords);
            }

            else {
                updatePage(records, event.target.id);
            }
        });
    })
    .fail(function() {
        alert("Error: Unable to return database");
    });    
});

        
        