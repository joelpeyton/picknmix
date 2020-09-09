import { createRecordRow, removeRecords, selectActive, actionBtns, updateActionBtns, updateCartBadge } from "./utils.js";
 
$("#searchBy").click(function(event) {
    let search = document.getElementById("search");
    let placeholder = event.target.id.slice(8);
    search.value = "";
    search.setAttribute("placeholder", placeholder)
});

$("#search").on("input", function() {
    let searchTerm = document.getElementById("search");
    let searchBy = searchTerm.getAttribute("placeholder");
    
    $.ajax({
        type: "GET",
        url: "php/searchDatabase.php?field=" + searchBy + "&term=" + searchTerm.value
    })
    .done(function(records) {
        updateSearch(records);
    })
    .fail(function() {
        alert("Error: Unable to return database");
    });    
});

function updateSearch(records) {
    selectActive("#search", "Search");
    removeRecords();

    for (let index in records) {
        let record = records[index];
        createRecordRow(record, false);
    }

    document.getElementById("checkout").style.display = "none"; 
    actionBtns();
    updateActionBtns();
    updateCartBadge();
}