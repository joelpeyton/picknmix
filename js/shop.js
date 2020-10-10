import { getRecords, toggleLoader, toggleSearchBar, landingPage, clearSearchInput, toggleInfo, getInfo } from "./utils.js";
import { getCart } from "./cart.js";
import { toggleOverseas, displayPaypalModal, calculateShippingCost } from "./shipping.js";

$(document).ready(function() {
    toggleLoader("hide");
    landingPage();
    getInfo(sessionStorage.initialCategory);

    $("#menuLinks").click(function(event) {
        if (event.target.id === "fixed" || event.target.id === "individual") {
            // do nothing
        } 

        else if (event.target.id === "cart") {
            getCart();
            toggleSearchBar("hide");
        }

        else {
            getRecords(event.target.id);
            toggleSearchBar("show");
        }

        getInfo(event.target.id);
        clearSearchInput();
    });

    $("#cartTop").click(function() {
        getCart();
        toggleSearchBar("hide");
        getInfo("cart");
    });

    $("#backToTop").click(function() {
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0; 
    });

    $("#informationBtn").click(function() {
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
