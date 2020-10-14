let infoBtn = document.getElementById("infoBtn");
let info = document.getElementsByClassName("information");

function hideInfoBtn() {
    infoBtn.style.display = "none";
}

function showInfoBtn() {
    infoBtn.style.display = "block";
}

function getInfo(id) {
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
    if (sessionStorage.showingInfo === "true") {
        sessionStorage.info.split(",").forEach(element => {
            info[element].style.display = "none";
        });
        sessionStorage.setItem("showingInfo", false);
    } 
    
    else {
        sessionStorage.info.split(",").forEach(element => {
            info[element].style.display = "block";
        });
        sessionStorage.setItem("showingInfo", true);
    }
}

function toggleInfoBtn() {
    if (infoBtn.className === "fas fa-times-circle") {
        infoBtn.className = "fas fa-info-circle";
    } 
    
    else {
        infoBtn.className = "fas fa-times-circle";
    }
}

export {
    hideInfoBtn,
    showInfoBtn,
    toggleInfoBtn,
    getInfo,
    toggleInfo
}