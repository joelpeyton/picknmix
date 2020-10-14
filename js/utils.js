function showContent() {
    let content = document.getElementById("recordsContainer");
    content.style.display = "block";
}

function hideContent() {
    let content = document.getElementById("recordsContainer");
    content.style.display = "none";
}

function hideInfoBtn() {
    let button = document.getElementById("informationBtn");
    button.style.display = "none";
}

function showInfoBtn() {
    let button = document.getElementById("informationBtn");
    button.style.display = "block";
}

function createRecordRow(record, isCart) {
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
    actionBtn.setAttribute("id", record["category"] + record["id"]);
    actionBtn.setAttribute("category", record["category"]);

    if (isCart) {
        actionBtn.className = "removeBtn btn btn-outline-danger";
        actionBtn.innerHTML = "Remove";
    } 
    
    else {
        actionBtn.className = "actionBtn btn btn-outline-success";
        actionBtn.innerText = "Add";
    }
    
    let action = document.createElement("td");
    action.appendChild(actionBtn);
    rowA.appendChild(action);

    table.appendChild(rowA);

    if (!record["category"].startsWith("f")) {
        let rowB = document.createElement("tr");
        rowB.className = "info"; 
        rowB.style.borderTop = "none";

        if (record["category"] === "gifts" || record["category"] === "accessories") {
            let imgTD = document.createElement("td")

            let img = document.createElement("img");
            img.className = "shopImage";
            img.src = "images/bg.png";  // NEED TO CHANGE TO DATABASE FIELD

            imgTD.appendChild(img);
            rowB.appendChild(imgTD);
        }

        let info = document.createElement("td");
        info.setAttribute("colspan", "3");
       
        let infoArr = ["label", "catalogueNumber", "format", "sleeveCondition", "info", "comments"];

        infoArr.forEach(field => {
            let descriptor = field;
            if (descriptor === "catalogueNumber") descriptor = "cat. No";
            if (descriptor === "sleeveCondition") descriptor = "sleeve";

            descriptor = descriptor.charAt(0).toUpperCase() + descriptor.slice(1);
            info.innerHTML += `<strong>${descriptor}: </strong>  ${record[field]}<br>`;
        });
        
        rowB.appendChild(info);

        let padding = document.createElement("td");
        rowB.appendChild(padding);
        
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

function displayRecords(records, start) {
    toggleMoreBtn("show");
    toggleFinalRow("show");

    const LIMIT = 100;
    let end = start + LIMIT;
    for (let i = start; i < end; i++) {
        if (i < records.length) {
            createRecordRow(records[i], false);
        }
        
        else {
            toggleMoreBtn("hide");
            break;
        }
    }
    updateActionBtns(records);
    actionBtns();
    
    let more = document.querySelector("#more");
    more.onclick = function() {
        displayRecords(records, end);
    }

    toggleLoader("hide");
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
    $(".actionBtn").click(function() {
        toggleActionBtn();
        updateSessionCart();
        updateCartBadge();
    });
}

function updateActionBtns(records) {
    for (let index in records) {
        let record = records[index];
        let category = record["category"]; 
        let cart = sessionStorage[category] ? sessionStorage[category].split(",") : [];
        if (cart.includes(record["id"])) {
            let id = record["category"] + record["id"];
            let btn = document.getElementById(id);
            if (btn) {
                btn.classList.remove("btn-outline-success");
                btn.classList.add("btn-outline-danger");
                btn.innerText = "Remove";
            }
        }
    }
}

function removeCheckoutBtn() {
    let checkout = document.getElementById("checkout");
    if (checkout.style.display !== "none") checkout.style.display = "none";
}

function getRecords(table) {
    toggleLoader("show");

    $.ajax({
        type: "GET",
        url: "php/getTable.php?table=" + table
    })
    .done(function(records) {
        removeRecords();
        removeCheckoutBtn();
        updateCartBadge();
        updateCategoryTitle(table);
        displayRecords(records, 0);
        updateQuantity(records.length)
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

function landingPage() {
    let initialCategory = sessionStorage.initialCategory;
    initialCategory ? getRecords(initialCategory) : getRecords("f1");
    showContent();
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

function updateQuantity(length) {
    //let quantity = document.querySelector("#quantity");
    //quantity.innerText = length == "1" ? `${length} record found` : `${length} records found`;
}

function getInfo(id) {
    let info = document.getElementsByClassName("information");

    for (let i = 0; i < info.length; i++) {
        info[i].style.display = "none";
    }

    switch(id) {
        case "f1":
        case "f2":
            sessionStorage.setItem("info", [0, 2, 4, 6, 7]);
            break;
        case "f3":
            sessionStorage.setItem("info", [0, 3, 4, 6, 7]);
            break;
        case "f4":
        case "f5":
            sessionStorage.setItem("info", [0, 3, 5, 7]);
            break;
        case "i1":
        case "i2":
        case "i3":
            sessionStorage.setItem("info", [0, 1, 2, 8]);
            break;
        default:
            sessionStorage.setItem("info", []);
    }

    if (sessionStorage.info !== "") {
        sessionStorage.info.split(",").forEach(element => {
            info[element].style.display = "block";
        });
    }

    sessionStorage.setItem("showingInfo", true);
}

function toggleInfo() {
    let info = document.getElementsByClassName("information");

    if (sessionStorage.showingInfo === "true") {
        sessionStorage.info.split(",").forEach(element => {
            info[element].style.display = "none";
        });
        sessionStorage.setItem("showingInfo", false);
    } else {
        sessionStorage.info.split(",").forEach(element => {
            info[element].style.display = "block";
        });
        sessionStorage.setItem("showingInfo", true);
    }
}

export {
    showContent,
    hideContent,
    hideInfoBtn,
    showInfoBtn,
    updateQuantity,
    toggleFinalRow,
    clearSearchInput,
    landingPage, 
    toggleSearchBar, 
    toggleLoader, 
    getRecords, 
    displayRecords, 
    createRecordRow, 
    removeRecords, 
    actionBtns, 
    updateActionBtns, 
    updateSessionCart, 
    updateCartBadge, 
    removeCheckoutBtn, 
    updateCategoryTitle,
    toggleInfo,
    getInfo
};
