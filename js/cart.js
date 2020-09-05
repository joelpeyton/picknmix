import { removeRecords, selectActive, updateCartBadge, updateSessionCart } from "./utils.js";

function createRecordRow(record) {
    let table = document.querySelector("#records");
    let row = document.createElement("tr");
    row.className = "record";

    let artist = document.createElement("td");
    artist.innerHTML = record["Artist"];
    row.appendChild(artist);

    let title = document.createElement("td");
    title.innerHTML = record["Title"];
    row.appendChild(title);

    let tick = document.createElement("i");
    tick.className = "fas fa-check";

    let pictureSleeve = document.createElement("td");
    if (record["Picture_Sleeve"] == "Y") {
        pictureSleeve.appendChild(tick);
    } 
    row.appendChild(pictureSleeve);

    let largeHole = document.createElement("td");
    if (record["Large_Centre"] == "Y") {
        largeHole.appendChild(tick);
    }
    row.appendChild(largeHole);

    let condition = document.createElement("td");
    condition.innerHTML = record["Vinyl_Grade"];
    row.appendChild(condition);

    let price = document.createElement("td");
    price.innerHTML = record["Price"];
    row.appendChild(price);

    let removeBtn = document.createElement("button");
    removeBtn.className = "removeBtn btn btn-outline-danger";
    removeBtn.setAttribute("id", record["id"]);
    removeBtn.innerHTML = "Remove";
    
    let cart  = document.createElement("td");
    cart.appendChild(removeBtn);
    row.appendChild(cart);

    table.appendChild(row);
}

function createTotalRow() {
    let table = document.querySelector("#records");
    let row = document.createElement("tr");
    row.className = "record";

    let artist = document.createElement("td");
    row.appendChild(artist);

    let title = document.createElement("td");
    row.appendChild(title);

    let pictureSleeve = document.createElement("td"); 
    row.appendChild(pictureSleeve);

    let largeHole = document.createElement("td");
    row.appendChild(largeHole);

    let condition = document.createElement("td");
    condition.innerText = "Total: £";
    row.appendChild(condition);

    let total = document.createElement("td");
    total.setAttribute("id", "total");
    row.appendChild(total);

    let checkout = document.createElement("button");
    checkout.className = "btn btn-primary";
    checkout.innerText = "Checkout";
    
    let cart = document.createElement("td");
    cart.appendChild(checkout);
    row.appendChild(cart);

    table.appendChild(row);
}

function updateTotal(records) {
    let total = 0;
    for (let index in records) {
        total += parseFloat(records[index]["Price"]);
    }
    document.getElementById("total").innerText = total;
}

function removeRecordFromCart() {
    $(".removeBtn").click(function() {
        updateSessionCart();
        updateCartBadge();
        document.getElementById("cart").click();
    });
}

function updateCart(records) {
    selectActive("#cart", "Cart");
    removeRecords();
 
    for (let index in records) {
        createRecordRow(records[index]);
    }

    createTotalRow();
    updateTotal(records);

    removeRecordFromCart();
}

export { updateCart };