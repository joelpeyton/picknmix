"use strict";

import { toggleLoader, toggleSearchBar, clearSearchInput } from "./utils.js";
import { showRecords, hideRecords, getRecords, landingPage } from "./records.js";
import { getCart } from "./cart.js";
import { toggleOverseas, displayShippingModal, calculateShippingCost, displayPaypalModal } from "./shipping.js";
import { showDelivery, hideDelivery, showGrading, hideGrading, showAbout, hideAbout } from "./about.js";
import { hideInfoBtn, showInfoBtn, getInfo, toggleInfo } from "./info.js";

$(document).ready(function() {
    hideRecords();
    hideGrading();
    hideDelivery();
    hideAbout();
    toggleLoader("hide");
    landingPage();
    //getInfo(sessionStorage.initialCategory);
    document.getElementById("gradingInfoBtn").click();

    let a = document.getElementById("title").clientHeight;
    let b = document.getElementById("navigation").clientHeight;
    let c = document.getElementById("gradingInfoRow").clientHeight;
    let d = document.getElementById("footer").clientHeight;
    let e = document.getElementById("cartBtn").clientHeight;

    let f = a + b + c + d + e + 38;

    let g = document.body.clientHeight;

    document.getElementById("recordsRow").style.height = `${g - f}px`;
    document.getElementById("gradingRow").style.height = `${g - f}px`;
    document.getElementById("deliveryRow").style.height = `${g - f}px`; 

    $("#menuLinks").click(function(event) {
        if (event.target.id === "fixed" || event.target.id === "individual" || event.target.id === "about") {
            // do nothing
        } 

        else if (event.target.id === "picknmix") {
            hideInfoBtn();
            hideRecords();
            hideDelivery();
            hideGrading();
            showAbout();
            toggleSearchBar("hide");
        }

        else if (event.target.id === "grading") {
            hideInfoBtn();
            hideRecords();
            hideDelivery();
            hideAbout();
            showGrading();
            toggleSearchBar("hide");
        }

        else if (event.target.id === "delivery") {
            hideInfoBtn();
            hideRecords();
            hideGrading();
            hideAbout();
            showDelivery();
            toggleSearchBar("hide");
        }

        else {
            
            if (event.target.id === "gifts" || event.target.id === "accessories" ) {
                hideInfoBtn();
            } 

            else {
                showInfoBtn();
            }

            showRecords();
            hideGrading();
            hideDelivery();
            getRecords(event.target.id);
            toggleSearchBar("show");
        }

        getInfo(event.target.id);
        clearSearchInput();
    });

    $("#cartBtn").click(function() {
        getCart();
        toggleSearchBar("hide");
        hideInfoBtn();
        hideDelivery();
        hideAbout();
        hideGrading();
        showRecords();
        getInfo("cart");
    });

    $("#backToTop").click(function() {
        document.getElementById("recordsTable").scrollIntoView();
    });

    $("#gradingInfoBtn").click(function() {
        toggleInfo();
    });

    $("#gradingLink").click(function() {
        document.getElementById("grading").click();
    });

    $("#destinationModal").on("show.bs.modal", function() {
        toggleOverseas();

        $("#inTheUK").change(function() {
            toggleOverseas();
        });
    });

    $("#shippingModal").on("show.bs.modal", function() {
        displayShippingModal();

        $("#deliveryOption").change(function() {
            calculateShippingCost();
        });
    });

    $("#deliveryModal").on("show.bs.modal", function() {
        document.getElementById("deliveryInstructions").value = "";
    });

    $("#paypalModal").on("show.bs.modal", function() {
        displayPaypalModal();
    });

    $("#confirmBtn").click(function() {
        addCustomer();
        addTransaction();
        updateSold();
        showConfirmationModal();
        emailTransaction();
    });
    
    $("#confirmationModal").hide(function() {
        sessionStorage.clear();
    });
});

function addCustomer() {
    let data = {};
    data.given_name = sessionStorage.givenName;
    data.surname = sessionStorage.surname;
    data.email = sessionStorage.email;
    data.payer_id = sessionStorage.payerId;

    $.ajax({
        type: "GET",
        url: "php/addCustomer.php?",
        data: data
    })
    .done(function() {
        // DO SOMETHING;
    })
    .fail(function(err) {
        console.log(err);
        alert("Error: Unable to return database");
    });  
}

function addTransaction() {
    let data = {};
    data.email = sessionStorage.email;
    data.transaction_id = sessionStorage.transactionId;
    data.total = sessionStorage.total;
    data.shipping = sessionStorage.shipping;
    data.grand_total = sessionStorage.grandTotal;


    $.ajax({
        type: "GET",
        url: "php/addTransaction.php?",
        data: data
    })
    .done(function() {
        // DO SOMETHING
    })
    .fail(function(err) {
        console.log(err);
        alert("Error: Unable to return database");
    });  
}


function updateSold() {
    let cartArr = ["f1", "f2", "f3", "f4", "f5", "i1", "i2", "i3", "gifts", "accessories"];
    let data = {};
    data.records = {};
    data.transaction_id = sessionStorage.transactionId;
    cartArr.forEach(tableName => {
        if (sessionStorage[tableName]) {
            data.records[tableName] = sessionStorage[tableName].split(",");
        }
    });

    $.ajax({
        type: "GET",
        url: "php/updateSold.php?",
        data: data
    })
    .done(function() {
        // DO SOMETHING
    })
    .fail(function(err) {
        console.log(err);
        alert("Error: Unable to return database");
    });    
}

function emailTransaction() {
    let data = {};
    data.given_name = sessionStorage.givenName;
    data.surname = sessionStorage.surname;
    data.email = sessionStorage.email;
    data.transaction_id = sessionStorage.transactionId;
    data.total = sessionStorage.total;
    data.shipping = parseFloat(sessionStorage.shipping) === 0 ? "To be confirmed" : sessionStorage.shipping;
    data.grand_total = sessionStorage.grandTotal;
    data.notes = sessionStorage.notes ? sessionStorage.notes : "None";
    data.cart = sessionStorage.cart;

    $.ajax({
        type: "GET",
        url: "php/email.php?",
        data: data
    })
    .done(function() {
        // DO SOMETHING
    })
    .fail(function(err) {
        console.log(err);
        alert("Error: Unable to return database");
    });   
}

function showConfirmationModal() {
    $("#paypalModal").modal("hide");
    $("#confirmationModal").modal("show");
    let records = document.getElementById("recordsRow");
    records.style.display = "none";
    let cartBadge = document.getElementById("cartBadge");
    cartBadge.innerText = "0";
    let status = document.getElementById("confirmationModalLabel");
    let payerName = document.getElementById("payerName");
    let extra = document.getElementById("detailsExtra");
    extra.style.display = "none";
    let success = document.getElementById("detailsSuccess");
    let error = document.getElementById("detailsError");

    status.innerText = sessionStorage.status;

    if (sessionStorage.status === "COMPLETED") {  
        error.style.display = "none";
        payerName.innerText = `${sessionStorage.givenName} ${sessionStorage.surname}`; 
        let overseas = sessionStorage.inTheUK === "yes" ? "No" : "Yes";
        if (parseFloat(sessionStorage.total) >= 250.00 || overseas === "Yes") {
            extra.style.display = "block";
        }
    }

    else {
        success.style.display = "none";
    }
    
    //sessionStorage.clear();
}