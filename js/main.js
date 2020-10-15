import { toggleLoader, toggleSearchBar, clearSearchInput } from "./utils.js";
import { showRecords, hideRecords, getRecords, landingPage } from "./records.js";
import { getCart } from "./cart.js";
import { toggleOverseas, displayPaypalModal, calculateShippingCost } from "./shipping.js";
import { showDelivery, hideDelivery, showGrading, hideGrading } from "./about.js";
import { hideInfoBtn, showInfoBtn, getInfo, toggleInfo } from "./info.js";

$(document).ready(function() {
    hideRecords();
    hideGrading();
    hideDelivery();
    toggleLoader("hide");
    landingPage();
    getInfo(sessionStorage.initialCategory);

    $("#menuLinks").click(function(event) {
        if (event.target.id === "fixed" || event.target.id === "individual" || event.target.id === "about") {
            // do nothing
        } 

        else if (event.target.id === "grading") {
            hideInfoBtn();
            hideRecords();
            hideDelivery();
            showGrading();
        }

        else if (event.target.id === "delivery") {
            hideInfoBtn()
            hideRecords();
            hideGrading();
            showDelivery();
        }

        else {
            showRecords();
            showInfoBtn();
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
        getInfo("cart");
    });

    $("#backToTop").click(function() {
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0; 
    });

    $("#gradingInfoBtn").click(function() {
        toggleInfo();
    });

    $("#destinationModal").on("show.bs.modal", function() {
        toggleOverseas();

        $("#inTheUK").change(function() {
            toggleOverseas();
        });
    });

    $("#paypalModal").on("show.bs.modal", function() {
        displayPaypalModal();

        $("#deliveryOption").change(function() {
            calculateShippingCost();
        });
    });
});
