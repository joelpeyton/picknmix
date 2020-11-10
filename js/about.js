let grading = document.getElementById("gradingRow");
let delivery = document.getElementById("deliveryRow");
let about = document.getElementById("aboutRow");
let category = document.getElementById("categoryTitle");

function showGrading() {
    grading.style.display = "block";
    category.innerText = "Grading";
}

function hideGrading() {
    grading.style.display = "none";
}

function showDelivery() {
    delivery.style.display = "block";
    category.innerText = "Delivery";
}

function hideDelivery() {
    delivery.style.display = "none";
}

function showAbout() {
    about.style.display = "block";
    category.innerText = "About Us";
}

function hideAbout() {
    about.style.display = "none";
}

export { showGrading, hideGrading, showDelivery, hideDelivery, showAbout, hideAbout };