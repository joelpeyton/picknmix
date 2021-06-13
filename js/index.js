"use strict";

$(document).ready(function() {
    getTestimonials();
    setUp("testing");

    $("a").click(function(event) {
        sessionStorage.setItem("initialCategory", event.target.id);
    });
});

function getTestimonials() {
    $.ajax({
        type: "GET",
        url: "php/getTestimonial.php?table=testimonials" 
    })
    .done(function(results) {
        let testimonials = document.getElementById("testimonials");
        let n = 0;

        results.forEach(element => {
            let div = document.createElement("div");
            n == 0 ? div.className = "carousel-item active" : div.className = "carousel-item";
            let quote = document.createElement("q");
            quote.innerText = element.value;
            div.append(quote);
            testimonials.appendChild(div);
            n++;
        });
    })
    .fail(function(err) {
        console.log(err);
        alert("Oops!! Looks like somethings gone wrong, please try again or contact ian@picknmixrecords.com if the problem persists.");
    });    
}

function setUp(toggle) {
    if (toggle == "live") {
        document.getElementsByTagName("nav")[0].style.display = "block";
        document.getElementById("info").style.display = "none";
    }

    else {
        document.getElementsByTagName("nav")[0].style.display = "none";
        document.getElementById("info").style.display = "block";
        document.getElementById("info").innerText = "COMING SOON";
    }
}

