<?php
    include "database.php";
    include "record.php";

    $database = new Database();
    $db = $database->getConnection();

    $record = new Record($db);

    $transactionId = htmlspecialchars(strip_tags($_GET["transaction_id"]));

    // takes the $_GET array
    // process each object as $tableName
    // using array of record ids
    foreach($_GET["records"] as $tableName => $records) {
        $recordslength = count($records);
        for ($i = 0; $i < $recordslength; $i++) {
            $id = $records[$i];
            $record->updateSold($tableName, $id);
            $record->createSold($transactionId ,$tableName, $id);
        }
    }
?>
