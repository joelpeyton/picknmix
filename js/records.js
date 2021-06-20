"use strict";

import { toggleMoreBtn, toggleFinalRow, updateActionBtns, actionBtns, infoBtns, toggleLoader, toggleSearchBar, removeCheckoutBtn, updateCartBadge, updateCategoryTitle } from "./utils.js";
import { showDelivery, showGrading, showAbout, showSelling, showContact, showJoel } from "./about.js";

function showRecords() {
    let content = document.getElementById("recordsRow");
    content.style.display = "block";
}

function hideRecords() {
    let content = document.getElementById("recordsRow");
    content.style.display = "none";
}

function createRecordRow(record, isCart) {
    let table = document.querySelector("#records");
    let rowA = document.createElement("tr");
    rowA.className = "record";

    let artist = document.createElement("td");
    artist.innerHTML = record.artist;
    rowA.appendChild(artist);

    let title = document.createElement("td");
    title.innerHTML = record.title;
    rowA.appendChild(title);

    let condition = document.createElement("td");
    condition.innerHTML = record.vinylCondition;
    rowA.appendChild(condition);

    let price = document.createElement("td");
    price.innerHTML = record.price;
    rowA.appendChild(price);

    let actionBtn = document.createElement("i");
    actionBtn.setAttribute("id", record.category + record.id);
    actionBtn.setAttribute("category", record.category);

    if (isCart) {
        actionBtn.className = "removeBtn fas fa-minus-square";
    } 
    
    else {
        actionBtn.className = "actionBtn fas fa-plus-square";
    }

    let infoBtn = document.createElement("i");
    infoBtn.className = "infoBtn fas fa-info-circle";
    infoBtn.setAttribute("id", "infoBtn" + record.id);

    let action = document.createElement("td");
    action.appendChild(actionBtn);
    action.appendChild(infoBtn);
    rowA.appendChild(action);

    table.appendChild(rowA);

    if (!record.category.startsWith("f")) {
        infoBtn.style.color = "#007bff";
        infoBtn.style.opacity = "1";
        infoBtn.style.cursor = "pointer";

        let rowB = document.createElement("tr");
        rowB.className = "info";
        rowB.setAttribute("id", "info" + record.id); 
        rowB.style.display = "none";
        
        rowB.style.borderTop = "none";

        /*if (record.category === "gifts" || record.category === "accessories") {
            let imgTD = document.createElement("td");

            let img = document.createElement("img");
            img.className = "shopImage";
            img.src = "images/bg.png";  // NEED TO CHANGE TO DATABASE FIELD

            imgTD.appendChild(img);
            rowB.appendChild(imgTD);
        }*/

        let info = document.createElement("td");
        info.setAttribute("colspan", "3");
       
        let infoArr = ["label", "catalogueNumber", "format", "sleeveCondition", "comments"];

        infoArr.forEach(field => {
            let descriptor = field;
            if (descriptor === "catalogueNumber") descriptor = "cat. No";
            if (descriptor === "sleeveCondition") descriptor = "sleeve";

            descriptor = descriptor.charAt(0).toUpperCase() + descriptor.slice(1);
            info.innerHTML += `<strong>${descriptor}: </strong>  ${record[field]}<br>`;
        });
        
        rowB.appendChild(info);
        table.appendChild(rowB);
    }
}

function removeRecords() {
    let record = document.querySelectorAll(".record");
    for (let i = 0; i < record.length; i++) {
        record[i].remove();
    }

    let info = document.querySelectorAll(".info");
    for (let i = 0; i < info.length; i++) {
        info[i].remove();
    }
}

function displayRecords(records, start) {
    removeRecords();
    toggleMoreBtn("show");
    toggleFinalRow("show");

    const LIMIT = 1000;
    let end = start + LIMIT;
    for (let i = 0; i < end; i++) {
        if (i < records.length) {
            createRecordRow(records[i], false);
        }
        
        else {
            toggleMoreBtn("hide");
            break;
        }
    }
    updateActionBtns(records);
    actionBtns();
    infoBtns();
    
    let more = document.querySelector("#more");
    more.onclick = function() {
        displayRecords(records, end);
    };

    toggleLoader("hide");
}

function getRecords(table) {
    toggleLoader("show");

    $.ajax({
        type: "GET",
        url: "php/getTable.php?table=" + table
    })
    .done(function(records) {
        removeRecords();
        removeCheckoutBtn();
        updateCartBadge();
        updateCategoryTitle(table);
        displayRecords(records, 0);
    })
    .fail(function(xhr) {
        sessionStorage.setItem("status", xhr.status + ' : ' + xhr.statusText);
        window.location = "status.html";
    });   
}

function landingPage() {
    let initialCategory = sessionStorage.initialCategory;

    if (initialCategory === "picknmix") {        
        showAbout();
        toggleSearchBar("hide");
    }

    else if (initialCategory === "grading") {
        showGrading();
        toggleSearchBar("hide");
    }

    else if (initialCategory === "delivery") {
        showDelivery();
        toggleSearchBar("hide");
    }

    else if (initialCategory === "selling") {
        showSelling();
        toggleSearchBar("hide");
    }

    else if (initialCategory === "contact") {
        showContact();
        toggleSearchBar("hide");
    }

    else if (initialCategory === "joel") {
        showJoel();
        toggleSearchBar("hide");
    }

    else {
        initialCategory ? getRecords(initialCategory) : getRecords("f1");
        showRecords();
    }
}

export {
    showRecords,
    hideRecords,
    displayRecords,
    getRecords,
    createRecordRow,
    removeRecords,
    landingPage
};