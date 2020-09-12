import { removeRecords, updateCartBadge, updateSessionCart } from "./utils.js";

 /*if (isCart) {
        actionBtn.className = "removeBtn btn btn-outline-danger";
        actionBtn.innerHTML = "Remove";
    } 
    
    else {
        actionBtn.className = "actionBtn btn btn-outline-success";
        actionBtn.innerText = "Add";
    }*/

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
        total += parseFloat(records[index]["Price"]);
    }

    document.getElementById("total").innerHTML = `<strong>${total.toFixed(2)}</strong>`;
}

function updateCart(records) {
    selectActive("#cart", "Cart");
    removeRecords();

    let items = [];
 
    for (let index in records) {
        let record = records[index];
        createRecordRow(record, true);
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
    document.getElementById("checkout").style.display = "table-footer-group";
    updateTotal(records);
    setTotal();
    removeRecordFromCart();     
}


export { updateCart };