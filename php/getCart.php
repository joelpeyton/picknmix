<?php
    include "database.php";
    include "record.php";

    $database = new Database();
    $db = $database->getConnection();

    $record = new Record($db);

    $return = array();

    foreach($_GET as $tableName => $records) {
        $recordslength = count($records);
        for ($i = 0; $i < $recordslength; $i++) {
            $id = $records[$i];
            $stmt = $record->getCart($tableName, $id);
            
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                array_push($return, $row);
            };
        }
    }

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($return, JSON_UNESCAPED_UNICODE);
?>
