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
            hideInfoBtn()
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
});
