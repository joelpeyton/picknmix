import { removeRecords, updateCartBadge, removeCheckoutBtn, displayRecords, updateCategoryTitle } from "./utils.js";
 
$("#searchByJukebox").click(function() {
    let loader = document.querySelector(".loader");
    loader.style.display = "block"; // add loader
    
    $.ajax({
        type: "GET",
        url: "php/searchDatabase.php?field=Title&term=jb" 
    })
    .done(function(records) {
        updateSearch(records);
        loader.style.display = "none";
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

    let loader = document.querySelector(".loader");
    loader.style.display = "block"; // add loader
    
    $.ajax({
        type: "GET",
        url: "php/searchDatabase.php?field=" + searchBy + "&term=" + searchTerm.value
    })
    .done(function(records) {
        updateSearch(records);
        loader.style.display = "none";
    })
    .fail(function() {
        alert("Error: Unable to return database");
    });    
});

function updateSearch(records) {
    removeRecords();
    removeCheckoutBtn();
    updateCartBadge();
    updateCategoryTitle("Search");
    displayRecords(records, 0);
    
    document.querySelector("#quantity").innerText = `${records.length} records found`;
}