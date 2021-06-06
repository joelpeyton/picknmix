<?php
    include "database.php";
    include "testimonial.php";

    $database = new Database();
    $db = $database->getConnection();

    $test = new Testimonial($db);

    $stmt = $test->read();

    $return = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        array_push($return, $row);
    };
    
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($return, JSON_UNESCAPED_UNICODE);
?>