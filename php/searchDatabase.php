<?php
    include "database.php";
    include "record.php";

    $database = new Database();
    $db = $database->getConnection();

    $record = new Record($db);

    if ($_GET) {
        $field = $_GET["field"];
        $term = $_GET["term"];
    }

    $stmt = $record->search($field, $term);

    $return = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        array_push($return, $row);
    };
    
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($return, JSON_UNESCAPED_UNICODE);
?>