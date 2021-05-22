"use strict";

let code = document.getElementById("promoCode");
let alert = document.getElementById("promoAlert");
let success = document.getElementById("promoSuccess");
let percentage = document.getElementById("promoPercentage");

function clearCode() {
    code.value = "";
}

function showAlert() {
    alert.style.display = "block";
}

function hideAlert() {
    alert.style.display = "none";
}

function showSuccess() {
    success.style.display = "block";
}

function hideSuccess() {
    success.style.display = "none";
}

function updatePercentage() {
    percentage.innerText = sessionStorage.promoPercentage;
}


export { clearCode, showAlert, showSuccess, hideAlert, hideSuccess, updatePercentage };