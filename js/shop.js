import { getRecords } from "./utils.js";
import { getCart } from "./cart.js";

$(document).ready(function() {
    let loader = document.querySelector(".loader");
    loader.style.display = "none"; // remove loader

    let initialCategory = sessionStorage.initialCategory;
    if (initialCategory) {
        getRecords(initialCategory);
    }

    $("#menuLinks").click(function(event) {
        if (event.target.id === "fixed" || event.target.id === "individual") {
            // do nothing
        } 

        else if (event.target.id === "cart") {
            getCart();
        }

        else {
            getRecords(event.target.id);
        }

        document.getElementById("search").value = "";

    });
});

