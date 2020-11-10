<?php
    include "database.php";
    include "customer.php";

    $database = new Database();
    $db = $database->getConnection();

    $customer = new Customer($db);
    $customer->email = htmlspecialchars(strip_tags($_GET["email"]));

    // check to see if customer exists
    $customerExists = $customer->customerExists();

    if ($customerExists) {
        // customer already exists 
    }

    else {
        // create new customer
        $customer->given_name = htmlspecialchars(strip_tags($_GET["given_name"]));
        $customer->surname = htmlspecialchars(strip_tags($_GET["surname"]));
        $customer->payer_id = htmlspecialchars(strip_tags($_GET["payer_id"]));

        $customer->create();
    }
?>
