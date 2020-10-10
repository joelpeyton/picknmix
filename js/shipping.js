function numOfSingles() {
    let numOfSingles = 0;
    let singles = ["f1", "f2", "f3", "i1", "i2"];
    
    singles.forEach(element => {
        if (sessionStorage[element]) {
            numOfSingles += sessionStorage[element].split(",").length;
        }
    });

    return numOfSingles;
}

function numOfLps() {
    let numOfLps = 0;
    let lps = ["f4", "f5", "i3"];

    lps.forEach(element => {
        if (sessionStorage[element]) {
            numOfLps += sessionStorage[element].split(",").length;
        }
    });

    return numOfLps;
}

function calculateWeight() {
    let singles = numOfSingles();
    let lps = numOfLps();
    let weight = 0;
    weight += singles * 55;
    weight += lps * 250;

    return weight;
}

function getShippingPriceArray() {
    let option = document.getElementById("deliveryOption").value;
    if (parseFloat(sessionStorage.total) >= 20.00) {
        option = "2";
    }
    if (parseFloat(sessionStorage.total) >= 50.00) {
        option = "3";
    }
    let prices = [];
    switch(option) {
        case "1":
            prices = [2.20, 2.75, 3.20, 4.50, 4.50];
            break;
        case "2":
            prices = [2.60, 3.10, 4.70, 5.70, 5.70];
            break;
        case "3":
            prices = [7.95, 8.85, 8.85, 10.45, 13.00];
            break;
    }

    return prices;
}

function calculateShippingCost() {
    let weight = calculateWeight();
    let lps = numOfLps();
    let inTheUK = sessionStorage.inTheUK;
    let total = parseFloat(sessionStorage.total);
    let shippingTotal = 0;
    let parcels = 0;
    let prices = getShippingPriceArray();

    if (inTheUK === "no" || total >= 250.00) {
        shippingTotal = 0;
    }

    else if (lps > 0) {
        parcels = Math.floor(weight / 1750);
        if (weight % 1750 > 0) parcels++;
        shippingTotal = prices[4] * parcels;
    } 
    
    else {
        while (weight > 0) {
            if (weight <= 100) {
                shippingTotal += prices[0];
            } else if (weight <= 250) {
                shippingTotal += prices[1];
            } else if (weight <= 500) {
                shippingTotal += prices[2];
            } else {
                shippingTotal += prices[3];
            } 
            weight -= 1750;
        }
    }

    sessionStorage.setItem("shipping", shippingTotal.toFixed(2));
    let grandTotal = total + parseFloat(sessionStorage.shipping);
    sessionStorage.grandTotal = grandTotal.toFixed(2);

    updateShipping();
}

function updateShipping() {
    document.getElementById("paypalTotal").innerText = sessionStorage.total;
    document.getElementById("paypalShipping").innerText = sessionStorage.shipping;
    document.getElementById("paypalGrand").innerText = sessionStorage.grandTotal;
}

function toggleOverseas() {
    let value = document.querySelector("input[name='inTheUK']:checked").value;
    let overseas = document.getElementById("shippingInfoOne");

    if (value === "yes") {
        sessionStorage.setItem("inTheUK", "yes");
        overseas.style.display = "none";

    } else {
        sessionStorage.setItem("inTheUK", "no");
        overseas.style.display = "block";
    }
}

function displayPaypalModal() {
    calculateShippingCost();

    let selectDiv = document.getElementById("deliveryOptionDiv");
    let select = document.getElementById("deliveryOption");
    let two = document.getElementById("shippingInfoTwo");
    let three = document.getElementById("shippingInfoThree");
    let overseas = document.getElementById("shippingInfoFour");
    let over250 = document.getElementById("shippingInfoFive");
    let total = parseFloat(sessionStorage.total);

    selectDiv.style.display = "none";
    two.style.display = "none";
    three.style.display = "none";
    overseas.style.display = "none";
    over250.style.display = "none";

    if (sessionStorage.inTheUK === "no") {
        two.style.display = "block";
        overseas.style.display = "block";
    }

    else {
        selectDiv.style.display = "block";

        if (total < 20) {
            select.disabled = false;
            $("#deliveryOption").change(function() {
                calculateShippingCost();
            });
        } 

        else {
            if (total >= 20.00) {
                select.value = "2";
                select.disabled = true;
            }
            if (total >= 50.00) {
                select.value = "3";
                select.disabled = true;
            }
            if (total >= 250.00) {
                selectDiv.style.display = "none";
                three.style.display = "block";
                over250.style.display = "block";
            }
        }
    }
}

export { toggleOverseas, displayPaypalModal, calculateShippingCost }