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
    pictureSleeve.className = "removeMobile";
    if (record["Picture_Sleeve"] == "Y") {
        pictureSleeve.appendChild(tick);
    } 
    row.appendChild(pictureSleeve);

    let largeHole = document.createElement("td");
    largeHole.className = "removeMobile";
    if (record["Large_Centre"] == "Y") {
        largeHole.appendChild(tick);
    }
    row.appendChild(largeHole);

    let condition = document.createElement("td");
    condition.className = "removeMobile";
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

    let infoRow = document.createElement("tr");
    infoRow.className = "info";
    let info = document.createElement("td");
    info.setAttribute("colspan", "4");
    info.style.borderTop = "none";
    info.innerHTML = "<strong>Condition: </strong>" + record["Vinyl_Grade"] + "<br>";
    if (record["Picture_Sleeve"] == "Y") {
        info.innerHTML += "<strong>Picture Sleeve: &check;</strong>" + "<br>";
    } 
    if (record["Large_Centre"] == "Y") {
        info.innerHTML += "<strong>Large Hole: &check;</strong>";
    }
    infoRow.appendChild(info);
    table.appendChild(infoRow);
}

function createTotalRow() {
    let table = document.querySelector("#records");
    let row = document.createElement("tr");
    row.className = "record";

    let artist = document.createElement("td");
    row.appendChild(artist);

    let title = document.createElement("td");
    title.className = "removeMobile";
    row.appendChild(title);

    let pictureSleeve = document.createElement("td"); 
    pictureSleeve.className = "removeMobile";
    row.appendChild(pictureSleeve);

    let largeHole = document.createElement("td");
    largeHole.className = "removeMobile";
    row.appendChild(largeHole);

    let condition = document.createElement("td");
    condition.innerHTML = "<strong>Total: £</strong>";
    row.appendChild(condition);

    let total = document.createElement("td");
    total.setAttribute("id", "total");
    row.appendChild(total);

    //let checkout = document.createElement("button");
    //checkout.className = "btn btn-primary";
    //checkout.id = "checkout";
    //checkout.setAttribute("data-toggle", "modal");
    //checkout.setAttribute("data-target", "#checkoutModal");
    //checkout.innerText = "Checkout";
    
    //let cart = document.createElement("td");
    //cart.appendChild(checkout);
    //row.appendChild(cart);

    let paypal = document.createElement("td");
    let div = document.createElement("div");
    div.id = "paypal-button-container";
    paypal.appendChild(div);
    row.appendChild(paypal);
    table.appendChild(row);
}

function updateTotal(records) {
    let total = 0;
    for (let index in records) {
        total += parseFloat(records[index]["Price"]);
    }

    document.getElementById("total").innerHTML = `<strong>${total.toFixed(2)}</strong>`;
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

    let items = [];
 
    for (let index in records) {
        let record = records[index];
        createRecordRow(record);
        let item = {
            name: `${record.Artist}`,
            description: `${record.Title}`,
            sku: `${record.Product_id}`,
            unit_amount: {
                currency_code: "GBP",
                value: `${record.Price}`
            },
            quantity: "1"
        }
        
        items.push(item);
    }

    sessionStorage.setItem("items", JSON.stringify(items));
    //createTotalRow();
    document.getElementById("checkout").style.display = "table-footer-group";
    updateTotal(records);
    checkout();

    removeRecordFromCart();     
}

function checkout() {
    let total = document.getElementById("total").innerText;
    sessionStorage.setItem("total", total);
}

export { updateCart, checkout };