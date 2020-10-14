import { showContent, hideContent, getRecords, toggleLoader, toggleSearchBar, landingPage, clearSearchInput } from "./utils.js";
import { getCart } from "./cart.js";
import { toggleOverseas, displayPaypalModal, calculateShippingCost } from "./shipping.js";
import { showDelivery, hideDelivery, showGrading, hideGrading } from "./about.js";
import { hideInfoBtn, showInfoBtn, toggleInfoBtn, getInfo, toggleInfo } from "./info.js";

$(document).ready(function() {
    hideContent();
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
            hideContent();
            hideDelivery();
            showGrading();
        }

        else if (event.target.id === "delivery") {
            hideInfoBtn()
            hideContent();
            hideGrading();
            showDelivery();
        }

        else {
            showContent();
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

    $("#infoBtn").click(function() {
        toggleInfo();
        toggleInfoBtn();
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
