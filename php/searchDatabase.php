<?php
    include "database.php";
    include "record.php";

    $database = new Database();
    $db = $database->getConnection();

    $record = new Record($db);

    if ($_GET) {
        $field = htmlspecialchars(strip_tags($_GET["field"]));
        $term = htmlspecialchars(strip_tags($_GET["term"]));
    }

    $return = array();

    $tableArray = array("f1", "f2", "f3", "f4", "f5", "i1", "i2", "i3");

    for ($i = 0; $i < count($tableArray); $i++) {
        $stmt = $record->search($tableArray[$i], $field, $term);

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            array_push($return, $row);
        };
    }

    usort($return, function($a, $b) {
        if ($a["artist"] == $b["artist"]) return 0;
        return (($a["artist"] < $b["artist"]) ? -1 : 1);
    });

    
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($return, JSON_UNESCAPED_UNICODE);
?>