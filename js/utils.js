"use strict";

function toggleActionBtn(event) {
    let btn = document.getElementById(event.target.id);
    if (btn.classList.contains("fa-minus-square")) {
        btn.classList.remove("fa-minus-square");
        btn.classList.add("fa-plus-square");
        btn.style.color = "#28a745";
    } 
    
    else {
        btn.classList.remove("fa-plus-square");
        btn.classList.add("fa-minus-square");
        btn.style.color = "#dc3545";
    }
}

function updateSessionCart() {
    let id;
    if (event.target.id.startsWith("gifts")) {
        id = event.target.id.slice(5);
    } else if (event.target.id.startsWith("accessories")) {
        id = event.target.id.slice(11);
    } else {
        id = event.target.id.slice(2);
    }

    let category = event.target.getAttribute("category");
    let cart = sessionStorage[category];
    if (cart) {
        cart = cart.split(",");

        let index = cart.indexOf(id);
        if (index === -1) {
            cart.push(id);
        }

        else {
            cart.splice(index, 1);
        }

        sessionStorage[category] = cart;
    }

    else {
        sessionStorage.setItem(category, id);
    }
}

function updateCartBadge() {
    let cartBadge = document.getElementById("cartBadge");

    let categories = ["f1", "f2", "f3", "f4", "f5", "i1", "i2", "i3", "gifts", "accessories"];
    let length = 0;
    categories.forEach(category => {
        let cart = sessionStorage[category] ? sessionStorage[category].split(",") : [];
        
        if (cart[0] === "") {
            // do nothing
        }
    
        else {
            length += cart.length;
        }
    });

    cartBadge.innerText = length;   
} 

function actionBtns() {
    $(".actionBtn").click(function(event) {
        toggleActionBtn(event);
        updateSessionCart();
        updateCartBadge();
    });
}

function infoBtns() {
    $(".infoBtn").click(function(event) {
        let id = "info" + event.target.id.slice(7);
        let info = document.getElementById(id);
        
        if (info.style.display === "none") {
            info.style.display = "table-row";
        }

        else {
            info.style.display = "none";
        }
    });
}

function updateActionBtns(records) {
    for (let index in records) {
        let record = records[index];
        let category = record.category; 
        let cart = sessionStorage[category] ? sessionStorage[category].split(",") : [];
        if (cart.includes(record.id)) {
            let id = record.category + record.id;
            let btn = document.getElementById(id);
            if (btn) {
                btn.classList.remove("fa-plus-square");
                btn.classList.add("fa-minus-square");
                btn.style.color = "#dc3545";
            }
        }
    }
}

function removeCheckoutBtn() {
    let checkout = document.getElementById("checkout");
    if (checkout.style.display !== "none") checkout.style.display = "none";
}

function updateCategoryTitle(table) {
    let text;
    switch (table) {
        case "f1":
            text = "50s & 60s singles (All £1.99)";
            break;
        case "f2":
            text = "70s 80s & 90s singles (All £1.99)";
            break;
        case "f3":
            text = "60s – 90s Bargain singles (All 99p)";
            break;
        case "f4":
            text = "12” singles (All £2.49)";
            break;
        case "f5":
            text = "LPs (£4.99)";
            break;
        case "i1":
            text = "7\" singles";
            break;
        case "i2":
            text = "12\" singles";
            break;
        case "i3":
            text = "LPs & CDs";
            break;            
        case "accessories":
            text = "Accessories";
            break;   
        case "gifts":
            text = "Gifts";
            break;     
        default:
            let searchTerm = document.getElementById("search").getAttribute("placeholder");
            text = `Search by ${searchTerm}`;
    }

    document.querySelector("#categoryTitle").innerText = text;
}

function toggleLoader(toggle) {
    let loader = document.querySelector(".loader");  
    loader.style.display = toggle == "hide" ? "none" : "block";
}

function toggleSearchBar(toggle) {
    let searchBar = document.getElementById("searchDiv");
    searchBar.style.visibility = toggle == "hide" ? "hidden" : "visible";
}

function clearSearchInput() {
    document.getElementById("search").value = "";
}

function toggleFinalRow(toggle) {
    let row = document.querySelector("#finalRow");
    row.style.display = toggle == "hide" ? "none" : "table-row";
}

function toggleMoreBtn(toggle) {
    let btn = document.querySelector("#more");
    btn.style.display = toggle == "hide" ? "none" : "inline-block";
}

export {
    toggleFinalRow,
    clearSearchInput,
    toggleSearchBar, 
    toggleLoader, 
    actionBtns, 
    infoBtns,
    updateActionBtns, 
    updateSessionCart, 
    updateCartBadge, 
    removeCheckoutBtn, 
    updateCategoryTitle,
    toggleMoreBtn
};
