"use strict";

let grading = document.getElementById("gradingRow");
let delivery = document.getElementById("deliveryRow");
let about = document.getElementById("aboutRow");
let selling = document.getElementById("sellingRow");
let joel = document.getElementById("joelRow");
let category = document.getElementById("categoryTitle");

function showGrading() {
    grading.style.display = "block";
    category.innerText = "Grading";
}

function hideGrading() {
    grading.style.display = "none";
}

function showDelivery() {
    delivery.style.display = "block";
    category.innerText = "Delivery";
}

function hideDelivery() {
    delivery.style.display = "none";
}

function showAbout() {
    about.style.display = "block";
    category.innerText = "About Us";
}

function hideAbout() {
    about.style.display = "none";
}

function showSelling() {
    selling.style.display = "block";
    category.innerText = "Selling your collection?";
}

function hideSelling() {
    selling.style.display = "none";
}

function showJoel() {
    joel.style.display = "block";
    category.innerText = "Need a website?";
}

function hideJoel() {
    joel.style.display = "none";
}

export { showGrading, hideGrading, showDelivery, hideDelivery, showAbout, hideAbout, showSelling, hideSelling, showJoel, hideJoel };