function createRecordRow(record, tableName) {
    let table = document.querySelector("#records");
    let rowA = document.createElement("tr");
    rowA.className = "record";

    let artist = document.createElement("td");
    artist.innerHTML = record["artist"];
    rowA.appendChild(artist);

    let title = document.createElement("td");
    title.innerHTML = record["title"];
    rowA.appendChild(title);

    let condition = document.createElement("td");
    condition.innerHTML = record["vinylCondition"];
    rowA.appendChild(condition);

    let price = document.createElement("td");
    price.innerHTML = record["price"];
    rowA.appendChild(price);

    let actionBtn = document.createElement("button");
    actionBtn.setAttribute("id", record["id"]);
    actionBtn.setAttribute("category", record["category"]);
    actionBtn.className = "actionBtn btn btn-outline-success";
    actionBtn.innerText = "Add";
    
    let action = document.createElement("td");
    action.appendChild(actionBtn);
    rowA.appendChild(action);

    table.appendChild(rowA);

    if (tableName.startsWith("i")) {
        let rowB = document.createElement("tr");
        rowB.className = "info";
        
        let info = document.createElement("td");
        info.setAttribute("colspan", "2");
        info.style.borderTop = "none";

        let infoArr = ["label", "catalogueNumber", "format", "sleeveCondition", "info", "comments"];

        infoArr.forEach(field => {
            let descriptor = field;
            if (descriptor === "catalogueNumber") descriptor = "cat. No";
            if (descriptor === "sleeveCondition") descriptor = "sleeve";

            descriptor = descriptor.charAt(0).toUpperCase() + descriptor.slice(1);
            info.innerHTML += `<strong>${descriptor}: </strong>  ${record[field]}<br>`;
        });
        
        rowB.appendChild(info);
        table.appendChild(rowB);
    }
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

function displayRecords(records, table) {
    removeRecords();
  
    for (let index in records) {
        createRecordRow(records[index], table);
    }
    
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

    let categories = ["f1", "f2", "f3", "f4", "f5", "i1", "i2", "i3"];
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
    $(".actionBtn").click(function() {
        toggleActionBtn();
        updateSessionCart();
        updateCartBadge();
    });
}

function updateActionBtns(category) {
    let cart = sessionStorage[category] ? sessionStorage[category].split(",") : [];

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
    loader.style.display = "block"; // add loader

    $.ajax({
        type: "GET",
        url: "php/getDatabase.php?table=" + table
    })
    .done(function(records) {
        removeCheckoutBtn();
        updateCartBadge();
        updateCategoryTitle(table);
        displayRecords(records, table);
        updateActionBtns(table);
        actionBtns();
        removeCheckoutBtn();
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
}

export { getRecords, createFixedRecordRow, removeRecords, actionBtns, updateActionBtns, updateSessionCart, updateCartBadge };
