"use strict";

$(document).ready(function() {
    $("#check").click(function(){
        let validated = true;
        let from = document.getElementById("from");
        let to = document.getElementById("to");
        let fromError = document.getElementById("fromError");
        let toError = document.getElementById("toError");

        fromError.innerText = "";
        toError.innerText = "";

        let databases = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "i1", "i2", "i3"];

        if (from.value !== "fixed" && from.value !== "individual" ) {
            fromError.innerText = "The database can only be \"fixed\" or \"individual\""; 
            validated = false;
        }

        if (!databases.includes(to.value)) {
            toError.innerText = "Database must be one of {\"fi\", \"f2\", \"f3\", \"f4\", \"f5\", \"f6\", \"f7\", \"f8\", \"i1\", \"i2\", \"i3\"}"
            validated = false;
        }  

        if (validated) {
            $.ajax({
                type: "GET",
                url: "php/upload.php?table=" + from.value + "&to=" + to.value
            }).done(function(results){
                document.getElementById("results").innerText = `Successfully uploaded ${results[0]} records to the ${to.value} database. There are ${results[1]} entries that contain errors.`;
            }); 
        }
    });
});


