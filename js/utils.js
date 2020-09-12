function createRecordRow(record, isCart) {
    let table = document.querySelector("#records");
    let row = document.createElement("tr");
    row.className = "record";

    let artist = document.createElement("td");
    artist.innerHTML = record["artist"];
    row.appendChild(artist);

    let title = document.createElement("td");
    title.innerHTML = record["title"];
    row.appendChild(title);

    //let tick = document.createElement("i");
    //tick.className = "fas fa-check";

    //let pictureSleeve = document.createElement("td");
    //pictureSleeve.className = "removeMobile";
    //if (record["Picture_Sleeve"] == "Y") {
    //    pictureSleeve.appendChild(tick);
    //} 
    //row.appendChild(pictureSleeve);

    //let largeHole = document.createElement("td");
    //largeHole.className = "removeMobile";
    //if (record["Large_Centre"] == "Y") {
    //    largeHole.appendChild(tick);
    //}
    //row.appendChild(largeHole);

    let condition = document.createElement("td");
    condition.className = "removeMobile";
    condition.innerHTML = record["vinylCondition"];
    row.appendChild(condition);

    let price = document.createElement("td");
    price.innerHTML = record["price"];
    row.appendChild(price);

    let actionBtn = document.createElement("button");
    actionBtn.setAttribute("id", record["id"]);
    actionBtn.setAttribute("category", record["category"]);

    if (isCart) {
        actionBtn.className = "removeBtn btn btn-outline-danger";
        actionBtn.innerHTML = "Remove";
    } 
    
    else {
        actionBtn.className = "actionBtn btn btn-outline-success";
        actionBtn.innerText = "Add";
    }
    
    let cart  = document.createElement("td");
    cart.appendChild(actionBtn);
    row.appendChild(cart);

    table.appendChild(row);

    /*let infoRow = document.createElement("tr");
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
    table.appendChild(infoRow);*/
}

function removeRecords() {
    let record = document.querySelectorAll(".record");
    for (let i = 0; i < record.length; i++) {
        record[i].remove();
    }

    let info = document.querySelectorAll(".info");
    for (let i = 0; i < info.length; i++) {
        info[i].remove();
    }
}

function displayRecords(records) {
    removeRecords();
  
    for (let index in records) {
        createRecordRow(records[index], false);
    }
    
}

function selectActive(id, text) {
    let current = document.querySelector(".nav-link.active");

    if (current) {
        current.className = "nav-link";
    }
 
    if (text !== "Search") {
        let active = document.querySelector(id);
        active.className = "nav-link active";
    }

    document.querySelector("#categoryTitle").innerHTML = text;
}

function toggleActionBtn() {
    let btn = document.getElementById(event.target.id);
    if (btn.classList.contains("btn-outline-success")) {
        btn.classList.remove("btn-outline-success");
        btn.classList.add("btn-outline-danger");
        btn.innerText = "Remove";
    } 
    
    else {
        btn.classList.add("btn-outline-success");
        btn.classList.remove("btn-outline-danger");
        btn.innerText = "Add";
    }
}

function updateSessionCart() {
    let id = event.target.id;
    let cart = sessionStorage.cart;
    if (cart) {
        cart = cart.split(",");

        let index = cart.indexOf(id);
        if (index === -1) {
            cart.push(id);
        }

        else {
            cart.splice(index, 1);
        }

        sessionStorage.cart = cart;
    }

    else {
        sessionStorage.setItem("cart", id);
    }
}

function updateCartBadge() {
    let cartBadge = document.getElementById("cartBadge");
    let cart = sessionStorage.cart ? sessionStorage.cart.split(",") : [];
    if (cart[0] === "") {
        cartBadge.innerText = "0";
    }

    else {
        cartBadge.innerText = cart.length;   
    }
} 

function actionBtns() {
    $(".actionBtn").click(function() {
        toggleActionBtn();
        updateSessionCart();
        updateCartBadge();
    });
}

function updateActionBtns() {
    let cart = sessionStorage.cart ? sessionStorage.cart.split(",") : [];

    if (cart[0] !== "") {
        cart.forEach(id => {
            let btn = document.getElementById(id);
            if (btn) {
                btn.classList.remove("btn-outline-success");
                btn.classList.add("btn-outline-danger");
                btn.innerText = "Remove";
            }
        });
    }
}

function removeCheckoutBtn() {
    let checkout = document.getElementById("checkout");
    if (checkout.style.display !== "none") {
        checkout.style.display = "none";
    }
}

function getRecords(table) {
    let loader = document.querySelector(".loader");
    loader.style.display = "block"; // remove loader

    $.ajax({
        type: "GET",
        url: "php/getDatabase.php?table=" + table
    })
    .done(function(records) {
        removeCheckoutBtn();
        updateCartBadge();
        //selectActive(id, text);
        updateCategoryTitle(table);
        displayRecords(records);
        //updateActionBtns();
        actionBtns();
        //console.log(records);
        loader.style.display = "none";
    })
    .fail(function(err) {
        console.log(err);
        alert("Error: Unable to return database");
    });    
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
            text = "7” singles";
            break;
        case "i2":
            text = "12” singles";
            break;
        case "i3":
            text = "LPs & CDs";
            break;            
        case "accessories":
            text = "Accessories";
            break;   
        case "gifts":;
            text = "Gifts";
            break;          
    }

    document.querySelector("#categoryTitle").innerHTML = text;

    //displayRecords(records, category);
    //
    //actionBtns();
    //updateActionBtns();
    //updateCartBadge();
    //removeCheckoutBtn();
}

export { getRecords, createRecordRow, removeRecords, selectActive, actionBtns, updateActionBtns, updateSessionCart, updateCartBadge };
