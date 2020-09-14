import { removeRecords, createRecordRow, updateCartBadge, updateSessionCart } from "./utils.js";

function getCart() {
    let loader = document.querySelector(".loader");
    loader.style.display = "block"; // add loader

    let cartArr = ["f1", "f2", "f3", "f4", "f5", "i1", "i2", "i3"];
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
       loader.style.display = "none";
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
        document.getElementById("cart").click();
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
    let more = document.querySelector("#more");
    more.style.display = "none";

    removeRecords();

    let items = [];
 
    for (let index in records) {
        let record = records[index];
        createRecordRow(record, record["category"], true);
        let item = {
            name: `${record.artist}`,
            description: `${record.title}`,
            sku: `${record.number}`,
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
    document.querySelector("#quantity").innerText = "";
    document.getElementById("checkout").style.display = "table-footer-group";
    updateTotal(records);
    setTotal();
    removeRecordFromCart();     
}


export { getCart };