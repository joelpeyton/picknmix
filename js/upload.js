"use strict";

$(document).ready(function() {
    $("#check").click(function(){
        let from = document.getElementById("from");
        let to = document.getElementById("to");

        $.ajax({
            type: "GET",
            url: "php/upload.php?table=" + from.value + "&to=" + to.value
        }).done(function(results){
            document.getElementById("results").innerText = `Successfully uploaded ${results[0]} records to the ${to.value} database. There are ${results[1]} entries that contain errors.`;
        }); 
    
    });
});


