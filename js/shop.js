import { getRecords } from "./utils.js";
import { updateCart } from "./cart.js";

$(document).ready(function() {
    let loader = document.querySelector(".loader");
    loader.style.display = "none"; // remove loader

    $("#menuLinks").click(function(event) {
 
        if (event.target.id === "cart") {
            let cart = sessionStorage.cart ? sessionStorage.cart.split(",") : [];
            let cartRecords = []; 
            records.forEach(record => {
                if (cart.includes(record["id"])) {
                    cartRecords.push(record);
                }
            });
            
            updateCart(cartRecords);
        }

        else {
            getRecords(event.target.id);
            //console.log(records);
            //updatePage(records, event.target.id);
            //document.getElementById("checkout").style.display = "none";
        }

        document.getElementById("search").value = "";

    });
});

/*
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "php/getDatabase.php"
    })
    .done(function(records) {
        console.log(records);
        //let initialCategory = sessionStorage.initialCategory;

        //if (initialCategory) {
        //    updatePage(records, initialCategory);
       // }

        $("#menuLinks").click(function(event) {
            if (event.target.id === "cart") {
                let cart = sessionStorage.cart ? sessionStorage.cart.split(",") : [];
                let cartRecords = []; 
                records.forEach(record => {
                    if (cart.includes(record["id"])) {
                        cartRecords.push(record);
                    }
                });
                
                updateCart(cartRecords);
            }

            else {
                //console.log(records);
                //updatePage(records, event.target.id);
                //document.getElementById("checkout").style.display = "none";
            }

            document.getElementById("search").value = "";
        });
    })
    .fail(function() {
        alert("Error: Unable to return database");
    });    
});*/



/*let arr = [];
for (let i = 1; i <= 196; i++) {
    $.ajax({
        type: "GET",
        url: "php/getDatabase.php?table=f5&id=" + i 
    })
    .done(function(records) {
        arr.push(records[0].id);
    })
    .fail(function() {
        console.log(i);
    }); 
    
}
   
console.log(arr.sort(function(a, b){return a - b}));      */
