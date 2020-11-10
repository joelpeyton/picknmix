<?php
    include "database.php";
    include "record.php";

    $database = new Database();
    $db = $database->getConnection();

    $record = new Record($db);

    $records = array();

    foreach($_GET as $tableName => $records) {
        $recordslength = count($records);
        for ($i = 0; $i < $recordslength; $i++) {
            $id = $records[$i];
            $stmt = $record->getCart($tableName, $id);
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                array_push($records, $row);
            };
        }
    }

    $given_name = htmlspecialchars(strip_tags($_GET["given_name"]));
    $surname = htmlspecialchars(strip_tags($_GET["surname"]));
    $total = htmlspecialchars(strip_tags($_GET["total"]));
    $shipping = htmlspecialchars(strip_tags($_GET["shipping"]));
    $grand_total = htmlspecialchars(strip_tags($_GET["grand_total"]));
    $notes = htmlspecialchars(strip_tags($_GET["notes"]));
    $transaction_id = htmlspecialchars(strip_tags($_GET["transaction_id"]));

    $sender = "{$given_name} {$surname}";
    $sender_email = htmlspecialchars(strip_tags($_GET["email"]));
    $subject = "Successful transaction from Pick n Mix Records Website";
    $message = "Transaction ID: {$transaction_id}\n";
    $message .= "Total: {$total}\n";
    $message .= "Shipping: {$shipping}\n";
    $message .= "Grand Total: {$grand_total}\n";
    $message .= "Notes: {$notes}\n";
    $message .= "Records:\n";
    for ($i = 0; $i < count($records); $i++) {
        $message .= "{$records[$i]}\n"; 
    }
    $receiver = "joelpeyton@hotmail.co.uk";

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
    $headers .= "From: {$sender} <{$sender_email}> \n";

    mail($receiver, $subject, $message, $headers);
?>
