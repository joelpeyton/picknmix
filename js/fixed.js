"use strict";

import { toggleLoader } from "./utils.js";
import { showRecords, getTestRecords } from "./records.js";

$(document).ready(function() {
    toggleLoader("hide");
    getTestRecords("fixed");
    showRecords();
});

