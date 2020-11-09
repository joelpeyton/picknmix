<?php
    include "database.php";
    include "record.php";

    $database = new Database();
    $db = $database->getConnection();

    $record = new Record($db);

    foreach($_GET as $tableName => $records) {
        $recordslength = count($records);
        for ($i = 0; $i < $recordslength; $i++) {
            $id = $records[$i];
            $stmt = $record->changeToSold($tableName, $id);
        }
    }

    //$given_name = htmlspecialchars(strip_tags($_GET["given_name"]));
    //$surname = htmlspecialchars(strip_tags($_GET["surname"]));
    //$total = htmlspecialchars(strip_tags($_GET["total"]));
    //$shippping = htmlspecialchars(strip_tags($_GET["shipping"]));
    //$grand_total = htmlspecialchars(strip_tags($_GET["grand_total"]));
    //$items = htmlspecialchars(strip_tags($_GET["items"]));
    //$notes = htmlspecialchars(strip_tags($_GET["notes"]));

    //$sender = "{$given_name} {$surname}";
    $sender = "Billy Bragg";
    $sender_email = "Transaction@picknmix.com";
    $subject = "Successful transaction from Pick n Mix Records Website";
    $message = "Items: $items\n";
    $message .= "Total: $total\n";
    $message .= "Shipping: $shipping\n";
    $message .= "Grand Total: $grand_total\n";
    $message .= "Notes: $notes\n";
    $receiver = "joelpeyton@hotmail.co.uk";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
    $headers .= "From: {$sender} <{$sender_email}> \n";

    mail($receiver, $subject, $message, $headers);

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($return, JSON_UNESCAPED_UNICODE);
?>
