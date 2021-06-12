<?php
    include "database.php";
    include "record.php";

    $database = new Database();
    $db = $database->getConnection();

    $record = new Record($db);
    $table = htmlspecialchars(strip_tags($_GET["table"]));
    $to = htmlspecialchars(strip_tags($_GET["to"]));

    $stmt = $record->read($table);
    $return = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        array_push($return, $row);
    };

    header('Content-Type: application/json; charset=UTF-8');

    $count = 0;

    if ($table == 'individual') {
        for ($i = 0; $i < count($return); $i++) {
            if (json_encode($return[$i], JSON_UNESCAPED_UNICODE)) {
                $stmt = $record->addIndivid($to, $return[$i]['number'], $return[$i]['artist'], $return[$i]['title'], $return[$i]['vinylCondition'], $return[$i]['label'], $return[$i]['catalogueNumber'], $return[$i]['format'], $return[$i]['sleeveCondition'], $return[$i]['comments'], $return[$i]['price']);
                $stmt = $record->delete($table, $return[$i]['id']);
                $count++;
            }
        }
    }

    else {
        for ($i = 0; $i < count($return); $i++) {
            if (json_encode($return[$i], JSON_UNESCAPED_UNICODE)) {
                $stmt = $record->addFixed($to, $return[$i]['number'], $return[$i]['artist'], $return[$i]['title'], $return[$i]['vinylCondition']);
                $stmt = $record->delete($table, $return[$i]['id']);
                $count++;
            }
        }
    }
    

    $remainder = count($return) - $count;
    $return = array();
    array_push($return, $count);
    array_push($return, $remainder);
    echo json_encode($return, JSON_UNESCAPED_UNICODE);
    
?>