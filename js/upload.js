"use strict";

$(document).ready(function() {
    let from = document.getElementById("from");
    let to = document.getElementById("to");
    let options = document.getElementsByTagName("option");

    for (let i = 2; i < 10; i++) {
        options[i].hidden = false;
    }

    for (let i = 10; i < 13; i++) {
        options[i].hidden = true;
    }

    $("#from").change(function() {
        if (from.value == "fixed") {
            options[2].selected = true;
            for (let i = 2; i < 10; i++) {
                options[i].hidden = false;
            }
    
            for (let i = 10; i < 13; i++) {
                options[i].hidden = true;
            }
        }
    
        else {
            options[10].selected = true;
            for (let i = 2; i < 10; i++) {
                options[i].hidden = true;
            }
    
            for (let i = 10; i < 13; i++) {
                options[i].hidden = false;
            }
        }
    });  

    $("#check").click(function() {
        $.ajax({
            type: "GET",
            url: "php/upload.php?table=" + from.value + "&to=" + to.value
        }).done(function(results){
            document.getElementById("results").innerText = `Successfully uploaded ${results[0]} records to the ${to.value} database. There are ${results[1]} entries that contain errors.`;
            setTimeout(function() { window.location.reload() }, 60000);
        }); 
    
    });
});


