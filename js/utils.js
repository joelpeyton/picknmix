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

    let actionBtn = document.createElement("button");
    actionBtn.className = "actionBtn btn btn-outline-success";
    actionBtn.setAttribute("id", record["id"]);
    actionBtn.innerText = "Add";

    /// ALTERNATIVE BUTTON ///
    /*
    let actionBtn = document.createElement("i");
    actionBtn.className = "actionBtn fas fa-plus-square text-success fa-2x";
    actionBtn.setAttribute("id", record["id"]);
    */

    let cart  = document.createElement("td");
    cart.appendChild(actionBtn);
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

function displayRecords(records, category) {
    removeRecords();
  
    for (let index in records) {
        if (records[index]["Category"] == category) {
            createRecordRow(records[index]);
        }
    }
    
}

function selectActive(id, text) {
    let current = document.querySelector(".nav-link.active");
    current.className = "nav-link";
    let active = document.querySelector(id);
    active.className = "nav-link active";
    document.querySelector("#categoryTitle").innerHTML = text;
}

function toggleActionBtn() {
    let btn = document.getElementById(event.target.id);
    if (btn.classList.contains("btn-outline-success")) {
        btn.classList.remove("btn-outline-success");
        btn.classList.add("btn-outline-danger");
        btn.innerText = "Remove";
    } else {
        btn.classList.add("btn-outline-success");
        btn.classList.remove("btn-outline-danger");
        btn.innerText = "Add";
    }

    /// ALTERNATIVE BUTTON ///
    /*if (btn.classList.contains("text-success")) {
        btn.classList.remove("text-success");
        btn.classList.add("text-danger");
    } else {
        btn.classList.add("text-success");
        btn.classList.remove("text-danger");
    }

    if (btn.classList.contains("fa-plus-square")) {
        btn.classList.remove("fa-plus-square");
        btn.classList.add("fa-minus-square");
    } else {
        btn.classList.add("fa-plus-square");
        btn.classList.remove("fa-minus-square");
    }*/
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
            /*
            if (btn) {
                btn.classList.remove("text-success");
                btn.classList.add("text-danger");
                btn.classList.remove("fa-plus-square");
                btn.classList.add("fa-minus-square");
            }*/
        });
    }
}

function updatePage(records, id) {
    let category, text;
    switch (id) {
        default:
        case "db1":
        case "db2":
        case "db8":
        case "db9":
            category = "7a";
            id = "#db9";
            text = "50's & 60's";
            break;
        case "db3":
        case "db10":
            category = "7b";
            id = "#db10";
            text = "70's onwards";
            break;
        case "db4":
        case "db11":
            category = "12";
            id = "#db11";
            text = "12\" Singles";
            break;
        case "db5":
        case "db12":
            category = "LP";
            id = "#db12";
            text = "LP's";
            break;
        case "db6":
        case "db13":
            category = "Collectable";
            id = "#db13";
            text = "Collectable";
            break;            
        case "db7":
        case "db14":
            category = "Accessories";
            id = "#db14";
            text = "Accessories";
            break;
    }

    displayRecords(records, category);
    selectActive(id, text);
    actionBtns();
    updateActionBtns();
    updateCartBadge();
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export { getCookie, updatePage, removeRecords, selectActive, updateSessionCart, updateCartBadge };
