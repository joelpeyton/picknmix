<?php
    include "database.php";
    include "record.php";

    $database = new Database();
    $db = $database->getConnection();

    $record = new Record($db);
    $table = htmlspecialchars(strip_tags($_GET["table"]));

    $stmt = $record->read($table);

    $return = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        array_push($return, $row);
    };
    
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($return, JSON_UNESCAPED_UNICODE);
?>