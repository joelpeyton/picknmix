<?php
    include "database.php";
    include "customer.php";
    include "transaction.php";

    $database = new Database();
    $db = $database->getConnection();

    $customer = new Customer($db);
    $customer->email = htmlspecialchars(strip_tags($_GET["email"]));
   
    $customer->readOne();

    $transaction = new Transaction($db);
    $transaction->transaction_id = htmlspecialchars(strip_tags($_GET["transaction_id"]));
    $transaction->total = htmlspecialchars(strip_tags($_GET["total"]));
    $transaction->discount = htmlspecialchars(strip_tags($_GET["discount"]));
    $transaction->promo_discount = htmlspecialchars(strip_tags($_GET["promo_discount"]));
    $transaction->shipping = htmlspecialchars(strip_tags($_GET["shipping"]));
    $transaction->grand_total = htmlspecialchars(strip_tags($_GET["grand_total"]));
    $transaction->customer_id = $customer->id;

    $stmt = $transaction->create();
?>
