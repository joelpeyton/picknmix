import { updatePage } from "./utils.js";
import { updateCart } from "./cart.js";

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "php/getDatabase.php"
    })
    .done(function(records) {
        let initialCategory = sessionStorage.initialCategory;

        if (initialCategory) {
            updatePage(records, initialCategory);
        }

        $("#menuLinks").click(function(event) {
            if (event.target.id === "cart") {
                let cart = sessionStorage.cart ? sessionStorage.cart.split(",") : [];
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
                document.getElementById("checkout").style.display = "none";
            }
        });
    })
    .fail(function() {
        alert("Error: Unable to return database");
    });    
});

        
        