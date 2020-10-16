import { updateCartBadge, updateSessionCart, toggleLoader, toggleFinalRow, infoBtns } from "./utils.js";
import { removeRecords, createRecordRow } from "./records.js";

function getCart() {
    toggleLoader("show");

    let cartArr = ["f1", "f2", "f3", "f4", "f5", "i1", "i2", "i3", "gifts", "accessories"];
    let data = {};
    cartArr.forEach(cart => {
        if (sessionStorage[cart]) {
            data[cart] = sessionStorage[cart].split(",");
        }
    })

    $.ajax({
        type: "GET",
        url: "php/getCart.php?",
        data: data
    })
    .done(function(records) {
       updateCart(records);
       toggleLoader("hide");
    })
    .fail(function(err) {
        console.log(err);
        alert("Error: Unable to return database");
    });    
}

function removeRecordFromCart() {
    $(".removeBtn").click(function() {
        updateSessionCart();
        updateCartBadge();
        document.getElementById("cartBtn").click();
    });
}

function setTotal() {
    let total = document.getElementById("total").innerText;
    sessionStorage.setItem("total", total);
}

function updateTotal(records) {
    let total = 0;
    for (let index in records) {
        total += parseFloat(records[index]["price"]);
    }

    document.getElementById("total").innerHTML = `<strong>${total.toFixed(2)}</strong>`;
}

function updateCart(records) {
    toggleFinalRow("hide");
    removeRecords();

    let items = [];
 
    for (let index in records) {
        let record = records[index];
        record.number = record.number ? record.number : "";
        createRecordRow(record, true);
        let item = {
            name: `${record.artist}`,
            description: `${record.title}`,
            sku: ` ${record.number}`,
            unit_amount: {
                currency_code: "GBP",
                value: `${record.price}`
            },
            quantity: "1"
        }
        
        items.push(item);
    }

    sessionStorage.setItem("items", JSON.stringify(items));
    document.querySelector("#categoryTitle").innerText = "Cart";
    document.getElementById("checkout").style.display = "table-footer-group";
    updateTotal(records);
    setTotal();
    removeRecordFromCart();    
    infoBtns();
}

export { getCart };