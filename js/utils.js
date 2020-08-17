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

    let add = document.createElement("i");
    add.className = "add fas fa-plus-square text-success fa-2x";
    add.setAttribute("id", "a" + record["id"]);
    add.setAttribute("title", "Add to cart");

    let minus = document.createElement("i");
    minus.className = "minus fas fa-minus-square text-danger fa-2x";
    minus.setAttribute("id", "m" + record["id"]);
    minus.setAttribute("title", "Remove from cart");
    minus.style.display = "none";
    
    let cart  = document.createElement("td");
    cart.appendChild(add);
    cart.appendChild(minus);
    row.appendChild(cart);

    table.appendChild(row);
}

function removeRecords() {
    let record = document.querySelectorAll(".record");
    for (let i = 0; i < record.length; i++) {
        record[i].remove();
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

function selectActive(id) {
    let current = document.querySelector(".nav-link.active");
    current.className = "nav-link";
    let active = document.querySelector(id);
    active.className = "nav-link active";
}

function updateCartBadge(num) {
    document.getElementById("cartBadge").innerHTML = num;
} 

function toggleActionBtn(id) {
    let btn = document.getElementById(id);
    btn.style.display = "none";

    let num = parseInt(document.getElementById("cartBadge").innerHTML);

    if (id.startsWith("a")) {
        id = id.replace("a", "m");
        num++;
    } else {
        id = id.replace("m", "a");
        num--;
    }
    btn = document.getElementById(id);
    btn.style.display = "inline";   
    
    updateCartBadge(num);
}

function actionBtns() {
    $(".add").click(function(event) {
        $.ajax({
            type: "GET",
            url: "php/addToCart.php?id=" + event.target.id
        })
        .done(function() {
         toggleActionBtn(event.target.id);
        });
    });

    $(".minus").click(function(event) {
        $.ajax({
            type: "GET",
            url: "php/removeFromCart.php?id=" + event.target.id
        })
        .done(function() {
         toggleActionBtn(event.target.id);
        });
    });
}

function updateActionBtns(cart) {
    let collection = document.getElementsByClassName("add");
    let ids = [];
    for (let i = 0; i < collection.length; i++) {
        ids.push(collection[i].getAttribute("id"));
    }

    if (cart.length > 0) {
        for (let id of cart) {
            id = "a" + id;
            if (ids.includes(id)) {
            toggleActionBtn(id);
            }   
        }
    }
}

function updateTotal(records, cart) {
    let total = 0;
    if (cart.length > 0) {
        for (let index in records) {
            if (cart.includes(records[index]["id"])) {
                total+= parseFloat(records[index]["Price"]);
            }
        }
    }
    document.querySelector(".total").innerHTML = total;
}

function updateCartInfo(records) {
    $.ajax({
        type: "GET",
        url: "php/getCart.php"
    })
    .done(function(cart) {
        cart = JSON.parse(cart);
        updateActionBtns(cart);
        updateCartBadge(cart.length);
        updateTotal(records, cart);
    });
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
    selectActive(id);
    document.querySelector("#categoryTitle").innerHTML = text;
    actionBtns();
    updateCartInfo(records);
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

export { getCookie, updatePage };


/*
function toggleInfo(id) {
    let row = document.getElementById(id);
    
    if (row.style.display === "contents") {
        row.style.display = "none";
    } else {
        row.style.display = "contents";
    }
} 

function removeAllInfos() {
    let info = document.querySelectorAll(".info");
    for (let i = 0; i < info.length; i++) {
        info[i].remove();
    }
}

function createInfoRow(record) {
    let table = document.querySelector("#records");
    let row = document.createElement("tr");
    row.className = "info";
    row.setAttribute("id", record["id"]);
    row.style.display = "none";

    let data = document.createElement("td");
    data.setAttribute("colspan", "3");
    data.innerHTML = "Vinyl Condition: " + record["Vinyl_Grade"] + "<br>";
    data.innerHTML+= "Sleeve Condition: " + record["Sleeve_Grade"] + "<br>";
    data.innerHTML+= "Price: £" + record["Price"] + "<br>";
    data.innerHTML+= "NM: Normal; G: Good; VG: Very Good";
    row.appendChild(data);

    table.appendChild(row);
}

*/