"use strict";

import { updateCartBadge, removeCheckoutBtn, updateCategoryTitle, toggleLoader } from "./utils.js";
import { removeRecords, displayRecords } from "./records.js";
import { hideInfoBtn, hideInfo } from "./info.js";

function updateSearch(records) {
    hideInfoBtn();
    hideInfo();
    removeRecords();
    removeCheckoutBtn();
    updateCartBadge();
    updateCategoryTitle("Search");
    displayRecords(records, 0);
}

$("#searchByJukebox").click(function() {
    toggleLoader("show");

    $.ajax({
        type: "GET",
        url: "php/searchDatabase.php?field=Title&term=jb" 
    })
    .done(function(records) {
        updateSearch(records);
        toggleLoader("hide");
    })
    .fail(function() {
        alert("Error: Unable to return database");
    });    
});

$("#searchBy").click(function(event) {
    let search = document.getElementById("search");
    let placeholder = event.target.id.slice(8);
    search.value = "";
    search.setAttribute("placeholder", placeholder);
    placeholder === "Jukebox" ? search.disabled = true : search.disabled = false;
});

$("#search").on("input", function() {
    let searchTerm = document.getElementById("search");
    let searchBy = searchTerm.getAttribute("placeholder");

    toggleLoader("show");
    
    $.ajax({
        type: "GET",
        url: "php/searchDatabase.php?field=" + searchBy + "&term=" + searchTerm.value
    })
    .done(function(records) {
        updateSearch(records);
        toggleLoader("hide");
    })
    .fail(function() {
        alert("Error: Unable to return database");
    });    
});

