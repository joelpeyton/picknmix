import { getRecords, toggleLoader, toggleSearchBar, landingPage, clearSearchInput } from "./utils.js";
import { getCart } from "./cart.js";

$(document).ready(function() {
    toggleLoader("hide");
    landingPage();

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

        clearSearchInput();
    });

    $("#cartTop").click(function() {
        getCart();
        toggleSearchBar("hide");
    });

    $("#backToTop").click(function() {
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0; 
    });
});
