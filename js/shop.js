import { getRecords } from "./utils.js";
import { getCart } from "./cart.js";

$(document).ready(function() {
    let loader = document.querySelector(".loader");
    loader.style.display = "none"; // remove loader

    let initialCategory = sessionStorage.initialCategory;
    if (initialCategory) {
        getRecords(initialCategory);
    }

    let searchBar = document.getElementById("searchDiv");

    $("#menuLinks").click(function(event) {
        if (event.target.id === "fixed" || event.target.id === "individual") {
            // do nothing
        } 

        else if (event.target.id === "cart") {
            getCart();
            searchBar.style.visibility = "hidden";
        }

        else {
            getRecords(event.target.id);
            searchBar.style.visibility = "visible";
        }

        document.getElementById("search").value = "";

    });
});
