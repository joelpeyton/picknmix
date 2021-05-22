"use strict";

import { toggleLoader, toggleSearchBar, clearSearchInput } from "./utils.js";
import { showRecords, hideRecords, getRecords, landingPage } from "./records.js";
import { getCart } from "./cart.js";
import { toggleOverseas, displayShippingModal, calculateShippingCost, displayPaypalModal } from "./shipping.js";
import { showDelivery, hideDelivery, showGrading, hideGrading, showAbout, hideAbout, showSelling, hideSelling, hideJoel, showJoel } from "./about.js";
import { hideInfoBtn, showInfoBtn, getInfo, toggleInfo } from "./info.js";
import { clearCode, showAlert, showSuccess, hideAlert, hideSuccess, updatePercentage } from "./promo.js";

$(document).ready(function() {
    hideRecords();
    hideGrading();
    hideDelivery();
    hideAbout();
    hideSelling();
    toggleLoader("hide");
    landingPage();
    //getInfo(sessionStorage.initialCategory);
    //document.getElementById("gradingInfoBtn").click();

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
            hideSelling();
            hideJoel();
            showAbout();
            toggleSearchBar("hide");
        }

        else if (event.target.id === "grading") {
            hideInfoBtn();
            hideRecords();
            hideDelivery();
            hideAbout();
            hideSelling();
            hideJoel();
            showGrading();
            toggleSearchBar("hide");
        }

        else if (event.target.id === "delivery") {
            hideInfoBtn();
            hideRecords();
            hideGrading();
            hideAbout();
            hideSelling();
            hideJoel();
            showDelivery();
            toggleSearchBar("hide");
        }

        else if (event.target.id === "selling") {
            hideInfoBtn();
            hideRecords();
            hideGrading();
            hideAbout();
            hideDelivery();
            hideJoel();
            showSelling();
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
            hideAbout();
            hideSelling();
            getRecords(event.target.id);
            toggleSearchBar("show");
        }

        getInfo(event.target.id);
        clearSearchInput();
    });

    $("#joel").click(function() {
        console.log("clicked");
        hideInfoBtn();
        hideRecords();
        hideGrading();
        hideAbout();
        hideDelivery();
        hideSelling();
        showJoel();
        toggleSearchBar("hide");
    }) 

    $("#cartBtn").click(function() {
        getCart();
        toggleSearchBar("hide");
        hideInfoBtn();
        hideDelivery();
        hideAbout();
        hideGrading();
        hideSelling();
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

    $("#promoModal").on("show.bs.modal", function() {
        sessionStorage.setItem("promoPercentage", 0);
        clearCode();
        hideAlert();
        hideSuccess();
        updatePercentage();
    });

    $("#promoBtn").click(function() {
        let code = document.getElementById("promoCode").value;
        
        if (!code.startsWith("Picknmix")) {
            showAlert();
            hideSuccess();
            updatePercentage();
        }
        else {
            showSuccess();
            hideAlert();

            if (code.endsWith("5E")) {
                sessionStorage.setItem("promoPercentage", 5);
                updatePercentage();
            } 
            else if (code.endsWith("10J")) {
                sessionStorage.setItem("promoPercentage", 10);
                updatePercentage();
            }
            else if (code.endsWith("15O")) {
                sessionStorage.setItem("promoPercentage", 15);
                updatePercentage();
            } 
            else {
                hideSuccess();
                showAlert();
            }
        }
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
        alert("Oops!! Looks like somethings gone wrong, please try again or contact ian@picknmixrecords.com if the problem persists.");
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
        alert("Oops!! Looks like somethings gone wrong, please try again or contact ian@picknmixrecords.com if the problem persists.");
    });  
}


function updateSold() {
    let cartArr = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "i1", "i2", "i3", "gifts", "accessories"];
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
        alert("Oops!! Looks like somethings gone wrong, please try again or contact ian@picknmixrecords.com if the problem persists.");
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
        alert("Oops!! Looks like somethings gone wrong, please try again or contact ian@picknmixrecords.com if the problem persists.");
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