import { getRecords } from "./utils.js";
import { updateCart } from "./cart.js";

$(document).ready(function() {
    let loader = document.querySelector(".loader");
    loader.style.display = "none"; // remove loader

    let initialCategory = sessionStorage.initialCategory;
    if (initialCategory) {
        getRecords(initialCategory);
    }

    $("#menuLinks").click(function(event) {
        if (event.target.id === "fixed") {
            // do nothing
        } 

        else if (event.target.id === "cart") {
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
            getRecords(event.target.id);
            //document.getElementById("checkout").style.display = "none";
        }

        document.getElementById("search").value = "";

    });
});

