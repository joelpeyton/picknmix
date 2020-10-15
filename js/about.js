let grading = document.getElementById("gradingContainer");
let category = document.getElementById("categoryTitle");
let delivery = document.getElementById("deliveryContainer");

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

export { showGrading, hideGrading, showDelivery, hideDelivery }